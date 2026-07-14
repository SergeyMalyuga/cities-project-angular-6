import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {getRatingWidth} from '../../../core/utils/rating-width';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {AppState} from '../../../core/models/app.state';
import {Store} from '@ngrx/store';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {AuthorizationStatus} from '../../../core/constants/const';
import {OfferService} from '../../../core/services/offer.service';
import {selectIsFavoriteOffersLoading} from '../../../store/favorite-offer/selectors/favorite-offers.selectors';

@Component({
  selector: 'app-offer-card',
  imports: [TitleCasePipe, HoverTrackerDirective, NgClass],
  templateUrl: './offer-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Input() isHoverTrackerEnable = false;
  @Output() hovered = new EventEmitter<OfferPreview | null>();

  private store = inject(Store<AppState>);
  private offerService = inject(OfferService);

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

  public isEnableActiveMark() {
    return this.offer.isFavorite && this.authStatus() === AuthorizationStatus.AUTH;
  }

  public toggleFavoriteStatus() {
    this.offerService.toggleFavorite(this.offer.id, !this.offer.isFavorite);
  }
}
