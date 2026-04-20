import { CommonModule } from '@angular/common';
import { Component, Input, HostBinding, input, signal } from '@angular/core';

type ButtonVariant = 'purple' | 'blue' | 'dark' | 'red' | 'transparent';
type ButtonType = 'normal' | 'link';
type ButtonIcon = 'caret' | 'none';

@Component({
  selector: 'button[appButton], a[appButton]',
  imports: [CommonModule],
  standalone: true,
  styleUrl: './button.css',
  template: `
    @if (icon() !== 'none') {
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
  variant = input<ButtonVariant>('transparent');
  type = input<ButtonType>('normal');
  icon = input<ButtonIcon>('none');

  disabled = input<boolean>(false);

  @HostBinding('class')
  get classes() {
    const variantClasses: Record<ButtonVariant, string> = {
      purple: 'purple-button',
      blue: 'blue-button',
      dark: 'dark-button',
      red: 'red-button',
      transparent: 'transparent-button',
    };

    const typeClasses: Record<ButtonType, string> = {
      normal: 'base-button',
      link: 'link-button',
    };

    return [
      typeClasses[this.type()],
      variantClasses[this.variant()],

      this.icon() !== 'none' ? 'has-icon' : '',
      this.disabled() ? 'disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
