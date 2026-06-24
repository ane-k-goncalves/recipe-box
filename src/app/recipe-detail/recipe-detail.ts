import { Component, signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Recipe } from '../recipe';
import { RecipeModel } from '../models';
import { DifficultyPipe } from '../difficulty.pipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [DifficultyPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(Recipe);

  // Converte os parâmetros da rota ativa em um signal reativo
  private readonly params = toSignal(this.route.params);

  protected readonly recipe = computed<RecipeModel | null>(() => {
    const id = Number(this.params()?.['id']);
    if (!id) return null;
    return this.recipeService.recipes().find((r: RecipeModel) => Number(r.id) === id) || null;
  });

  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed(() => {
    const currentRecipe = this.recipe();
    if (!currentRecipe) return [];
    const currentServings = this.servings();
    return currentRecipe.ingredients.map(ing => ({
      ...ing,
      quantity: ing.quantity * currentServings
    }));
  });

  protected incrementServings(): void {
    this.servings.update(s => s + 1);
  }

  protected decrementServings(): void {
    this.servings.update(s => Math.max(1, s - 1));
  }
}
