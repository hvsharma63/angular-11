/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import { Action } from '@ngrx/store';
import { IUserBlog } from 'src/app/shared/interfaces/users-blog';


export enum UserActionBlogTypes {
  LoadUsersBlog = '[User] Load UsersBlog',
  LoadUsersBlogSuccess = '[User] Load UsersBlog Success',
  LoadUsersBlogFailure = '[User] Load UsersBlog Failure',
  LoadUsersBlogLikes = '[User] Load UsersBlog Likes',
}

export class LoadUsersBlog implements Action {
  readonly type = UserActionBlogTypes.LoadUsersBlog;
}

export class LoadUsersBlogSuccess implements Action {
  readonly type = UserActionBlogTypes.LoadUsersBlogSuccess;
  constructor(public payload: { data: IUserBlog[] }) {}
}

export class LoadUsersBlogFailure implements Action {
  readonly type = UserActionBlogTypes.LoadUsersBlogFailure;
  constructor(public payload: { error: string }) {}
}

export type UserBlogActions =
  | LoadUsersBlog
  | LoadUsersBlogSuccess
  | LoadUsersBlogFailure;
