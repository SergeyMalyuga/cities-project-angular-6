import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { OfferPreview } from '../../../core/models/offers';

const selectOfferState = createFeatureSelector<AppState['offer']>('offer');
const selectCityState =
  createFeatureSelector<AppState['currentCity']>('currentCity');

export const selectCurrentCity = createSelector(
  selectCityState,
  (state) => state,
);

export const selectOffersByCity = createSelector(
  selectOfferState,
  selectCityState,
  (offerState, cityState) =>
    Object.values(offerState.entities).filter(
      (offer): offer is OfferPreview => {
        if (offer === undefined) return false;
        return offer.city.name === cityState.name;
      },
    ),
);

export const selectIsOffersLoading = createSelector(
  selectOfferState,
  (state) => state.isLoading,
);
