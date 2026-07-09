import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';
import { HttpErrorResponse } from '@angular/common/http';

export const loadOffers = createAction('[Offer] Load offers]');
export const loadOffersSuccess = createAction(
  '[Offer Effects] Load offers success',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersFailure = createAction(
  '[Offer Effects] Load offers failure]',
  props<{ error: HttpErrorResponse }>(),
);
