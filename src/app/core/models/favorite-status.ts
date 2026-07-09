import {FavoriteStatus} from '../constants/const';

export type FavoriteStatus =
  (typeof FavoriteStatus)[keyof typeof FavoriteStatus];
