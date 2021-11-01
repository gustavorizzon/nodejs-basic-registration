import { getRepository, Repository } from "typeorm";

import City from "../entities/City";
import CitiesRepository from "@modules/customers/repositories/CitiesRepository";
import CreateCityDTO from "@modules/customers/dtos/CreateCityDTO";
import FindCitiesDTO from "@modules/customers/dtos/FindCitiesDTO";

class TypeORMCitiesRepository implements CitiesRepository {
	private ormRepository: Repository<City>;

	constructor () {
		this.ormRepository = getRepository(City);
	}

	public async create(data: CreateCityDTO): Promise<City> {
		const city = this.ormRepository.create(data);

		await this.ormRepository.save(city);

		return city;
	}

	public async find(where: FindCitiesDTO): Promise<City[]> {
		return this.ormRepository.find({ where });
	}
}

export default TypeORMCitiesRepository;
