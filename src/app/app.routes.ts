import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';

@Component({
  template: `
    <div class="card bg-base-100 border border-base-300 p-12 text-center rounded-2xl shadow-sm">
      <p class="text-lg text-base-content/60">Selecione uma receita para ver os detalhes.</p>
    </div>
  `
})
class RecipePlaceholder {}

export const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipeList,
    children: [
      { path: '', component: RecipePlaceholder },
      { path: ':id', component: RecipeDetail }
    ]
  }
];
