import { Injectable, signal } from '@angular/core';
import { RecipeModel } from './models';

@Injectable({
  providedIn: 'root',
})
export class Recipe {
  private readonly _recipes = signal<RecipeModel[]>([]);
  readonly recipes = this._recipes.asReadonly();

  async loadRecipes(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/recipes');
      if (!response.ok) {
        throw new Error('Falha ao buscar receitas do backend');
      }
      const data = await response.json();
      this._recipes.set(data);
    } catch (error) {
      console.error('Erro no GET de receitas:', error);
    }
  }

  async addRecipe(newRecipe: Omit<RecipeModel, 'id'>): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });
      if (!response.ok) {
        throw new Error('Falha ao salvar receita no backend');
      }
      const savedRecipe = await response.json();
      this._recipes.update(list => [...list, savedRecipe]);
    } catch (error) {
      console.error('Erro no POST de receita:', error);
    }
  }
}
