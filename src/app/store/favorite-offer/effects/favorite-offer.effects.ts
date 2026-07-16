import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferService } from '../../../core/services/favorite-offer.service';
import * as FavoriteActions from '../actions/favorite-offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferService = inject(FavoriteOfferService);

  public loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavoriteOffers),
      switchMap(() =>
        this.favoriteOfferService.getOffers().pipe(
          map((offers) =>
            FavoriteActions.loadFavoriteOffersSuccess({ offers }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(FavoriteActions.loadFavoriteOffersFailure({ error })),
          ),
        ),
      ),
    ),
  );

  public toggleFavoriteOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.toggleFavoriteOffer),
      switchMap(({ offerId, isFavorite }) =>
        this.favoriteOfferService.toggleFavorite(offerId, isFavorite).pipe(
          map((offer) => FavoriteActions.toggleFavoriteOfferSuccess({ offer })),
          catchError((error: HttpErrorResponse) =>
            of(FavoriteActions.toggleFavoriteOfferFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
