import CitiesRepository from "../repositories/CitiesRepository";
import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import CreateCityService from "./CreateCityService";

let citiesRepository: CitiesRepository;

describe('CreateCity Service', () => {
	beforeEach(() => {
		citiesRepository = new FakeCitiesRepository;
	});

	it('should be able to create a city', async () => {
		const createCity = new CreateCityService(citiesRepository);

		const city = await createCity.execute({
			name: 'São Paulo',
			state: 'SP',
		});

		expect(city).toHaveProperty('id');
	});
});
