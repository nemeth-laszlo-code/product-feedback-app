// feedback.store.ts
import { Injectable, computed, signal } from '@angular/core';
import { Category, ProductRequest, SortOption, Status, User } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Injectable({ providedIn: 'root' })
export class FeedbackStore {
  // ---- Private state ----
  private requests = signal<ProductRequest[]>([]);
  private currentUser = signal<User | null>(null);

  // ---- UI state ----
  selectedCategory = signal<Category | 'all'>('all');
  selectedRequestId = signal<number | null>(null);
  sortBy = signal<SortOption>('most-upvotes');

  // ---- Computed ----
  filteredRequests = computed(() => {
    const category = this.selectedCategory();
    const all = this.requests();

    const filtered = category === 'all' ? all : all.filter((r) => r.category === category);

    return this.sort(filtered);
  });

  suggestions = computed(() => this.filteredRequests().filter((r) => r.status === 'suggestion'));

  categories = signal<string[]>([]);

  selectedRequest = computed(
    () => this.requests().find((r) => r.id === this.selectedRequestId()) ?? null,
  );

  // Roadmap összesítők
  roadmap = computed(() => {
    const all = this.requests();
    return {
      planned: {
        title: 'Planned',
        count: all.filter((r) => r.status === 'planned').length,
      },
      inProgress: {
        title: 'In-Progress',
        count: all.filter((r) => r.status === 'in-progress').length,
      },
      live: {
        title: 'Live',
        count: all.filter((r) => r.status === 'live').length,
      },
    };
  });

  roadmapItems = computed(() => ({
    planned: this.requests().filter((r) => r.status === 'planned'),
    inProgress: this.requests().filter((r) => r.status === 'in-progress'),
    live: this.requests().filter((r) => r.status === 'live'),
  }));

  constructor(private feedbackService: FeedbackService) {
    this.init();
  }

  private init(): void {
    this.feedbackService.getAll().subscribe((requests) => {
      this.requests.set(requests);
    });
    this.feedbackService.getCurrentUser().subscribe((user) => {
      this.currentUser.set(user);
    });

    this.feedbackService.getAllCategory().subscribe((categories) => {
      this.categories.set(categories);
    });
  }

  private sort(requests: ProductRequest[]): ProductRequest[] {
    switch (this.sortBy()) {
      case 'most-upvotes':
        return [...requests].sort((a, b) => b.upvotes - a.upvotes);
      case 'least-upvotes':
        return [...requests].sort((a, b) => a.upvotes - b.upvotes);
      case 'most-comments':
        return [...requests].sort((a, b) => (b.comments?.length ?? 0) - (a.comments?.length ?? 0));
      case 'least-comments':
        return [...requests].sort((a, b) => (a.comments?.length ?? 0) - (b.comments?.length ?? 0));
    }
  }

  // ---- Selections ----
  selectCategory(category: Category | 'all'): void {
    this.selectedCategory.set(category);
  }

  selectRequest(id: number): void {
    this.selectedRequestId.set(id);
  }

  clearSelectedRequest(): void {
    this.selectedRequestId.set(null);
  }

  setSortBy(sort: SortOption): void {
    this.sortBy.set(sort);
  }

  // ---- Mutations ----
  addRequest(request: Omit<ProductRequest, 'id'>): void {
    this.feedbackService.addRequest(request).subscribe((newRequest) => {
      this.requests.update((state) => [...state, newRequest]);
    });
  }

  updateRequest(updated: ProductRequest): void {
    this.feedbackService.updateRequest(updated).subscribe(() => {
      this.requests.update((state) => state.map((r) => (r.id === updated.id ? updated : r)));
    });
  }

  deleteRequest(id: number): void {
    this.feedbackService.deleteRequest(id).subscribe(() => {
      this.requests.update((state) => state.filter((r) => r.id !== id));
      this.clearSelectedRequest();
    });
  }

  upvote(id: number): void {
    this.feedbackService.upvote(id).subscribe((updated) => {
      if (!updated) return;
      this.requests.update((state) => state.map((r) => (r.id === updated.id ? updated : r)));
    });
  }
}
