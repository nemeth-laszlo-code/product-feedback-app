import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SelectItem {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  styleUrls: ['./dropdown.css'],
  standalone: true,
  templateUrl: './dropdown.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  label = input<string>('Dropdown');
  info = input<string>('');
  options = input<SelectItem[]>([]);
  selected = input<string>();

  selectEvt = output<string>();
  isOpen = false;
  disabled = signal(false);
  selectedValue = signal<SelectItem>({ value: '', label: '' });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

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
    if (this.disabled()) return;
    this.isOpen = !this.isOpen;
    this.onTouched();
  }

  select(option: SelectItem): void {
    this.selectedValue.set(option);
    this.isOpen = false;
    this.onChange(option.value);
    this.selectEvt.emit(option.value);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string | null): void {
    const match = this.options().find((o) => o.value === value);
    const fallback = this.options()[0];
    const resolved = match ?? fallback ?? { value: '', label: '' };
    this.selectedValue.set({
      ...resolved,
      label: this.formatLabel(resolved.label),
    });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
