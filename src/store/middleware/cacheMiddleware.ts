import { Middleware } from "redux";
import { IFetchRequest, fetchSuccess, FETCH_REQUEST, FETCH_SUCCESS } from "../ducks/data";
import { setCache, Cache } from "../ducks/cache";

export const cacheMiddleware: Middleware = ({ getState, dispatch }) => next => action => {
  if (action.type === FETCH_REQUEST) {
    const { uri }: IFetchRequest = action.payload;

    // serve from cache if it's available
    const cache = (getState().cache as Cache).find(item => item.key === uri);
    if (cache && cache.expires > Date.now()) {
      return next(fetchSuccess(cache.data, { ...action.payload }));
    }
  } else if (action.type === FETCH_SUCCESS) {
    const { uri }: IFetchRequest = action.meta;
    dispatch(setCache(uri, action.payload));
  }
  return next(action);
};
