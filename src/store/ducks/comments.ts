import { Reducer } from "redux";
import { IParsedComments, IMoreComments, IParsedMoreComments } from "../utils/redditAPI";
import { IStamp } from "../utils/stamp";
import { createAction } from "../utils/actionHelper";
import { IAppState } from ".";

export const COMMENTS_FETCH = "COMMENTS_FETCH";
export const COMMENTS_FETCH_MORE = "COMMENTS_FETCH_MORE";
export const COMMENTS_REPLACE = "COMMENTS_REPLACE";
export const COMMENTS_ADD = "COMMENTS_ADD";
export const COMMENTS_ERROR = "COMMENTS_ERROR";
export const LOG_ERROR = "LOG_ERROR";

const initialState = {
  data: [[], []] as IParsedComments["data"],
  meta: {},
  isLoading: false,
  error: null,
};

export interface ICommentsState extends IParsedComments {
  isLoading: boolean;
  error: Error | null;
  stamp?: IStamp; // helps to identify stale data
}

type CommentsAction = CommentsFetch | CommentsReplace | CommentsAdd | CommentsError;

const commentsReducer: Reducer<ICommentsState, CommentsAction> = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_FETCH:
      return { ...initialState, isLoading: true };
    case COMMENTS_REPLACE:
      return { ...initialState, ...action.payload };
    case COMMENTS_ADD: {
      const id = state.data[1].findIndex(item => item.data.id === action.payload.meta.moreId);
      if (id >= 0) {
        const comments = [...state.data[1]];
        comments.splice(id, 1, ...action.payload.data);
        return { ...state, data: [state.data[0], comments] };
      }
      return state;
    }
    case COMMENTS_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

interface ICommentsFetchParams {
  subreddit: string;
  postId: string;
  query?: string;
}

export type CommentsFetch = ReturnType<typeof commentsFetch>;

export const commentsFetch = (params: ICommentsFetchParams) => createAction(COMMENTS_FETCH, params);

export type CommentsFetchMore = ReturnType<typeof commentsFetchMore>;

export const commentsFetchMore = (linkId: string, more: IMoreComments) =>
  createAction(COMMENTS_FETCH_MORE, { linkId, more });

export type CommentsReplace = ReturnType<typeof commentsReplace>;

export const commentsReplace = (data: IParsedComments, stamp: IStamp) =>
  createAction(COMMENTS_REPLACE, { ...data, stamp });

export type CommentsAdd = ReturnType<typeof commentsAdd>;

export const commentsAdd = (data: IParsedMoreComments) => createAction(COMMENTS_ADD, data);

export type CommentsError = ReturnType<typeof commentsError>;

export const commentsError = (error: Error) => createAction(COMMENTS_ERROR, error);

export const logError = (error: Error) => createAction(LOG_ERROR, error);

export const postDataSelector = (state: IAppState, id: string) => {
  return state.thread.comments.data[0][0]
    ? state.thread.comments.data[0][0]
    : state.subreddit.posts.data.find(post => post.id === id);
};

export const commentsDataSelector = (state: IAppState) => state.thread.comments.data[1];

export const metaSelector = (state: IAppState) => state.thread.comments.meta;

export const loadingSelector = (state: IAppState) => state.thread.comments.isLoading;

export const errorSelector = (state: IAppState) => state.thread.comments.error;

export const stampSelector = (state: IAppState) => state.thread.comments.stamp;

export default commentsReducer;
