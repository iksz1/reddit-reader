import types from "../actions/types";

export default (state = [], { type, payload }: any) => {
  switch (type) {
    case types.SUBS_LOAD:
      return payload;
    case types.SUBS_ADD:
      return [...state].push(payload as never);
    case types.SUBS_REMOVE:
      return state.filter(sub => sub !== payload);
    default:
      return state;
  }
};
