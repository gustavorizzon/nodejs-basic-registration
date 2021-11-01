import { inject, injectable } from "tsyringe";
import Gender from "../enums/Gender";
import Customer from "../infra/typeorm/entities/Customer";
import CustomersRepository from "../repositories/CustomersRepository";

interface Request {
	fullName: string;
	gender: string;
	birthDate: Date;
	cityId: string;
}

@injectable()
class CreateCustomerService {
	constructor (
		@inject('customersRepository')
		private customersRepository: CustomersRepository,
	) {}

	public async execute(data: Request): Promise<Customer> {
		const { gender } = data;

		const genders = [Gender.Male, Gender.Female, Gender.Other];
		if (!genders.some(g => g === gender)) {
      throw new Error('Gênero inválido.');
    }

		const customer = await this.customersRepository.create(data);

		return customer;
	}
}

export default CreateCustomerService;
