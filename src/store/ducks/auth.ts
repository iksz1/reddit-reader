import { Reducer, Action } from "redux";

const AUTH_SET = "AUTH_SET";
const AUTH_CLEAR = "AUTH_CLEAR";

export interface IAuth {
  access_token?: string;
}

const authReducer: Reducer<IAuth> = (state = {}, { type, payload }) => {
  switch (type) {
    case AUTH_SET:
      return { ...state, ...payload };
    case AUTH_CLEAR: // remove this
      return null;
    default:
      return state;
  }
};

interface ISetAuthAction extends Action {
  payload: IAuth;
}

export const setAuth = (auth: IAuth): ISetAuthAction => ({
  type: AUTH_SET,
  payload: auth,
});

export default authReducer;
