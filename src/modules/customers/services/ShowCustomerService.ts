import { inject, injectable } from "tsyringe";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface Request {
	id: string;
}

@injectable()
class ShowCustomerService {
	constructor (
		@inject('customersRepository')
		private customersRepository: CustomersRepository,
	) {}

	public async execute({ id }: Request): Promise<Customer | undefined> {
		const customer = await this.customersRepository.findById(id);

		return customer;
	}
}

export default ShowCustomerService;
