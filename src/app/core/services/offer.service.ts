import {inject, Injectable} from '@angular/core';
import {AppState} from '../models/app.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {AppRoute, AuthorizationStatus} from '../constants/const';
import {toggleFavoriteOffer} from '../../store/favorite-offer/actions/favorite-offer.actions';
import {selectToggleStatus} from '../../store/favorite-offer/selectors/favorite-offers.selectors';
import {EMPTY} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private store = inject(Store<AppState>);
  private authStatus = this.store.selectSignal(selectAuthStatus);
  private router = inject(Router);

  public toggleFavorite(offerId: string, isFavorite: boolean) {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(toggleFavoriteOffer({offerId, isFavorite}));
      return this.store.select(selectToggleStatus);
    } else {
      this.router.navigate([AppRoute.LOGIN]);
      return EMPTY;
    }
  }
}
