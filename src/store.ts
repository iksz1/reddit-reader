import { createStore, applyMiddleware, compose } from "redux";
import { fetchMiddleware } from "./middleware/fetchMiddleware";
import { subsMiddleware } from "./middleware/subsMiddleware";
import reducer from "./reducers/rootReducer";

const getItem = (item: string) => {
  try {
    return JSON.parse(localStorage.getItem(item) || "");
  } catch (error) {
    return null;
  }
};

const defaultSubs = ["webdev", "javascript", "reactjs"];

const initialStore = {
  auth: getItem("_auth"),
  subs: getItem("_subs") || defaultSubs,
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware(fetchMiddleware, subsMiddleware));

const store = createStore(reducer, initialStore, middleware);

export default store;
