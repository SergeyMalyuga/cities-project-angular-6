import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferDataService } from '../../../core/services/offer-data.service';
import * as OfferActions from '../actions/offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OfferEffects {
  private actions$ = inject(Actions);
  private offerDataService = inject(OfferDataService);

  public loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OfferActions.loadOffers),
      switchMap(() =>
        this.offerDataService.getOffers().pipe(
          map((offers) => OfferActions.loadOffersSuccess({ offers })),
          catchError((error: HttpErrorResponse) =>
            of(OfferActions.loadOffersFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
