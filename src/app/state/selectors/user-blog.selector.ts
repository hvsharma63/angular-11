import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user-blog.reducer';

export const getUserFeatureState = createFeatureSelector<fromUser.State>(
  fromUser.userblogFeatureKey
);
export const getUsers = createSelector(
  getUserFeatureState,
  (state: fromUser.State) => state.blogs
);

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);
export const getLikes = createSelector(
  getUserFeatureState,
  (state: fromUser.State) => state.blogs
);
