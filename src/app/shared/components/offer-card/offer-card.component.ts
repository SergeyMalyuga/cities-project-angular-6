import {ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {getRatingWidth} from '../../../core/utils/rating-width';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {AppState} from '../../../core/models/app.state';
import {Store} from '@ngrx/store';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {AppRoute} from '../../../core/constants/const';
import {OfferService} from '../../../core/services/offer.service';
import {selectIsFavoriteOffersLoading} from '../../../store/favorite-offer/selectors/favorite-offers.selectors';
import {RouterLink} from '@angular/router';
import {isEnableActiveMark} from '../../../core/utils/enable-active-mark';
import {first, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-offer-card',
  imports: [TitleCasePipe, HoverTrackerDirective, NgClass, RouterLink],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isHoverTrackerEnable = false;
  @Input() isDisabled: boolean | null = null;
  @Input() isFavoritePage = false;
  @Output() hovered = new EventEmitter<OfferPreview | null>();
  @Output() toggled = new EventEmitter<void>();

  private store = inject(Store<AppState>);
  private offerService = inject(OfferService);
  private destroyRef = inject(DestroyRef);

  protected readonly AppRoute = AppRoute;
  protected readonly isEnableActiveMark = isEnableActiveMark;

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public isFavoriteOffersIsLoading = this.store.selectSignal(selectIsFavoriteOffersLoading);

  protected readonly getRatingWidth = getRatingWidth;

  public onHovered(isHover: boolean) {
    if (isHover) {
      this.hovered.emit(this.offer)
    } else {
      this.hovered.emit(null)
    }
  }

  public toggleFavoriteStatus() {
    this.offerService.toggleFavorite(this.offer.id, !this.offer.isFavorite)
      .pipe(first(success => success !== null),
        tap(() => this.toggled.emit()),
        takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
