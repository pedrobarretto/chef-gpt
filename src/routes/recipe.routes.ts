import { Router, Request, Response } from 'express';

import { recipeApp } from '../apps';

const recipeRoutes = Router();

recipeRoutes.post('', async (req: Request, res: Response) => {
  const { ingredients } = req.body;
  console.log(ingredients);
  const recipe = await recipeApp.generateRecipe(ingredients);

  return res.status(201).json({ recipe });
});

export { recipeRoutes };
