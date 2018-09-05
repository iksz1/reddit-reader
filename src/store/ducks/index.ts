import { combineReducers } from "redux";
import auth, { IAuth } from "./auth";
import subs, { Subs } from "./subs";
import data, { IData } from "./data";
import cache, { Cache } from "./cache";
import view, { IView } from "./view";

export interface IAppState {
  auth: IAuth;
  subs: Subs;
  data: IData;
  cache: Cache;
  view: IView;
}

const reducer = combineReducers<IAppState>({ auth, subs, data, cache, view });

export default reducer;
