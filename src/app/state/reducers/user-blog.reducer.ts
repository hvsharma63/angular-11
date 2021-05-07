/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { IUserBlog } from 'src/app/shared/interfaces/users-blog';
import { UserBlogActions, UserActionBlogTypes } from '../actions/user-blog.action';

export const userblogFeatureKey = 'usersBlogState';

export interface State {
  blogs: IUserBlog[];
  error: string;
}

export const initialState: State = {
  blogs: [],
  error: '',
};

export function reducer(state = initialState, action: UserBlogActions): State {
  switch (action.type) {

   case UserActionBlogTypes.LoadUsersBlog:
    return {
      ...state,
    };

    case UserActionBlogTypes.LoadUsersBlogSuccess:
    return {
      ...state,
      blogs: action.payload.data,
      error: '',
    };

  case UserActionBlogTypes.LoadUsersBlogFailure:
    return {
      ...state,
      blogs: [],
      error: action.payload.error,
    };
  default:
    return state;
  }
}
