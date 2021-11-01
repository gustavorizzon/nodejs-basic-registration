import { inject, injectable } from "tsyringe";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface Request {
	fullName: any;
}

@injectable()
class ListCustomersService {
	constructor (
		@inject('customersRepository')
		private customersRepository: CustomersRepository,
	) {}

	public async execute({ fullName }: Request): Promise<Customer[]> {
		const filter = {} as Request;

		// applying filters if present
		if (fullName) filter.fullName = fullName;

		const cities = await this.customersRepository.find(filter);

		return cities;
	}
}

export default ListCustomersService;
