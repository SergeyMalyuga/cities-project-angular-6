import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user.service';
import * as UserActions from '../actions/user.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppRoute } from '../../../core/constants/const';
import { loadFavoriteOffers } from '../../favorite-offer/actions/favorite-offer.actions';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuth),
      switchMap(() => {
        const token = this.authService.getToken();
        if (token) {
          return this.userService.checkAuth().pipe(
            map((user) => UserActions.checkAuthSuccess({ user })),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.checkAuthFailure({ error })),
            ),
          );
        }
        return of(UserActions.checkAuthFailure({ error: 'Unauthorized' }));
      }),
    ),
  );

  public authSuccessLoadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.checkAuthSuccess),
      map(() => loadFavoriteOffers()),
    ),
  );

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      switchMap(({ credentials }) =>
        this.userService.login(credentials).pipe(
          tap((user) => this.authService.setAuth(user.token)),
          map((user) => UserActions.loginSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loginFailure({ error })),
          ),
        ),
      ),
    ),
  );

  public logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logout),
      switchMap(() =>
        this.userService.logout().pipe(
          tap(() => this.authService.removeToken()),
          map(() => UserActions.logoutSuccess()),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.logoutFailure({ error })),
          ),
        ),
      ),
    ),
  );

  public logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logoutSuccess),
        tap(() => this.router.navigate([AppRoute.MAIN])),
      ),
    { dispatch: false },
  );
}
