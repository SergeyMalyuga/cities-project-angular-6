import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ToggleDirective } from '../../shared/directives/toggle.directive';
import { HoverTrackerDirective } from '../../shared/directives/hover-tracker.directive';
import { SortType } from '../../core/constants/const';
import { AccessibilityClickDirective } from '../../shared/directives/accessibility-click.directive';

@Component({
  selector: 'app-places-sorting-form',
  imports: [
    NgClass,
    ToggleDirective,
    HoverTrackerDirective,
    AccessibilityClickDirective,
  ],
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesSortingFormComponent {
  @Input({ required: true }) currentSortType!: SortType;
  @Output() clicked = new EventEmitter<SortType>();

  public isOpen = signal<boolean>(false);
  public sortTypes = Object.values(SortType);

  public toggleMenu() {
    this.isOpen.set(!this.isOpen());
  }

  public closeMenu() {
    this.isOpen.set(false);
  }

  public closeMenuLeaveMouse(isHover: boolean) {
    if (!isHover) {
      this.closeMenu();
    }
  }

  public onClicked(sortType: SortType) {
    this.clicked.emit(sortType);
    this.closeMenu();
  }
}
