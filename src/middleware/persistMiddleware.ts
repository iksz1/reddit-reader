import types from "../actions/types";
import { Middleware } from "redux";

const saveItem = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to save ${key}`); // tslint:disable-line
  }
};

// saves changes in localStorage

export const persistMiddleware: Middleware = ({ getState }) => next => action => {
  switch (action.type) {
    case types.SUBS_ADD:
    case types.SUBS_REMOVE:
      next(action);
      saveItem("_subs", JSON.stringify(getState().subs));
      return;
    case types.VIEW_CHANGE_THEME:
      saveItem("_theme", action.payload);
      return next(action);

    default:
      next(action);
  }
};
