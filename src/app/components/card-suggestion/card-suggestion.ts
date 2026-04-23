import { AfterViewInit, Component, effect, inject, input } from '@angular/core';
import { ProductRequest } from '../../shared/feedback.model';
import { RouterLink } from '@angular/router';
import { Badge } from '../badge/badge';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-suggestion',
  imports: [RouterLink, Badge],
  templateUrl: './card-suggestion.html',
  styleUrl: './card-suggestion.css',
})
export class CardSuggestion {
  suggestionItem = input.required<ProductRequest>();

  breakpoint = inject(BreakpointObserver);
  isLg = toSignal(this.breakpoint.observe(['(min-width: 1024px)']), {
    initialValue: { matches: false, breakpoints: {} },
  });
}
