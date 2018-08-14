import { combineReducers } from "redux";
import auth from "./authReducer";
import subs from "./subsReducer";
import { IAuth, Subs } from "../actions/creators";

export interface IAppState {
  auth: IAuth;
  subs: Subs;
}

const reducer = combineReducers<IAppState>({
  auth,
  subs,
});

export default reducer;
