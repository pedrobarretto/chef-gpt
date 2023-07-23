import { Configuration, OpenAIApi } from 'openai';

import { systemPrompt } from '../utils';

export class ChefGPT {
  private configuration: Configuration;
  constructor() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public createUserPrompt(ingredients: string[]) {
    const ingredientsList = ingredients
      .map((ingredient) => `- ${ingredient}`)
      .join('\n');

    const userPrompt = `
      You are ChefAI, the extraordinary culinary master! 🍳✨

      Please create a scrumptious recipe for me using the following ingredients:

      ${ingredientsList}

      I trust your culinary genius to combine these elements into a delightful dish. Please format the recipe in an HTML div, with no style or CSS, including the list of ingredients and step-by-step instructions. Make it visually appealing, and don't forget to tantalize our taste buds with your detailed cooking directions. Let the flavors dance on the plate and the aromas fill the kitchen. Bon appétit! 😋👨‍🍳
    `;

    return userPrompt;
  }

  public async getRecipe(ingredients: string[]) {
    const instance = new OpenAIApi();
    const recipe = await instance.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: this.createUserPrompt(ingredients) },
      ],
    });
    return recipe;
  }
}
