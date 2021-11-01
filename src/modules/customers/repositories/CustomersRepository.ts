import CreateCustomerDTO from "../dtos/CreateCustomerDTO";
import FindCustomersDTO from "../dtos/FindCustomersDTO";
import Customer from "../infra/typeorm/entities/Customer";

export default interface CustomersRepository {
	create(data: CreateCustomerDTO): Promise<Customer>;
	save(customer: Customer): Promise<Customer>;
	find(where: FindCustomersDTO): Promise<Customer[]>;
	findById(id: string): Promise<Customer | undefined>;
	deleteById(id: string): Promise<boolean>;
}
