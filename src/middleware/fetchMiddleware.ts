import types from "../actions/types";
import { setView } from "../actions/creators";
import { Middleware } from "redux";
import parser from "../utils/responseParser";

export const fetchMiddleware: Middleware = state => next => action => {
  if (action.type === types.FETCH) {
    const { type, id, onSuccess } = action.payload;

    next(setView({ type, id }));

    const url = `https://www.reddit.com/r/${id}.json?raw_json=1`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(json => onSuccess(parser(json).posts))
      .catch(error => console.error(error.message)); // tslint:disable-line
  }
};
