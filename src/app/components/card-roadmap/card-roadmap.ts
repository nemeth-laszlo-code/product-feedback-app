import { Component, computed, input } from '@angular/core';
import { Category, FeedbackComment, Status } from '../../shared/feedback.model';
import { NgClass } from '@angular/common';
import { Badge } from '../badge/badge';

interface RoadmapItem {
  upvotes: number;
  title: string;
  category: Category;
  status: Status;
  description: string;
  comments?: FeedbackComment[];
}
export const statusColors: Record<Status, string> = {
  suggestion: 'bg-gray-400',
  planned: 'bg-brand-peach',
  'in-progress': 'bg-brand-purple',
  live: 'bg-brand-sky',
};

@Component({
  selector: 'app-card-roadmap',
  imports: [NgClass, Badge],
  templateUrl: './card-roadmap.html',
  styleUrl: './card-roadmap.css',
})
export class CardRoadmap {
  roadmapItem = input<RoadmapItem>();
  color = computed(() => statusColors[this.roadmapItem()?.status ?? 'suggestion']);
}
