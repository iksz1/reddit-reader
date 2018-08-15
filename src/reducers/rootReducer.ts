import { combineReducers } from "redux";
import auth from "./authReducer";
import subs from "./subsReducer";
import cache from "./cacheReducer";
import { IAuth, Subs, Cache } from "../actions/creators";

export interface IAppState {
  auth: IAuth;
  subs: Subs;
  cache: Cache;
}

const reducer = combineReducers<IAppState>({
  auth,
  subs,
  cache,
});

export default reducer;
