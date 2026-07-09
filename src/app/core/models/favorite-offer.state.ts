import { EntityState } from '@ngrx/entity';
import { OfferPreview } from './offers';
import { HttpErrorResponse } from '@angular/common/http';

export interface FavoriteOfferState extends EntityState<OfferPreview> {
  isLoading: boolean;
  error: HttpErrorResponse | string | null;
  success: boolean | null;
}
