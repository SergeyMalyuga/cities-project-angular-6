import { City } from './city';
import { Host } from './host';
import { Location } from './location';

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  previewImage: string;
  maxAdults: number;
  reviews: string[];
}

export interface OfferPreview {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type SortOffers = Map<string, OfferPreview[]>;
