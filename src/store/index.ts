import { createStore, compose, applyMiddleware } from "redux";
import { cachingMiddleware, fetchingMiddleware, persistMiddleware } from "./middleware";
import reducer from "./ducks";
import { THEMES, DEFAULT_THEME, DEFAULT_SUBS } from "../constants";
import { getItem } from "./utils/localStorage";

const themeId = getItem("_theme");

const initialStore = {
  subs: getItem("_subs", true) || DEFAULT_SUBS,
  view: {
    isSidebarVisible: window.innerWidth >= 720,
    themeId: themeId in THEMES ? themeId : DEFAULT_THEME,
  },
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(cachingMiddleware, fetchingMiddleware, persistMiddleware)
);

const store = createStore(reducer, initialStore, enhancer);

export default store;
