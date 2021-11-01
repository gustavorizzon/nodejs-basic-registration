import Gender from "../enums/Gender";
import CitiesRepository from "../repositories/CitiesRepository";
import CustomersRepository from "../repositories/CustomersRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import CreateCityService from "./CreateCityService";
import CreateCustomerService from "./CreateCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";

let customersRepository: CustomersRepository;
let createCustomer: CreateCustomerService;
let updateCustomer: UpdateCustomerService;
let citiesRepository: CitiesRepository;
let createCity: CreateCityService;

describe('UpdateCustomer Service', () => {
	beforeEach(() => {
		customersRepository = new FakeCustomersRepository;
		createCustomer = new CreateCustomerService(customersRepository);
		updateCustomer = new UpdateCustomerService(customersRepository);

		citiesRepository = new FakeCitiesRepository;
		createCity = new CreateCityService(citiesRepository);
	});

	it('should be able to update a customer', async () => {
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

		const updatedCustomer = await updateCustomer.execute({
			id: customer.id,
			fullName: 'Jane Doe',
		});

		expect(updatedCustomer).toMatchObject(
			expect.objectContaining({
				fullName: 'Jane Doe',
			}),
		);
	});

	it('should not be able to update a customer with invalid id', async () => {
		await expect(
			updateCustomer.execute({
				id: 'invalid-id',
				fullName: 'Jane Doe',
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
