import { OfferPreview } from './offers';
import { EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

export interface OfferState extends EntityState<OfferPreview> {
  isLoading: boolean;
  error: HttpErrorResponse | string | null;
}
