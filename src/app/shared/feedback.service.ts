// feedback.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category, FeedbackData, ProductRequest, Status } from './feedback.model';
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
}
