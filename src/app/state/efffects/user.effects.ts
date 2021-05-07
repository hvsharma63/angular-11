
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { Observable, of } from 'rxjs';
// import { Action, Store } from '@ngrx/store';
// import * as userActions from '../actions/user.actions';
// import { mergeMap, map, catchError } from 'rxjs/operators';
// import { MainService } from 'src/app/shared/services/main.service';


// @Injectable()
// export class UserEffects {
//   token = '';
//   userId = '';

//   constructor(
//     private actions$: Actions,
//     private mainService: MainService,
//     private store: Store
//   ) {
//   }

//   loadUsers$: Observable<Action> = createEffect(() =>
//     this.actions$.pipe(
//       ofType(userActions.UserActionTypes.LoadUsersDetailsSuccess),
//       mergeMap((action) =>
//         this.mainService.getProfileDetails().pipe(
//           map(
//             (users) =>
//               new userActions.LoadUsersDetailsSuccess({ data: users.response })
//           ),
//           catchError((err) =>
//             of(new userActions.LoadUsersDetailsFailure({ error: err }))
//           )
//         )
//       )
//     )
//   );
// }
