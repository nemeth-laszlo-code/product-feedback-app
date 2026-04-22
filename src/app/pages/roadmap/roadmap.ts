import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button';
import { FeedbackStore } from '../../shared/feedback.store';
import { CardRoadmap } from '../../components/card-roadmap/card-roadmap';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

export type RoadmapStatus = 'planned' | 'inProgress' | 'live';

@Component({
  selector: 'app-roadmap',
  imports: [ButtonComponent, CardRoadmap, RouterLink, NgClass],
  templateUrl: './roadmap.html',
  styleUrl: './roadmap.css',
})
export class Roadmap {
  store = inject(FeedbackStore);

  activeTab = signal<RoadmapStatus>('inProgress'); // default: inPprogress

  tabs = computed(() => ({
    planned: {
      status: 'planned' as RoadmapStatus,
      label: 'Planned',
      info: 'Ideas prioritized for research',
      color: 'bg-brand-peach',
      count: this.store.roadmapItems().planned.length,
    },
    inProgress: {
      status: 'inProgress' as RoadmapStatus,
      label: 'In Progress',
      info: 'Currently being developed',
      color: 'bg-brand-purple',
      count: this.store.roadmapItems().inProgress.length,
    },
    live: {
      status: 'live' as RoadmapStatus,
      label: 'Live',
      info: 'Released features',
      color: 'bg-brand-sky',
      count: this.store.roadmapItems().live.length,
    },
  }));
  tabKeys = computed(() => Object.keys(this.tabs()) as RoadmapStatus[]);
}
/*
{
  status: 'inProgress' as RoadmapStatus,
  label: 'In Progress',
  info: 'Currently being developed',
  color: 'bg-brand-purple',
  count: this.store.roadmapItems().inProgress.length,
},
{
  status: 'live' as RoadmapStatus,
  label: 'Live',
  info: 'Released features',
  color: 'bg-brand-sky',
  count: this.store.roadmapItems().live.length,
}*/
