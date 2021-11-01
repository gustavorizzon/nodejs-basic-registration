import { Request, Response } from "express";
import { container } from "tsyringe";

import HttpStatusCode from "@modules/customers/enums/HttpStatusCode";

import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import ShowCustomerService from "@modules/customers/services/ShowCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";
import ListCustomersService from "@modules/customers/services/ListCustomersService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import { classToClass } from "class-transformer";

export default class CustomersController {
	public async create(request: Request, response: Response): Promise<Response> {
		const { fullName, gender, birthDate, cityId } = request.body;

		const createCustomer = container.resolve(CreateCustomerService);

		try {
			const customer = await createCustomer.execute({
				fullName,
				gender,
				birthDate,
				cityId
			});

			return response.json(customer);
		} catch (err) {
			const { message } = err as Error;

			return response.status(HttpStatusCode.BadRequest).json({ message });
		}
	}

	public async index(request: Request, response: Response): Promise<Response> {
		const { name } = request.query;

		const listCustomers = container.resolve(ListCustomersService);

		const customers = await listCustomers.execute({ fullName: name });

		return response.json(classToClass(customers));
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const showCustomer = container.resolve(ShowCustomerService);

		const customer = await showCustomer.execute({ id });

		if (customer) {
			return response.json(classToClass(customer));
		}

		return response.status(HttpStatusCode.NotFound).json({
			message: "Cliente não encontrado."
		});
	}

	public async delete(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const deleteCusomer = container.resolve(DeleteCustomerService);

		const deleted = await deleteCusomer.execute({ id });

		if (deleted) {
			return response.json({
				message: 'Cliente deletado.'
			});
		}

		return response.status(HttpStatusCode.BadRequest).json({
			message: "Cliente não deletado."
		});
	}

	public async update(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { fullName } = request.body;

		const updateCustomer = container.resolve(UpdateCustomerService);

		try {
			const updatedCustomer = await updateCustomer.execute({ id, fullName });

			return response.json(updatedCustomer);
		} catch (err) {
			const { message } = err as Error;

			return response.status(HttpStatusCode.BadRequest).json({ message })
		}
	}
}
