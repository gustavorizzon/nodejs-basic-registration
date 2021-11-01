import Gender from "../enums/Gender";
import CitiesRepository from "../repositories/CitiesRepository";
import CustomersRepository from "../repositories/CustomersRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import CreateCityService from "./CreateCityService";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";

let customersRepository: CustomersRepository;
let createCustomer: CreateCustomerService;
let showCustomer: ShowCustomerService;
let citiesRepository: CitiesRepository;
let createCity: CreateCityService;

describe('ShowCustomer Service', () => {
	beforeEach(() => {
		customersRepository = new FakeCustomersRepository;
		createCustomer = new CreateCustomerService(customersRepository);
		showCustomer = new ShowCustomerService(customersRepository);

		citiesRepository = new FakeCitiesRepository;
		createCity = new CreateCityService(citiesRepository);
	});

	it('should be able to show a customer information', async () => {
		const city = await createCity.execute({
			name: 'São Paulo',
			state: 'SP',
		});

		const customerInfo = {
			fullName: 'John Doe',
			birthDate: new Date(),
			cityId: city.id,
			gender: Gender.Male
		};

		const customer = await createCustomer.execute(customerInfo);

		await expect(
			showCustomer.execute({ id: customer.id })
		).resolves.toMatchObject(
			expect.objectContaining(customerInfo)
		);
	});

	it('should not be able to show customer info from invalid ID', async () => {
		await expect(
			showCustomer.execute({ id: 'invalid_id' })
		).resolves.toBeUndefined();
	});
});
