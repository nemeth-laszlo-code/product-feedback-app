import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  styleUrls: ['./dropdown.css'],
  standalone: true,
  templateUrl: './dropdown.html',
})
export class DropdownComponent implements OnInit {
  label = input<string>('Dropdown');
  options = input<string[]>([]);
  selected = input<string>();

  selectEvt = output<string>();
  isOpen = true;
  selectedValue = '';

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    effect(() => {
      this.selectedValue = this.selected() ?? this.options()[0] ?? '';
    });
  }
  ngOnInit(): void {
    this.selectedValue = this.selected() ?? this.options()[0] ?? '';
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  select(option: string): void {
    this.selectedValue = option;
    this.isOpen = false;
    this.selectEvt.emit(this.selectedValue);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const host = this.elementRef.nativeElement;
    if (!host.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }
}
