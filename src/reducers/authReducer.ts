import { Reducer } from "redux";
import { TYPES } from "../constants";

export interface IAuth {
  access_token?: string;
}

const authReducer: Reducer<IAuth> = (state = {}, { type, payload }) => {
  switch (type) {
    case TYPES.AUTH_SET:
      return { ...state, ...payload };
    case TYPES.AUTH_CLEAR: // remove this
      return null;
    default:
      return state;
  }
};

export default authReducer;
