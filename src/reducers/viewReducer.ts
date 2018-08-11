import types from "../actions/types";

export default (state = {}, { type, payload }: any) => {
  switch (type) {
    case types.VIEW_SET:
      return payload;
    default:
      return state;
  }
};
