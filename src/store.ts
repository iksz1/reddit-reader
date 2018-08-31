import { createStore, applyMiddleware, compose } from "redux";
import { fetchMiddleware } from "./middleware/fetchMiddleware";
import { persistMiddleware } from "./middleware/persistMiddleware";
import reducer from "./reducers/rootReducer";
import themes from "./utils/themes";

const getItem = (key: string, parse = true) => {
  try {
    const item = localStorage.getItem(key) || "";
    return parse ? JSON.parse(item) : item;
  } catch (error) {
    return null;
  }
};

const defaultSubs = ["webdev", "javascript", "reactjs"];
const themeName = getItem("_theme", false) || "night";

const initialStore = {
  auth: getItem("_auth"),
  subs: getItem("_subs") || defaultSubs,
  view: {
    isSidebarVisible: window.innerWidth >= 720,
    theme: themeName in themes ? themes[themeName] : themes.night,
  },
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(fetchMiddleware, persistMiddleware));

const store = createStore(reducer, initialStore, middleware);

export default store;
