import { inject, injectable } from "tsyringe";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface Request {
	id: string;
	fullName: string;
}

@injectable()
class UpdateCustomerService {
	constructor(
		@inject('customersRepository')
		private customersRepository: CustomersRepository,
	) {}

	public async execute({ id, fullName }: Request): Promise<Customer> {
		const customer = await this.customersRepository.findById(id);

		if (!customer) {
			throw new Error('Cliente não encontrado.');
		}

		customer.fullName = fullName;

		const updatedCustomer = await this.customersRepository.save(customer);

		return updatedCustomer;
	}
}

export default UpdateCustomerService;
