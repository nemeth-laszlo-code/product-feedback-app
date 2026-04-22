import { Component, inject } from '@angular/core';
import { Badge } from '../../components/badge/badge';
import { ButtonComponent } from '../../components/button/button';
import { FeedbackStore } from '../../shared/feedback.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterLink } from '@angular/router';
import { Category, CATEGORY_OPTIONS } from '../../shared/feedback.model';

@Component({
  selector: 'app-side-bar',
  imports: [Badge, ButtonComponent, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  badges = ['All', 'UI', 'UX', 'Enchancement', 'Bug', 'Feature'];

  categoryBadgeItems = CATEGORY_OPTIONS;

  store = inject(FeedbackStore);
  menuOpen = false;
  private observer = inject(BreakpointObserver);

  isDesktop = toSignal(
    this.observer.observe('(min-width: 1024px)').pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
