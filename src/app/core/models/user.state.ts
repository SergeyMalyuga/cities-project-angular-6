import { User } from './user';
import { AuthorizationStatus } from '../constants/const';
import { HttpErrorResponse } from '@angular/common/http';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  user: User | undefined;
  error: HttpErrorResponse | string | null;
  isLoading: boolean;
}
