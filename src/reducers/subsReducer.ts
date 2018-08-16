import { Reducer } from "redux";
import types from "../actions/types";

export type Subs = string[];

const subsReducer: Reducer<Subs> = (state = [], { type, payload }) => {
  switch (type) {
    case types.SUBS_LOAD:
      return payload;
    case types.SUBS_ADD:
      return state.concat(payload);
    case types.SUBS_REMOVE:
      return state.filter(sub => sub !== payload);
    default:
      return state;
  }
};

export default subsReducer;
