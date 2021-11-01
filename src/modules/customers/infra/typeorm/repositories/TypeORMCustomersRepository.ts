import { getRepository, Repository } from "typeorm";

import Customer from "../entities/Customer";
import CustomersRepository from "@modules/customers/repositories/CustomersRepository";
import CreateCustomerDTO from "@modules/customers/dtos/CreateCustomerDTO";
import FindCustomersDTO from "@modules/customers/dtos/FindCustomersDTO";

class TypeORMCustomersRepository implements CustomersRepository {
	private ormRepository: Repository<Customer>;

	constructor () {
		this.ormRepository = getRepository(Customer);
	}

	public async create(data: CreateCustomerDTO): Promise<Customer> {
		const customer = this.ormRepository.create(data);

		await this.ormRepository.save(customer);

		return customer;
	}

	public async find(where: FindCustomersDTO): Promise<Customer[]> {
		return this.ormRepository.find({ where });
	}

	public async save(customer: Customer): Promise<Customer> {
		return this.ormRepository.save(customer);
	}

	public async findById(id: string): Promise<Customer | undefined> {
		return this.ormRepository.findOne({ where: { id } });
	}

	public async deleteById(id: string): Promise<boolean> {
		const deleteResult = await this.ormRepository.delete({ id });

		return !!deleteResult.affected;
	}
}

export default TypeORMCustomersRepository;
