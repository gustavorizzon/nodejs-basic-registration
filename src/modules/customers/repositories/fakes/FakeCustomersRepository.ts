import CreateCustomerDTO from "@modules/customers/dtos/CreateCustomerDTO";
import FindCustomersDTO from "@modules/customers/dtos/FindCustomersDTO";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { v4 } from "uuid";
import CustomersRepository from "../CustomersRepository";

export default class FakeCustomersRepository implements CustomersRepository {
	private customers: Customer[];

	constructor() {
		this.customers = [];
	}

	public async create(data: CreateCustomerDTO): Promise<Customer> {
		const customer = new Customer();

		Object.assign(customer, {
			id: v4(),
			...data,
		});

		this.customers.push(customer);

		return customer;
	}

	public async deleteById(id: string): Promise<boolean> {
		const oldCustomersSize = this.customers.length;

		this.customers = this.customers.filter(customer => customer.id !== id);

		return oldCustomersSize !== this.customers.length;
	}

	public async find(where: FindCustomersDTO): Promise<Customer[]> {
		return this.customers.filter(customer =>
			(typeof where.fullName === 'undefined' || customer.fullName === where.fullName)
		);
	}

	public async findById(id: string): Promise<Customer | undefined> {
		return this.customers.find(customer => customer.id === id);
	}

	public async save(customer: Customer): Promise<Customer> {
		this.customers = this.customers.map(c => c.id === customer.id ? customer : c);

		return customer;
	}
}
