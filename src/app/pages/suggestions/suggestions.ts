import { Component, inject } from '@angular/core';
import { SideBar } from '../../layout/side-bar/side-bar';
import { Header } from '../../layout/header/header';
import { FeedbackStore } from '../../shared/feedback.store';
import { Badge } from '../../components/badge/badge';
import { ButtonComponent } from '../../components/button/button';
import { RouterLink } from '@angular/router';
import { CardSuggestion } from '../../components/card-suggestion/card-suggestion';

@Component({
  selector: 'app-suggestions',
  imports: [SideBar, Header, Badge, ButtonComponent, RouterLink, CardSuggestion],
  templateUrl: './suggestions.html',
  styleUrl: './suggestions.css',
})
export class Suggestions {
  store = inject(FeedbackStore);
}
