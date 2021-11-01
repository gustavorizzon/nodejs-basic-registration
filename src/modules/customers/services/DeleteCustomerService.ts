import { inject, injectable } from "tsyringe";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface Request {
	id: string;
}

@injectable()
class DeleteCustomerService {
	constructor (
		@inject('customersRepository')
		private customersRepository: CustomersRepository,
	) {}

	public async execute({ id }: Request): Promise<boolean> {
		return await this.customersRepository.deleteById(id);
	}
}

export default DeleteCustomerService;
