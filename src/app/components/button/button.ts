import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  imports: [CommonModule],
  standalone: true,
  styleUrl: './button.css',
  template: `
    @if (icon !== 'none') {
      <svg width="7" class="icon" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 9L2 5l4-4"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          fill-rule="evenodd"
        />
      </svg>
    }
    <ng-content></ng-content>
  `,
})
export class ButtonComponent {
  @Input() variant: 'purple' | 'blue' | 'dark' | 'red' | 'transparent' = 'transparent';
  @Input() type: 'normal' | 'link' = 'normal';
  @Input() icon: 'caret' | 'none' = 'none';
  @Input() disabled: boolean = false;

  @HostBinding('class')
  get classes() {
    const variantClasses: Record<typeof this.variant, string> = {
      purple: 'purple-button',
      blue: 'blue-button',
      dark: 'dark-button',
      red: 'red-button',
      transparent: 'transparent-button',
    };

    const typeClasses: Record<typeof this.type, string> = {
      normal: 'base-button',
      link: 'link-button',
    };

    return [
      typeClasses[this.type],
      variantClasses[this.variant],

      this.icon !== 'none' ? 'has-icon' : '',
      this.disabled ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
