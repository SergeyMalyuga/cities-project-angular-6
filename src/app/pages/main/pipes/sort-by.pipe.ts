import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {SortType} from '../../../core/constants/const';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType) {
    if (!offers) return [];
    switch (sortType) {
      case SortType.PRICE_LOW_TO_HIGH: {
        return [...offers].sort((a, b) => a.price - b.price);
      }
      case SortType.PRICE_HIGH_TO_LOW: {
        return [...offers].sort((a, b) => b.price - a.price);
      }
      case SortType.TOP_RATED_FIRST: {
        return [...offers].sort((a, b) => b.rating - a.rating);
      }
      default: {
        return [...offers];
      }
    }
  }
}
