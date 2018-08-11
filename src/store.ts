import { createStore, applyMiddleware, Store } from "redux";
import { fetchMiddleware } from "./middleware/fetchMiddleware";
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

const middleware = applyMiddleware(fetchMiddleware);

const store = createStore(reducer, initialStore, middleware);

export default store;
