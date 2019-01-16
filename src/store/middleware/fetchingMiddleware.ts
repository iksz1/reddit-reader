import { Middleware } from "redux";
import api from "../utils/redditAPI";
import { createStamp } from "../utils/stamp";
import * as P from "../ducks/posts";
import * as C from "../ducks/comments";

export const fetchingMiddleware: Middleware = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type === P.POSTS_FETCH) {
    try {
      const data = await api.getPosts(action.payload);
      dispatch(P.postsReplace(data, createStamp(action.payload)));
    } catch (error) {
      dispatch(P.postsError(error));
    }
  } else if (action.type === P.POSTS_FETCH_MORE) {
    try {
      const data = await api.getPosts(action.payload);
      dispatch(P.postsAppend(data, createStamp(action.payload)));
    } catch (error) {
      dispatch(P.postsError(error));
    }
  } else if (action.type === C.COMMENTS_FETCH) {
    try {
      const data = await api.getComments(action.payload);
      dispatch(C.commentsReplace(data, createStamp(action.payload)));
    } catch (error) {
      dispatch(C.commentsError(error));
    }
  } else if (action.type === C.COMMENTS_FETCH_MORE) {
    try {
      const data = await api.getMoreComments(action.payload);
      dispatch(C.commentsAdd(data));
    } catch (error) {
      dispatch(C.commentsError(error));
    }
  }
};
