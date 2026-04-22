import { Component, input } from '@angular/core';
import { ProductRequest } from '../../shared/feedback.model';
import { RouterLink } from '@angular/router';
import { Badge } from '../badge/badge';

@Component({
  selector: 'app-card-suggestion',
  imports: [RouterLink, Badge],
  templateUrl: './card-suggestion.html',
  styleUrl: './card-suggestion.css',
})
export class CardSuggestion {
  suggestionItem = input.required<ProductRequest>();
}
