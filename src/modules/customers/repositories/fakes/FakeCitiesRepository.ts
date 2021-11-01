import { v4 } from 'uuid';

import CreateCityDTO from "@modules/customers/dtos/CreateCityDTO";
import FindCitiesDTO from "@modules/customers/dtos/FindCitiesDTO";
import City from "@modules/customers/infra/typeorm/entities/City";
import CitiesRepository from "../CitiesRepository";

export default class FakeCitiesRepository implements CitiesRepository {
	private cities: City[];

	constructor() {
		this.cities = [];
	}

	public async create(data: CreateCityDTO): Promise<City> {
		const city = new City();

		Object.assign(city, {
			id: v4(),
			...data
		});

		this.cities.push(city);

		return city;
	}

	public async find(where: FindCitiesDTO): Promise<City[]> {
		return this.cities.filter(city =>
			(city.name === where.name || typeof where.name === 'undefined')
			&& (city.state === where.state || typeof where.state === 'undefined')
		);
	}
}
