import { Component, input } from '@angular/core';

type BadgeIcon = 'caret' | 'none';

@Component({
  selector: 'app-badge',
  imports: [],
  template: `
    <div
      class="badge-base"
      [class.badge-default]="icon() === 'none'"
      [class.badge-with-icon]="icon() !== 'none'"
      [class.horizontal]="iconOrder() === 'horizontal'"
      [class.vertical]="iconOrder() === 'vertical'"
      [class.selected]="selected()"
    >
      @if (icon() !== 'none') {
        <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" class="text-brand-blue">
          <path
            d="M1 6l4-4 4 4"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      }
      <span>
        <ng-content></ng-content>
      </span>
    </div>
  `,
  styleUrl: './badge.css',
})
export class Badge {
  icon = input<BadgeIcon>('none');
  iconOrder = input<'vertical' | 'horizontal'>('vertical');
  selected = input<boolean>(false);
}
