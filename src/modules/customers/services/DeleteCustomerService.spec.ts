import Gender from "../enums/Gender";
import CitiesRepository from "../repositories/CitiesRepository";
import CustomersRepository from "../repositories/CustomersRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import CreateCityService from "./CreateCityService";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";

let customersRepository: CustomersRepository;
let createCustomer: CreateCustomerService;
let deleteCustomer: DeleteCustomerService;
let citiesRepository: CitiesRepository;
let createCity: CreateCityService;

describe('DeleteCustomer Service', () => {
	beforeEach(() => {
		customersRepository = new FakeCustomersRepository;
		createCustomer = new CreateCustomerService(customersRepository);
		deleteCustomer = new DeleteCustomerService(customersRepository);

		citiesRepository = new FakeCitiesRepository;
		createCity = new CreateCityService(citiesRepository);
	});

	it('should be able to delete a customer', async () => {
		const city = await createCity.execute({
			name: 'São Paulo',
			state: 'SP',
		});

		const customer = await createCustomer.execute({
			fullName: 'John Doe',
			birthDate: new Date(),
			cityId: city.id,
			gender: Gender.Male
		});

		const deleted = await deleteCustomer.execute({ id: customer.id });

		expect(deleted).toBe(true);
	});

	it('should not be able to delete a customer with invalid id', async () => {
		const deleted = await deleteCustomer.execute({ id: 'invalid-id' });

		expect(deleted).toBe(false);
	});
});
