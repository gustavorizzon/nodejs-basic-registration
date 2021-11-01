import CitiesRepository from "../repositories/CitiesRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import CreateCityService from "./CreateCityService";
import ListCitiesService from "./ListCitiesService";

let citiesRepository: CitiesRepository;
let createCity: CreateCityService;
let listCities: ListCitiesService;

describe('ListCities Service', () => {
	beforeAll(async () => {
		citiesRepository = new FakeCitiesRepository;
		createCity = new CreateCityService(citiesRepository);
		listCities = new ListCitiesService(citiesRepository);

		await createCity.execute({ name: 'São Paulo', state: 'SP' });
		await createCity.execute({ name: 'Porto Alegre', state: 'RS' });
		await createCity.execute({ name: 'Florianópolis', state: 'SC' });
		await createCity.execute({ name: 'Curitiba', state: 'PA' });
		await createCity.execute({ name: 'Osasco', state: 'SP' });
		await createCity.execute({ name: 'Passo Fundo', state: 'RS' });
	});

	it('should be able to list cities only by name', async () => {
		await expect(
			listCities.execute({ name: 'São Paulo' })
		).resolves.toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'São Paulo',
					state: 'SP'
				})
			])
		)
	});

	it('should be able to list cities only by state', async () => {
		const cities = await listCities.execute({ state: 'SP' });

		expect(cities).toHaveLength(2);
		expect(cities).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'São Paulo',
					state: 'SP'
				}),
				expect.objectContaining({
					name: 'Osasco',
					state: 'SP'
				}),
			])
		)
	});

	it('should be able to list cities by name and state', async () => {
		const cities = await listCities.execute({ name: 'Osasco', state: 'SP' });

		expect(cities).toHaveLength(1);
		expect(cities).toMatchObject(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'Osasco',
					state: 'SP'
				}),
			])
		);
	});

	it('should not be able to list cities with wrong name/state', async () => {
		const cities = await listCities.execute({ name: 'Porto Alegre', state: 'SC' });

		expect(cities).toHaveLength(0);
	});
});
