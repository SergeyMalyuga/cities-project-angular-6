import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL, FavoriteStatus } from '../constants/const';
import { getDefaultHttpPipes } from '../utils/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http
      .get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`)
      .pipe(...getDefaultHttpPipes<OfferPreview[]>());
  }

  public toggleFavorite(
    offerId: string,
    isFavorite: boolean,
  ): Observable<Offer> {
    const status = isFavorite ? FavoriteStatus.ADDED : FavoriteStatus.REMOVED;
    return this.http
      .post<Offer>(`${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${status}`, {})
      .pipe(...getDefaultHttpPipes<Offer>());
  }
}
