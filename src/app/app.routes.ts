import { Routes } from '@angular/router';
import { Components } from './pages/components/components';
import { Suggestions } from './pages/suggestions/suggestions';
import { Error } from './pages/error/error';
import { FeedbackDetail } from './pages/feedback-detail/feedback-detail';
import { NewFeedback } from './pages/new-feedback/new-feedback';
import { EditFeedback } from './pages/edit-feedback/edit-feedback';
import { Roadmap } from './pages/roadmap/roadmap';

export const routes: Routes = [
  {
    path: 'suggestions',
    component: Suggestions,
  },
  {
    path: 'feedback-detail/:id',
    component: FeedbackDetail,
  },
  {
    path: 'new-feedback',
    component: NewFeedback,
  },
  {
    path: 'edit-feedback',
    component: EditFeedback,
  },
  {
    path: 'roadmap',
    component: Roadmap,
  },
  {
    path: 'error',
    component: Error,
  },
  { path: '', redirectTo: 'suggestions', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },

  { path: 'components', component: Components },
];
