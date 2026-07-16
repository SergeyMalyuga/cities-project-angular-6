import {createAction, props} from '@ngrx/store';
import {User} from '../../../core/models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Credentials} from '../../../core/models/credentials';

export const checkAuth = createAction('[App Component] Check Auth]');
export const checkAuthSuccess = createAction(
  '[App Component] Check Auth Success',
  props<{ user: User }>(),
);
export const checkAuthFailure = createAction(
  '[App Component] Check Auth Failure',
  props<{ error: HttpErrorResponse | string }>(),
);

export const login = createAction(
  '[Login Component] Login',
  props<{ credentials: Credentials }>(),
);
export const loginSuccess = createAction(
  '[Login Component] Login Success',
  props<{ user: User }>(),
);
export const loginFailure = createAction(
  '[Login Component] Login Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const logout = createAction('[Logout Component] Logout');
export const logoutSuccess = createAction('[Logout Component] Logout Success');
export const logoutFailure = createAction(
  '[Logout Component] Logout Failure',
  props<{ error: HttpErrorResponse }>(),
);
