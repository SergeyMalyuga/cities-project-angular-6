import { AuthorizationStatus } from '../constants/const';
import { OfferPreview } from './offers';
import { City } from './city';
import { EntityState } from '@ngrx/entity';
import { User } from './user';

export interface InitialStateApp {
  authorizationStatus: AuthorizationStatus;
  isLoading: boolean;
  user: User | undefined;
  favoriteOffers: EntityState<OfferPreview>;
  offers: EntityState<OfferPreview>;
  currentCity: City;
}
