import types from "../actions/types";
import { Middleware } from "redux";
import parser from "../utils/responseParser";
import { setCache, IFetchRequest, fetchSuccess, fetchFailure } from "../actions/creators";
import { Cache } from "../reducers/cacheReducer";

const BASE_URL = `https://www.reddit.com`;
const BASE_PARAMS = `.json?raw_json=1`;

export const fetchMiddleware: Middleware = ({ getState, dispatch }) => next => action => {
  if (action.type === types.FETCH_REQUEST) {
    const { uri }: IFetchRequest = action.payload;

    // serve from cache if it's available
    const cache = (getState().cache as Cache).find(item => item.key === uri);
    if (cache && cache.expires > Date.now()) {
      return dispatch(fetchSuccess(cache.data));
    }

    const url = BASE_URL + uri + BASE_PARAMS;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => {
        const data = parser(json);
        dispatch(setCache(uri, data));
        dispatch(fetchSuccess(data));
      })
      .catch(error => {
        dispatch(fetchFailure(error.message));
      });
  }
  return next(action);
};
