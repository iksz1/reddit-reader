import types from "../actions/types";
import { Middleware } from "redux";
import parser from "../utils/responseParser";
import { setCache, IRequest, Cache } from "../actions/creators";

const BASE_URL = `https://www.reddit.com`;
const BASE_PARAMS = `.json?raw_json=1`;

export const fetchMiddleware: Middleware = ({ getState, dispatch }) => next => action => {
  if (action.type === types.FETCH) {
    const { uri, onSuccess }: IRequest = action.payload;

    // serve from cache if it's available
    const cache = (getState().cache as Cache).find(item => item.key === uri);
    if (cache && cache.expires > Date.now()) {
      onSuccess(cache.data);
      return next(action);
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
        onSuccess(data);
      })
      .catch(error => console.error(error.message)); // tslint:disable-line
  }
  return next(action);
};
