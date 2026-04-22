import { Component, inject } from '@angular/core';
import { Select } from '../../components/select/select';
import { ButtonComponent } from '../../components/button/button';
import { FeedbackStore } from '../../shared/feedback.store';
import { RouterLink } from '@angular/router';
import { SortOption } from '../../shared/feedback.model';

@Component({
  selector: 'app-header',
  imports: [Select, ButtonComponent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  store = inject(FeedbackStore);

  selectItems: { label: string; value: SortOption }[] = [
    { value: 'most-upvotes', label: 'Most Upvotes' },
    { value: 'most-comments', label: 'Most Comments' },
    { value: 'least-upvotes', label: 'Least Upvotes' },
    { value: 'least-comments', label: 'Least Comments' },
  ];

  onSort(sort: string) {
    this.store.setSortBy(sort as SortOption);
  }
}
