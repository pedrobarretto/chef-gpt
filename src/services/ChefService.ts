import { configDotenv } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

import { systemPrompt } from '../utils';

configDotenv();

export class ChefGPT {
  private configuration: Configuration;
  private instance: OpenAIApi;
  constructor() {
    console.log('process.env.OPENAI_API_KEY: ', process.env.OPENAI_API_KEY);
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private getInstance() {
    if (!this.instance) {
      const instance = new OpenAIApi(this.configuration);
      return instance;
    }

    return this.instance;
  }

  public createUserPrompt(ingredients: string[]) {
    const ingredientsList = ingredients
      .map((ingredient) => `- ${ingredient}`)
      .join('\n');

    console.log(ingredientsList);

    const userPrompt = `
      You are ChefAI, the extraordinary culinary master! 🍳✨

      Please create a scrumptious recipe for me using the following ingredients:

      ${ingredientsList}

      I trust your culinary genius to combine these elements into a delightful dish. Please format the recipe in an HTML div, with no style or CSS, including the list of ingredients and step-by-step instructions. Make it visually appealing, and don't forget to tantalize our taste buds with your detailed cooking directions. Let the flavors dance on the plate and the aromas fill the kitchen. Bon appétit! 😋👨‍🍳
    `;

    return userPrompt;
  }

  public async getRecipe(ingredients: string[]) {
    const instance = this.getInstance();
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
