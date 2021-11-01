import { Router } from 'express';

import citiesRouter from '@modules/customers/infra/http/routes/cities.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';

const routes = Router();

routes.use('/cities', citiesRouter);
routes.use('/customers', customersRouter);

export default routes;
