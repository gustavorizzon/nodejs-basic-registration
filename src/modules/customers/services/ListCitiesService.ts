import { inject, injectable } from "tsyringe";
import City from "../infra/typeorm/entities/City";
import CitiesRepository from "../repositories/CitiesRepository";

interface Request {
	name?: any;
	state?: any;
}

@injectable()
class ListCitiesService {
	constructor (
		@inject('citiesRepository')
		private citiesRepository: CitiesRepository,
	) {}

	public async execute({ name, state }: Request): Promise<City[]> {
		const filter = {} as Request;

		// applying filters if present
		if (name) filter.name = name;
		if (state) filter.state = state;

		const cities = await this.citiesRepository.find(filter);

		return cities;
	}
}

export default ListCitiesService;
