import { combineReducers } from "redux";
import subs, { Subs } from "./subs";
import data, { IData } from "./data";
import cache, { Cache } from "./cache";
import view, { IView } from "./view";

export interface IAppState {
  subs: Subs;
  data: IData;
  cache: Cache;
  view: IView;
}

const reducer = combineReducers<IAppState>({ subs, data, cache, view });

export default reducer;
