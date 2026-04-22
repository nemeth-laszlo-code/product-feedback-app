// feedback.model.ts

export interface User {
  image: string;
  name: string;
  username: string;
}

export interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export interface FeedbackComment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

export type Category = 'enhancement' | 'feature' | 'bug' | 'ux' | 'ui';
export type Status = 'suggestion' | 'planned' | 'in-progress' | 'live';
export type SortOption = 'most-upvotes' | 'least-upvotes' | 'most-comments' | 'least-comments';

export interface ProductRequest {
  id: number;
  title: string;
  category: Category;
  upvotes: number;
  status: Status;
  description: string;
  comments?: FeedbackComment[];
}

export interface FeedbackData {
  currentUser: User;
  productRequests: ProductRequest[];
}
type CategoryWithAll = Category | 'all';
export const CATEGORY_OPTIONS = [
  { value: 'bug' as CategoryWithAll, label: 'Bug' },
  { value: 'enhancement' as CategoryWithAll, label: 'Enhancement' },
  { value: 'feature' as CategoryWithAll, label: 'Feature' },
  { value: 'ui' as CategoryWithAll, label: 'UI' },
  { value: 'ux' as CategoryWithAll, label: 'UX' },
  { value: 'all' as CategoryWithAll, label: 'All' },
].sort((a, b) => a.label.localeCompare(b.label)) satisfies {
  value: CategoryWithAll;
  label: string;
}[];

export const STATUS_OPTIONS = (
  [
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'live', label: 'Live' },
  ] as { value: Status; label: string }[]
).sort((a, b) => a.label.localeCompare(b.label)) satisfies { value: Status; label: string }[];
