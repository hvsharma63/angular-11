/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as userActions from '../actions/user-blog.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { MainService } from 'src/app/shared/services/main.service';


@Injectable()
export class UserEffectsBlog {
  token = '';
  userId = '';

  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private store: Store
  ) {
    this.token = localStorage.getItem('token')!;
    this.userId = localStorage.getItem('userid')!;
  }

  loadUsers$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.UserActionBlogTypes.LoadUsersBlog),
      mergeMap((action) =>
        this.mainService.getAllUsersBlog(this.userId).pipe(
          map(
            (blogs) =>
              new userActions.LoadUsersBlogSuccess({ data: blogs.response })
          ),
          catchError((err) =>
            of(new userActions.LoadUsersBlogFailure({ error: err }))
          )
        )
      )
    )
  );
}
