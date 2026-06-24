import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty',
  standalone: true
})
export class DifficultyPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) {
      return '⚪ Não especificado';
    }

    const normalized = value.toLowerCase().trim();

    switch (normalized) {
      case 'facil':
      case 'fácil':
        return '🟢 Fácil';
      case 'medio':
      case 'médio':
        return '🟡 Médio';
      case 'dificil':
      case 'difícil':
        return '🔴 Difícil';
      default:
        return '⚪ ' + value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
