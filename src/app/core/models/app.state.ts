import {OfferState} from './offer-state';
import {UserState} from './user.state';
import {FavoriteOfferState} from './favorite-offer.state';
import {City} from './city';

export interface AppState {
  offer: OfferState;
  currentCity: City;
  user: UserState;
  favoriteOffer: FavoriteOfferState;
}
