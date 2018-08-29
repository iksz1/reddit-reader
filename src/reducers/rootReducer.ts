import { combineReducers } from "redux";
import auth, { IAuth } from "./authReducer";
import subs, { Subs } from "./subsReducer";
import data, { IData } from "./dataReducer";
import cache, { Cache } from "./cacheReducer";
import view, { IView } from "./viewReducer";

export interface IAppState {
  auth: IAuth;
  subs: Subs;
  data: IData;
  cache: Cache;
  view: IView;
}

const reducer = combineReducers<IAppState>({ auth, subs, data, cache, view });

export default reducer;
