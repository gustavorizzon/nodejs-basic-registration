import Gender from "../enums/Gender";
import CitiesRepository from "../repositories/CitiesRepository";
import CustomersRepository from "../repositories/CustomersRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import FakeCustomersRepository from "../repositories/fakes/FakeCustomersRepository";
import CreateCityService from "./CreateCityService";
import CreateCustomerService from "./CreateCustomerService";
import ListCustomersService from "./ListCustomersService";

let customersRepository: CustomersRepository;
let citiesRepository: CitiesRepository;
let createCustomer: CreateCustomerService;
let createCity: CreateCityService;
let listCustomers: ListCustomersService;

describe('ListCustomers Service', () => {
	beforeAll(async () => {
		customersRepository = new FakeCustomersRepository;
		citiesRepository = new FakeCitiesRepository;
		createCustomer = new CreateCustomerService(customersRepository);
		createCity = new CreateCityService(citiesRepository);
		listCustomers = new ListCustomersService(customersRepository);

		const city = await createCity.execute({ name: 'Manaus', state: 'AM' });

		await createCustomer.execute({
			fullName: 'John Doe',
			birthDate: new Date(1991, 0, 31),
			cityId: city.id,
			gender: Gender.Male
		});

		await createCustomer.execute({
			fullName: 'Jane Doe',
			birthDate: new Date(1997, 1, 17),
			cityId: city.id,
			gender: Gender.Female
		});
	});

	it('should be able to list customers only by name', async () => {
		const customers = await listCustomers.execute({ fullName: 'John Doe' });

		expect(customers).toHaveLength(1);
		expect(customers).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					fullName: 'John Doe',
				})
			])
		)
	});

	it('should not be able to list customers with wrong fullName', async () => {
		const customers = await listCustomers.execute({ fullName: 'Joseph' });

		expect(customers).toHaveLength(0);
	});
});
