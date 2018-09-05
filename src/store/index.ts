import { createStore, applyMiddleware, compose } from "redux";
import { fetchMiddleware } from "./middleware/fetchMiddleware";
import { persistMiddleware } from "./middleware/persistMiddleware";
import reducer from "./ducks";
import { THEMES, DEFAULT_THEME, DEFAULT_SUBS } from "../constants";
import { getItem } from "./utils/localStorage";

const themeId = getItem("_theme");

const initialStore = {
  auth: getItem("_auth", true),
  subs: getItem("_subs", true) || DEFAULT_SUBS,
  view: {
    isSidebarVisible: window.innerWidth >= 720,
    themeId: themeId in THEMES ? themeId : DEFAULT_THEME,
  },
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(fetchMiddleware, persistMiddleware));

const store = createStore(reducer, initialStore, middleware);

export default store;
