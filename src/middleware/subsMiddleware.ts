import types from "../actions/types";
import { Middleware } from "redux";

export const subsMiddleware: Middleware = store => next => action => {
  // save subs in localStorage
  if (action.type === types.SUBS_ADD || action.type === types.SUBS_REMOVE) {
    next(action);

    try {
      localStorage.setItem("_subs", JSON.stringify(store.getState().subs));
    } catch (error) {
      console.error("Failed to save subs."); // tslint:disable-line
    }
  } else {
    return next(action);
  }
};
