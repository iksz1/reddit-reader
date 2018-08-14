import types from "../actions/types";
import { Middleware } from "redux";
import parser from "../utils/responseParser";
import { IRequest } from "../actions/creators";

const BASE_URL = `https://www.reddit.com`;
const BASE_PARAMS = `.json?raw_json=1`;

export const fetchMiddleware: Middleware = state => next => action => {
  if (action.type === types.FETCH) {
    const { uri, onSuccess }: IRequest = action.payload;
    const url = BASE_URL + uri + BASE_PARAMS;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => onSuccess(parser(json)))
      .catch(error => console.error(error.message)); // tslint:disable-line
  }
  return next(action);
};
