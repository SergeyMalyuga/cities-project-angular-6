import {createAction, props} from '@ngrx/store';
import {OfferPreview} from '../../../core/models/offers';
import {HttpErrorResponse} from '@angular/common/http';

export const loadOffers = createAction('[Offer] Load Offers]');
export const loadOffersSuccess = createAction(
  '[Offer Effects] Load Offers Success',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersFailure = createAction(
  '[Offer Effects] Load Offers Failure]',
  props<{ error: HttpErrorResponse }>(),
);
