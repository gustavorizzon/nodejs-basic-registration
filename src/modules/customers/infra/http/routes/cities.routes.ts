import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CitiesController from '../controllers/CitiesController';

const citiesRouter = Router();
const citiesController = new CitiesController();

citiesRouter.get('/', citiesController.index);
citiesRouter.post('/', celebrate({
	[Segments.BODY]: {
		name: Joi.string().required(),
		state: Joi.string().required(),
	}
}), citiesController.create);

export default citiesRouter;
