import types from "../actions/types";

export default (state = {}, { type, payload }: any) => {
  switch (type) {
    case types.AUTH_SET:
      return { ...state, ...payload };
    case types.AUTH_CLEAR: // remove this
      return null;
    default:
      return state;
  }
};
