import Gender from "../enums/Gender";
import CitiesRepository from "../repositories/CitiesRepository";
import CustomersRepository from "../repositories/CustomersRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import CreateCityService from "./CreateCityService";
import CreateCustomerService from "./CreateCustomerService";

let customersRepository: CustomersRepository;
let createCustomer: CreateCustomerService;
let citiesRepository: CitiesRepository;
let createCity: CreateCityService;

describe('CreateCustomer Service', () => {
	beforeEach(() => {
		customersRepository = new FakeCustomersRepository;
		createCustomer = new CreateCustomerService(customersRepository);

		citiesRepository = new FakeCitiesRepository;
		createCity = new CreateCityService(citiesRepository);
	});

	it('should be able to create a customer', async () => {
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

		expect(customer).toHaveProperty('id');
	});

	it('should not be able to create a customer with invalid gender', async () => {
		const city = await createCity.execute({
			name: 'São Paulo',
			state: 'SP',
		});

		await expect(
			createCustomer.execute({
				fullName: 'John Doe',
				birthDate: new Date(),
				cityId: city.id,
				gender: 'Y'
			})
		).rejects.toBeInstanceOf(Error);
	});


});
