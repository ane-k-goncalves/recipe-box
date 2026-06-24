import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecipeModel } from '../models';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  private readonly recipeService = inject(Recipe);

  protected readonly recipes = this.recipeService.recipes;
  protected readonly searchTerm = signal<string>('');

  protected readonly filteredRecipes = computed<RecipeModel[]>(() => {
    const term = this.searchTerm().toLowerCase();
    return this.recipes().filter((recipe: RecipeModel): boolean => 
      recipe.name.toLowerCase().includes(term)
    );
  });

  constructor() {
    this.recipeService.loadRecipes();
  }
}
