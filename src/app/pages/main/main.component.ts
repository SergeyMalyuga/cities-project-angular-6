import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectCurrentCity, selectOffersByCity,} from '../../store/app/selectors/app.selectors';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CITY_LOCATIONS, SortType} from '../../core/constants/const';
import {NgClass} from '@angular/common';
import {City} from '../../core/models/city';
import {changeCity} from '../../store/city/actions/city.actions';
import {OfferPreview} from '../../core/models/offers';
import {MapComponent} from '../../shared/components/map/map.component';
import {PlacesSortingFormComponent} from '../../components/places-sorting-form/places-sorting-form.component';
import {SortByPipe} from './pipes/sort-by.pipe';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, OfferCardComponent, NgClass, MapComponent, PlacesSortingFormComponent, SortByPipe],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private store = inject(Store<AppState>);

  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public offers = this.store.selectSignal(selectOffersByCity);
  public currentCity = this.store.selectSignal(selectCurrentCity);
  public activeCard = signal<OfferPreview | null>(null);
  public currentSortType = signal<SortType>(SortType.POPULAR);

  public changeCity(city: City) {
    this.store.dispatch(changeCity({city}));
  }

  public changeActiveCard(offer: OfferPreview | null) {
    this.activeCard.set(offer);
  }

  public changeSortType(sortType: SortType) {
    this.currentSortType.set(sortType);
  }
}
