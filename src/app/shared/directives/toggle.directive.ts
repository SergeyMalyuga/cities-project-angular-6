import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  @Output() toggled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @HostBinding('attr.tabindex')
  tabindex = 0;

  @HostListener('click')
  onClick() {
    this.toggled.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.toggled.emit();
    } else if (evt.key === 'Escape') {
      this.closed.emit();
    }
  }
}
