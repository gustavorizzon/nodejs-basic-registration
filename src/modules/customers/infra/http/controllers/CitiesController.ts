import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCityService from "@modules/customers/services/CreateCityService";
import ListCitiesService from "@modules/customers/services/ListCitiesService";

export default class CitiesController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { name, state } = request.body;

		const createCity = container.resolve(CreateCityService);

		const city = await createCity.execute({ name, state });

		return response.json(city);
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { name, state } = request.query;

		const listCities = container.resolve(ListCitiesService);

		const cities = await listCities.execute({ name, state	});

		return response.json(cities);
	}
}
