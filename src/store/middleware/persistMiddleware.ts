import { Middleware } from "redux";
import { setItem } from "../utils/localStorage";
import { SUBS_ADD, SUBS_REMOVE } from "../ducks/subs";
import { VIEW_CHANGE_THEME } from "../ducks/view";

// saves changes in localStorage
export const persistMiddleware: Middleware = ({ getState }) => next => action => {
  switch (action.type) {
    case SUBS_ADD:
    case SUBS_REMOVE:
      next(action);
      setItem("_subs", JSON.stringify(getState().subs));
      return;
    case VIEW_CHANGE_THEME:
      setItem("_theme", action.payload);
      return next(action);

    default:
      next(action);
  }
};
