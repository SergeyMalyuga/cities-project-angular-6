import {FavoriteClass} from '../constants/const';

export interface Bookmark {
  activeClass: (typeof FavoriteClass)[keyof typeof FavoriteClass];
}
