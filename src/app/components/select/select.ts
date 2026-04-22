import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, input, output, signal } from '@angular/core';

interface SelectItem {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  styleUrls: ['./select.css'],
  standalone: true,
  templateUrl: './select.html',
})
export class Select {
  label = input<string>('');
  options = input.required<SelectItem[]>();
  selected = input<string>();

  selectEvt = output<string>();

  isOpen = false;
  selectedValue = signal<SelectItem>({ value: '', label: '' });

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    effect(() => {
      const selectedStr = this.selected();
      const match = this.options().find((o) => o.value === selectedStr);
      const fallback = this.options()[0];
      const resolved = match ?? fallback ?? { value: '', label: '' };

      this.selectedValue.set({
        ...resolved,
        label: this.formatLabel(resolved.label),
      });
    });
  }
  private formatLabel(value: string): string {
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  select(option: SelectItem): void {
    this.selectedValue.set(option);
    this.isOpen = false;
    this.selectEvt.emit(option.value);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
