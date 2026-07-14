import {createFeatureSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {favoriteOfferAdapter} from '../favorite-offer.reducer';

const selectFavoriteOffersState = createFeatureSelector<AppState['favoriteOffer']>('favoriteOffer');
const favoriteOffersSelectors = favoriteOfferAdapter.getSelectors(selectFavoriteOffersState);

export const selectFavoriteOffers = favoriteOffersSelectors.selectAll;
export const selectFavoriteOffersTotal = favoriteOffersSelectors.selectTotal;
