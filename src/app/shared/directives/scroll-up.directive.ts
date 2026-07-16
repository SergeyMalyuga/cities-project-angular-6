import { Directive, HostListener, inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollUp]',
})
export class ScrollUpDirective {
  @Input() enable = false;

  private document = inject(DOCUMENT);
  private windowRef = this.document.defaultView;

  @HostListener('click')
  onClick() {
    if (this.enable && this.windowRef) {
      this.windowRef.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (
      this.enable &&
      this.windowRef &&
      (evt.key === 'Enter' || evt.key === ' ')
    ) {
      evt.preventDefault();
      this.windowRef.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
