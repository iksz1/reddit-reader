import { combineReducers } from "redux";
import auth from "./authReducer";
import subs from "./subsReducer";
import view from "./viewReducer";
import { IAuth, IView } from "../actions/creators";

export interface IAppState {
  auth: IAuth;
  subs: string[];
  view: IView;
}

const reducer = combineReducers<IAppState>({
  auth,
  subs,
  view,
});

export default reducer;
