import { Component, Optional, Self, effect, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './text-field.css',
  templateUrl: './text-field.html',
})
export class TextFieldComponent implements ControlValueAccessor {
  label = input('');
  info = input('');
  placeholder = input('');
  errorMessage = input("Can't be empty");
  value = input('');
  invalid = input(false);
  type = input<'input' | 'textarea'>('input');
  maxLength = input(250);

  internalValue = signal('');
  disabled = signal(false);
  name = input('input');

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  private ngControl = inject(NgControl, { optional: true, self: true });
  /**@Optional() @Self() public ngControl: NgControl | null */
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    effect(() => {
      this.internalValue.set(this.value());
    });
  }

  get showError(): boolean {
    const control = this.ngControl?.control;
    if (control) {
      return control.invalid && (control.touched || control.dirty);
    }
    return this.invalid(); //  Call as function — it's a signal
  }

  onInput(event: Event): void {
    const nextValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.internalValue.set(nextValue);
    this.onChange(nextValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor
  writeValue(value: string | null): void {
    this.internalValue.set(value ?? '');
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
}
