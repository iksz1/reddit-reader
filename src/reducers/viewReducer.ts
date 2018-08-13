import { Reducer } from "redux";
import types from "../actions/types";
import { IView } from "../actions/creators";

const viewReducer: Reducer<IView> = (state: {}, { type, payload }) => {
  switch (type) {
    case types.VIEW_SET:
      return payload;
    default:
      return state;
  }
};

export default viewReducer;
