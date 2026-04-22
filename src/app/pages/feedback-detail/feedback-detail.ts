import { Component, inject, OnInit, signal } from '@angular/core';
import { FeedbackStore } from '../../shared/feedback.store';
import { Badge } from '../../components/badge/badge';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button';
import { CardSuggestion } from '../../components/card-suggestion/card-suggestion';
import { CardComment } from '../../components/card-comment/card-comment';
import { TextFieldComponent } from '../../components/text-field/text-field';

@Component({
  selector: 'app-feedback-detail',
  imports: [Badge, ButtonComponent, CardSuggestion, RouterLink, CardComment, TextFieldComponent],
  templateUrl: './feedback-detail.html',
  styleUrl: './feedback-detail.css',
})
export class FeedbackDetail implements OnInit {
  store = inject(FeedbackStore);

  route = inject(ActivatedRoute);
  newComment = signal('');

  commentMaxLength = 250;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.selectRequest(Number(id));
    }
  }

  onInput(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    value = value.length > this.commentMaxLength ? value.slice(0, this.commentMaxLength) : value;
    this.newComment.set(value);
  }
  addComment() {
    if (!this.newComment().trim()) return;

    this.newComment.set('');
  }
}
