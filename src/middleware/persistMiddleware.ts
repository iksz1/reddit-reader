import { TYPES } from "../constants";
import { Middleware } from "redux";
import { setItem } from "../utils/localStorage";

// saves changes in localStorage
export const persistMiddleware: Middleware = ({ getState }) => next => action => {
  switch (action.type) {
    case TYPES.SUBS_ADD:
    case TYPES.SUBS_REMOVE:
      next(action);
      setItem("_subs", JSON.stringify(getState().subs));
      return;
    case TYPES.VIEW_CHANGE_THEME:
      setItem("_theme", action.payload);
      return next(action);

    default:
      next(action);
  }
};
