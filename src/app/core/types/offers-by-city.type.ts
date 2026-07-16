import {CityName} from './city-name.type';
import {OfferPreview} from '../models/offers';

export type OffersByCity = Record<CityName, OfferPreview[]>;
