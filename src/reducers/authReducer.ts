import { Reducer } from "redux";
import types from "../actions/types";

export interface IAuth {
  access_token?: string;
}

const authReducer: Reducer<IAuth> = (state = {}, { type, payload }) => {
  switch (type) {
    case types.AUTH_SET:
      return { ...state, ...payload };
    case types.AUTH_CLEAR: // remove this
      return null;
    default:
      return state;
  }
};

export default authReducer;
