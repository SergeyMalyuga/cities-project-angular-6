import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appHoverTracker]'
})
export class HoverTrackerDirective {
  @Input() enable = false;
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.enable) {
      this.hovered.emit(true);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.enable) {
      this.hovered.emit(false);
    }
  }
}
