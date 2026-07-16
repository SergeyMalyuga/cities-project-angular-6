import { createEntityAdapter } from '@ngrx/entity';
import { OfferPreview } from '../../core/models/offers';
import { FavoriteOfferState } from '../../core/models/favorite-offer.state';
import { createReducer, on } from '@ngrx/store';
import {
  loadFavoriteOffers,
  loadFavoriteOffersFailure,
  loadFavoriteOffersSuccess,
  toggleFavoriteOffer,
  toggleFavoriteOfferFailure,
  toggleFavoriteOfferSuccess,
} from './actions/favorite-offer.actions';

export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
const initialState: FavoriteOfferState = favoriteOfferAdapter.getInitialState({
  isLoading: false,
  error: null,
  success: null,
});

export const favoriteOfferReducer = createReducer(
  initialState,
  on(loadFavoriteOffers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadFavoriteOffersSuccess, (state, { offers }) =>
    favoriteOfferAdapter.setAll(offers, {
      ...state,
      isLoading: false,
      error: null,
    }),
  ),
  on(loadFavoriteOffersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(toggleFavoriteOffer, (state) => ({
    ...state,
    isLoading: true,
    success: null,
  })),
  on(toggleFavoriteOfferSuccess, (state, { offer }) => {
    if (offer.isFavorite) {
      return favoriteOfferAdapter.setOne(offer, {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      });
    }
    return favoriteOfferAdapter.removeOne(offer.id, {
      ...state,
      isLoading: false,
      success: true,
      error: null,
    });
  }),
  on(toggleFavoriteOfferFailure, (state, { error }) => ({
    ...state,
    isLoading: true,
    success: false,
    error,
  })),
);
