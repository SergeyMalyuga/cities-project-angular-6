import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { OfferEffects } from './store/offer/effects/offer.effects';
import {UserEffects} from './store/user/effects/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(appReducer),
    provideEffects(OfferEffects, UserEffects),
  ],
};
