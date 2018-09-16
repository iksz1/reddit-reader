import { Middleware } from "redux";
import parser from "../utils/responseParser";
import { IFetchRequest, fetchSuccess, fetchFailure, FETCH_REQUEST } from "../ducks/data";

const BASE_URL = `https://www.reddit.com`;
const BASE_PARAMS = `.json?raw_json=1`;

export const fetchMiddleware: Middleware = ({ dispatch }) => next => action => {
  if (action.type === FETCH_REQUEST) {
    const { uri }: IFetchRequest = action.payload;
    const url = BASE_URL + uri + BASE_PARAMS;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(String(response.status));
      })
      .then(json => {
        const data = parser(json);
        dispatch(fetchSuccess(data, { uri }));
      })
      .catch(error => {
        dispatch(fetchFailure(error, { uri }));
      });
  }
  return next(action);
};
