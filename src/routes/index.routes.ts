import { Router } from 'express';

import { recipeRoutes } from './recipe.routes';

const routes = Router();

routes.use('/recipe', recipeRoutes);

export { routes };
