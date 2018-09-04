import { Reducer } from "redux";
import { TYPES } from "../constants";

export type Subs = string[];

const subsReducer: Reducer<Subs> = (state = [], { type, payload }) => {
  switch (type) {
    case TYPES.SUBS_LOAD:
      return payload;
    case TYPES.SUBS_ADD:
      return state.concat(payload);
    case TYPES.SUBS_REMOVE:
      return state.filter(sub => sub !== payload);
    default:
      return state;
  }
};

export default subsReducer;
