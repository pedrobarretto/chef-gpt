import { ChefGPT } from '../../services';

class RecipeApp {
  private chefService: ChefGPT;
  constructor() {
    this.chefService = new ChefGPT();
  }

  public async generateRecipe(ingredients: string[]) {
    return this.chefService.getRecipe(ingredients);
  }
}

const recipeApp = new RecipeApp();
export { recipeApp };
