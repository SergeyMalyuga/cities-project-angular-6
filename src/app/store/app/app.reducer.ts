import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { offerReducer } from '../offer/offer.reducer';
import { cityReducer } from '../city/city.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offer: offerReducer,
  currentCity: cityReducer,
};
