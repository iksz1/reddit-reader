import { combineReducers } from "redux";
import auth from "./authReducer";
import subs from "./subsReducer";
import view from "./viewReducer";

const reducer = combineReducers({
  auth,
  subs,
  view,
});

export default reducer;
