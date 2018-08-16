import { combineReducers } from "redux";
import auth, { IAuth } from "./authReducer";
import subs, { Subs } from "./subsReducer";
import data, { IData } from "./dataReducer";
import cache, { Cache } from "./cacheReducer";

export interface IAppState {
  auth: IAuth;
  subs: Subs;
  data: IData;
  cache: Cache;
}

const reducer = combineReducers<IAppState>({ auth, subs, data, cache });

export default reducer;
