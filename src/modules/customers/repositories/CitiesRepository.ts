import CreateCityDTO from "../dtos/CreateCityDTO";
import FindCitiesDTO from "../dtos/FindCitiesDTO";
import City from "../infra/typeorm/entities/City";

export default interface CitiesRepository {
	create(data: CreateCityDTO): Promise<City>;
	find(where: FindCitiesDTO): Promise<City[]>;
}
