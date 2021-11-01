import { container } from "tsyringe";

import CitiesRepository from "@modules/customers/repositories/CitiesRepository";
import TypeORMCitiesRepository from "@modules/customers/infra/typeorm/repositories/TypeORMCitiesRepository";

import CustomersRepository from "@modules/customers/repositories/CustomersRepository";
import TypeORMCustomersRepository from "@modules/customers/infra/typeorm/repositories/TypeORMCustomersRepository";

container.registerSingleton<CitiesRepository>(
	'citiesRepository',
	TypeORMCitiesRepository
);

container.registerSingleton<CustomersRepository>(
	'customersRepository',
	TypeORMCustomersRepository
);
