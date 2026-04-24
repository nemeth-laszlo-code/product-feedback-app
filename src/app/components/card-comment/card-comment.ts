import { Component, input, output, signal } from '@angular/core';
import { FeedbackComment } from '../../shared/feedback.model';
import { RouterLink } from '@angular/router';
import { TextFieldComponent } from '../text-field/text-field';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-card-comment',
  imports: [TextFieldComponent, ButtonComponent],
  templateUrl: './card-comment.html',
  styleUrl: './card-comment.css',
})
export class CardComment {
  commentItem = input.required<Omit<FeedbackComment, 'id'> & { id?: number }>();
  parentCommentId = input<number | undefined>(undefined);
  replayName = input<string>('');

  isShowReplayComment = false;
  replyText = signal('');

  postReply = output<{ content: string; replyingTo: string; commentId: number | undefined }>();

  replyMaxLength = 250;
  toggleReplyComment() {
    this.isShowReplayComment = !this.isShowReplayComment;
  }

  submitReply() {
    if (!this.replyText().trim()) return;

    this.postReply.emit({
      content: this.replyText(),
      replyingTo: this.commentItem().user.username,
      commentId: this.parentCommentId() ?? this.commentItem().id, // ← szülő id
    });

    this.replyText.set('');
    this.isShowReplayComment = false;
  }

  onInput(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    value = value.length > this.replyMaxLength ? value.slice(0, this.replyMaxLength) : value;
    this.replyText.set(value);
  }
}
