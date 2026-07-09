import { createAction, props } from '@ngrx/store';
import { City } from '../../../core/models/city';

export const changeCity = createAction('[City] City', props<{ city: City }>());
