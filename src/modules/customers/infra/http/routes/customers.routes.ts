import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CustomersController from '../controllers/CustomersControlller';
import Gender from '@modules/customers/enums/Gender';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.get('/', customersController.index);
customersRouter.get('/:id', customersController.show);
customersRouter.post('/', celebrate({
	[Segments.BODY]: {
		fullName: Joi.string().required(),
		gender: Joi.string().length(1).valid(
			Gender.Male, Gender.Female, Gender.Other
		).required(),
		birthDate: Joi.date().required(),
		cityId: Joi.string().uuid().required(),
	}
}), customersController.create);
customersRouter.patch('/:id', customersController.update);
customersRouter.delete('/:id', customersController.delete);

export default customersRouter;
