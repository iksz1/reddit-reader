import { Middleware } from "redux";
import { validateStamp } from "../utils/stamp";
import * as P from "../ducks/posts";
import * as C from "../ducks/comments";

// Do nothing if data is fresh, else pass the action to fetchingMiddleware

export const cachingMiddleware: Middleware = ({ getState }) => next => action => {
  switch (action.type) {
    case P.POSTS_FETCH: {
      const stamp = P.stampSelector(getState());
      return stamp && validateStamp(stamp, action.payload) ? null : next(action);
    }
    case C.COMMENTS_FETCH: {
      const stamp = C.stampSelector(getState());
      return stamp && validateStamp(stamp, action.payload) ? null : next(action);
    }

    default:
      return next(action);
  }
};
