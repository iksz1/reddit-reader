import { Reducer } from "redux";
import types from "../actions/types";

export interface IView {
  isSidebarVisible: boolean;
}

const initialState = {
  isSidebarVisible: false,
};

const viewReducer: Reducer<IView> = (state = initialState, { type }) => {
  switch (type) {
    case types.VIEW_TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };

    default:
      return state;
  }
};

export default viewReducer;
