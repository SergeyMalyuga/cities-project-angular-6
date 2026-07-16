import {City} from '../models/city';

export enum AppRoute {
  MAIN = '',
  LOGIN = 'login',
  OFFER = 'offer',
  FAVORITES = 'favorites',
}

export enum APIRoute {
  LOGIN = 'login',
  LOGOUT = 'logout',
  COMMENTS = 'comments',
  FAVORITE = 'favorite',
  OFFERS = 'offers',
}

export const API_PATHS = {
  NEARBY: 'nearby',
} as const;

export enum AuthorizationStatus {
  AUTH = 'authenticated',
  UN_AUTH = 'unauthorized',
  UNKNOWN = 'unknown',
}

export enum CityName {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const CITY_LOCATIONS: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10,
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 10,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 10,
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37006332827682,
      longitude: 4.8958540704711595,
      zoom: 10,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.553841,
      longitude: 9.99165,
      zoom: 10,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 10,
    },
  },
];

export const DEFAULT_CITY: City = {
  name: 'Paris',
  location: {
    latitude: 48.8534,
    longitude: 2.3488,
    zoom: 10,
  },
};

export enum SortType {
  POPULAR = 'Popular',
  PRICE_LOW_TO_HIGH = 'Price: low to high',
  PRICE_HIGH_TO_LOW = 'Price: high to low',
  TOP_RATED_FIRST = 'Top rated first',
}

export const sortTypeKeys = {
  [SortType.POPULAR]: 'POPULAR',
  [SortType.PRICE_LOW_TO_HIGH]: 'PRICE_LOW_TO_HIGH',
  [SortType.PRICE_HIGH_TO_LOW]: 'PRICE_HIGH_TO_LOW',
  [SortType.TOP_RATED_FIRST]: 'TOP_RATED_FIRST',
};

export const FavoriteClass = {
  OFFER: 'offer__bookmark-button--active',
  PLACE_CARD: 'place-card__bookmark-button--active',
} as const;

export const FavoriteStatus = {
  REMOVED: 0,
  ADDED: 1,
} as const;

export const TIMEOUT_MS = 10000;
export const RETRY_ATTEMPTS = 3;

export type FavoriteClass = (typeof FavoriteClass)[keyof typeof FavoriteClass];

export const QUANTITY_FIRST_OFFERS = 3;

export const DEFAULT_USER = undefined;

export const AUTH_TOKEN_KEY_NAME = 'auth-token';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
