import { ChefGPT } from '../../services';

class RecipeApp {
  private chefService: ChefGPT;
  constructor() {
    this.chefService = new ChefGPT();
  }

  private formatRecipeToHTML(recipeHTML: string): string {
    return recipeHTML
      .replace('<!DOCTYPE html>', '')
      .replace(/\n/g, '')
      .replace('<html>', '')
      .replace('</html>', '')
      .replace('<head>', '')
      .replace('</head>', '')
      .replace('<title>', '')
      .replace('</title>', '')
      .replace('<body>', '')
      .replace('</body>', '');
  }

  public async generateRecipe(ingredients: string[]) {
    const response = await this.chefService.getRecipe(ingredients);

    return response.data.choices.map((recipe) => {
      return { recipe: this.formatRecipeToHTML(recipe.message.content) };
    });
  }
}

const recipeApp = new RecipeApp();
export { recipeApp };
