// feedback.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  Category,
  FeedbackComment,
  FeedbackData,
  ProductRequest,
  Reply,
  Status,
} from './feedback.model';
import { FEEDBACK_DATA } from './data';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private data: FeedbackData = FEEDBACK_DATA as FeedbackData;

  // ---- Requests ----

  getAll(): Observable<ProductRequest[]> {
    return of(this.data.productRequests);
  }

  getById(id: number): Observable<ProductRequest | undefined> {
    return of(this.data.productRequests.find((r) => r.id === id));
  }

  getByStatus(status: Status): Observable<ProductRequest[]> {
    return of(this.data.productRequests.filter((r) => r.status === status));
  }
  getAllCategory(): Observable<string[]> {
    const categoriesSet = new Set(this.data.productRequests.map((c) => c.category));

    return of(Array.from(categoriesSet));
  }
  getByCategory(category: Category): Observable<ProductRequest[]> {
    return of(this.data.productRequests.filter((r) => r.category === category));
  }

  getCurrentUser() {
    return of(this.data.currentUser);
  }

  addRequest(request: Omit<ProductRequest, 'id'>): Observable<ProductRequest> {
    const newRequest: ProductRequest = {
      ...request,
      id: Math.max(...this.data.productRequests.map((r) => r.id)) + 1,
    };
    this.data = {
      ...this.data,
      productRequests: [...this.data.productRequests, newRequest],
    };
    return of(newRequest);
  }

  updateRequest(updated: ProductRequest): Observable<ProductRequest> {
    this.data = {
      ...this.data,
      productRequests: this.data.productRequests.map((r) => (r.id === updated.id ? updated : r)),
    };
    return of(updated);
  }

  deleteRequest(id: number): Observable<void> {
    this.data = {
      ...this.data,
      productRequests: this.data.productRequests.filter((r) => r.id !== id),
    };
    return of(void 0);
  }

  upvote(id: number): Observable<ProductRequest | undefined> {
    const request = this.data.productRequests.find((r) => r.id === id);
    if (!request) return of(undefined);

    const updated = { ...request, upvotes: request.upvotes + 1 };
    return this.updateRequest(updated);
  }
  postComment(payload: {
    content: string;
    replyingTo?: string;
    requestId: number;
    commentId?: number;
  }): Observable<ProductRequest | undefined> {
    const request = this.data.productRequests.find((r) => r.id === payload.requestId);
    if (!request) return of(undefined);

    const currentUser = this.data.currentUser;
    let updatedComments: FeedbackComment[];

    if (payload.replyingTo) {
      updatedComments = (request.comments ?? []).map((comment) => {
        // commentId alapján keresünk, fallback: username egyezés a fő kommentnél
        const isTarget =
          payload.commentId !== undefined
            ? comment.id === payload.commentId
            : comment.user.username === payload.replyingTo;

        if (!isTarget) return comment;

        const newReply: Reply = {
          content: payload.content,
          replyingTo: payload.replyingTo!,
          user: currentUser,
        };

        return {
          ...comment,
          replies: [...(comment.replies ?? []), newReply],
        };
      });
    } else {
      // Fő szintű komment
      const newComment: FeedbackComment = {
        id: Math.max(0, ...(request.comments ?? []).map((c) => c.id)) + 1,
        content: payload.content,
        user: currentUser,
        replies: [],
      };
      updatedComments = [...(request.comments ?? []), newComment];
    }

    const updated: ProductRequest = { ...request, comments: updatedComments };
    return this.updateRequest(updated);
  }
}
