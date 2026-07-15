import {Offer, OfferPreview} from '../models/offers';
import {AuthorizationStatus} from '../constants/const';

export function isEnableActiveMark(offer: OfferPreview | Offer | null, authStatus: AuthorizationStatus): boolean {
  if (offer) {
    return offer.isFavorite && authStatus === AuthorizationStatus.AUTH;
  }
  return false;
}
