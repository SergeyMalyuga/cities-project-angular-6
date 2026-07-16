import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {OffersByCity} from '../../core/types/offers-by-city.type';
import {CITIES} from '../../core/constants/const';
import {
  selectFavoriteOffers,
  selectFavoriteOffersTotal
} from '../../store/favorite-offer/selectors/favorite-offers.selectors';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CityName} from '../../core/types/city-name.type';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, OfferCardComponent, NgClass],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  private store = inject(Store<AppState>);
  private favoriteOffers = this.store.selectSignal(selectFavoriteOffers);
  private offersTotal = this.store.selectSignal(selectFavoriteOffersTotal);

  protected readonly CITIES = CITIES;

  public isEmptyPage = computed(() => this.favoriteOffers().length === 0);

  public offers = computed<OffersByCity>(() => {
    const offersByCity = this.createEmptyOffersByCity();
    const offers = this.favoriteOffers();
    offers.forEach(offer => {
      const key = offer.city.name;
      if (this.isKeyOfOffersByCity(key)) {
        offersByCity[key].push(offer)
      }
    });
    return offersByCity;
  });

  private createEmptyOffersByCity(): OffersByCity {
    return CITIES.reduce((acc, city) => {
      acc[city] = [];
      return acc
    }, {} as OffersByCity);
  }

  public isKeyOfOffersByCity(key: string): key is keyof OffersByCity {
    return CITIES.includes(key as CityName);
  }
}
