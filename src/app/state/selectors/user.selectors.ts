import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectCustomerState = createFeatureSelector<fromUser.UserState>(
  fromUser.userdetailsFeatureKey
);

export const selectUsers = createSelector(
  selectCustomerState,
  (state: fromUser.UserState) => state.users
);
