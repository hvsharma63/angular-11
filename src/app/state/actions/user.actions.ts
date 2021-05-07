import { createAction } from '@ngrx/store';
import { IUser } from 'src/app/shared/interfaces/user';


export const addUser = createAction('', (user: IUser) => ({ user }));


// import { Action } from '@ngrx/store';
// import { IUser } from 'src/app/shared/interfaces/user';


// export enum UserActionTypes {
//   LoadUsersDetailsSuccess = '[User] Load UsersDetails Success',
//   LoadUsersDetailsFailure = '[User] Load UsersDetails Failure',
// }



// export class LoadUsersDetailsSuccess implements Action {
//   readonly type = UserActionTypes.LoadUsersDetailsSuccess;
//   constructor(public payload: { data: IUser[] }) {console.log(payload);}
// }

// export class LoadUsersDetailsFailure implements Action {
//   readonly type = UserActionTypes.LoadUsersDetailsFailure;
//   constructor(public payload: { error: string }) {}
// }

// export type UserDetailsActions =
//   | LoadUsersDetailsSuccess
//   | LoadUsersDetailsFailure;
