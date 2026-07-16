import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';

const selectUserState = createFeatureSelector<AppState['user']>('user');

export const selectAuthStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus,
);

export const selectEmail = createSelector(
  selectUserState,
  (state) => state.user?.email,
);
