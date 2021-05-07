/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Action, createReducer, on } from '@ngrx/store';

import { IUser } from '../../shared/interfaces/user';
import * as UserActions from '../actions/user.actions';

export const userdetailsFeatureKey = 'userState';
export interface UserState {
  users: IUser[];
}

export const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state: UserState, { user }) => ({
    ...state,
    users: [...state.users, user],
  }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}




// import { IUser } from 'src/app/shared/interfaces/user';
// import { UserActionTypes, UserDetailsActions } from '../actions/user.actions';

// export const userdetailsFeatureKey = 'usersDetailsState';

// export interface State {
//   users: IUser[];
//   error: string;
// }

// export const initialState: State = {
//   users: [],
//   error: '',
// };

// export function reducer(state = initialState, action: UserDetailsActions): State {
//   switch (action.type) {

//     case UserActionTypes.LoadUsersDetailsSuccess:
//     return {
//       ...state,
//       users: action.payload.data,
//       error: '',
//     };

//   case UserActionTypes.LoadUsersDetailsFailure:
//     return {
//       ...state,
//       users: [],
//       error: action.payload.error,
//     };
//   default:
//     return state;
//   }
// }

