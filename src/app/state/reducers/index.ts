import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromUser from './user-blog.reducer';

export interface State {
  [fromUser.userblogFeatureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State, any> = {
  [fromUser.userblogFeatureKey]: fromUser.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
