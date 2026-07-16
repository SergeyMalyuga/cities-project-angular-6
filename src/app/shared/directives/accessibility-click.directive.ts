import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appAccessibilityClick]',
})
export class AccessibilityClickDirective {
  @Output() clicked = new EventEmitter<void>();

  @HostBinding('attr.tabindex')
  tabIndex = 0;

  @HostListener('click')
  onClick() {
    this.clicked.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.clicked.emit();
    }
  }
}
