import { inject, injectable } from "tsyringe";
import City from "../infra/typeorm/entities/City";
import CitiesRepository from "../repositories/CitiesRepository";

interface Request {
	name: string;
	state: string;
}

@injectable()
class CreateCityService {
	constructor (
		@inject('citiesRepository')
		private citiesRepository: CitiesRepository,
	) {}

	public async execute({ name, state }: Request): Promise<City> {
		const city = await this.citiesRepository.create({
			name,
			state,
		});

		return city;
	}
}

export default CreateCityService;
