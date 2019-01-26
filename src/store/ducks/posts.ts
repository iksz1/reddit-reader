import { Reducer } from "redux";
import { IParsedPosts } from "../utils/redditAPI";
import { IAppState } from ".";
import { createAction } from "../utils/actionHelper";
import { IStamp } from "../utils/stamp";

export const POSTS_FETCH = "POSTS_FETCH";
export const POSTS_FETCH_MORE = "POSTS_FETCH_MORE";
export const POSTS_REPLACE = "POSTS_REPLACE";
export const POSTS_APPEND = "POSTS_APPEND";
export const POSTS_ERROR = "POSTS_ERROR";

const initialState = {
  data: [],
  meta: {},
  isLoading: false,
  error: null,
};

export interface IPostsState extends IParsedPosts {
  isLoading: boolean;
  error: Error | null;
  stamp?: IStamp;
}

export type PostsAction = PostsFetch | PostsFetchMore | PostsReplace | PostsAppend | PostsError;

const postsReducer: Reducer<IPostsState, PostsAction> = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_FETCH:
      return { ...initialState, isLoading: true };
    case POSTS_FETCH_MORE:
      return { ...state, isLoading: true };
    case POSTS_REPLACE:
      return { ...initialState, ...action.payload };
    case POSTS_APPEND:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        data: [...state.data, ...action.payload.data],
      };
    case POSTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

interface IPostsFetchParams {
  subreddit: string;
  query?: string;
}

export type PostsFetch = ReturnType<typeof postsFetch>;

export const postsFetch = (params: IPostsFetchParams) => createAction(POSTS_FETCH, params);

export type PostsFetchMore = ReturnType<typeof postsFetchMore>;

export const postsFetchMore = (params: IPostsFetchParams) => createAction(POSTS_FETCH_MORE, params);

export type PostsReplace = ReturnType<typeof postsReplace>;

export const postsReplace = (data: IParsedPosts, stamp: IStamp) =>
  createAction(POSTS_REPLACE, { ...data, stamp });

export type PostsAppend = ReturnType<typeof postsAppend>;

export const postsAppend = (data: IParsedPosts, stamp: IStamp) =>
  createAction(POSTS_APPEND, { ...data, stamp });

export type PostsError = ReturnType<typeof postsError>;

export const postsError = (error: Error) => createAction(POSTS_ERROR, error);

export const dataSelector = (state: IAppState) => state.subreddit.posts.data;

export const metaSelector = (state: IAppState) => state.subreddit.posts.meta;

export const loadingSelector = (state: IAppState) => state.subreddit.posts.isLoading;

export const errorSelector = (state: IAppState) => state.subreddit.posts.error;

export const stampSelector = (state: IAppState) => state.subreddit.posts.stamp;

export default postsReducer;
