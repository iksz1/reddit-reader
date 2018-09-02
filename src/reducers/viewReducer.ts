import { Reducer } from "redux";
import types from "../actions/types";
import THEMES from "../constants/themes";

export interface IView {
  isSidebarVisible: boolean;
  theme: {
    name: string;
    bg: string;
    primary: string;
  };
}

const initialState = {
  isSidebarVisible: false,
  theme: THEMES.night,
};

const viewReducer: Reducer<IView> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.VIEW_TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    case types.VIEW_CHANGE_THEME:
      return { ...state, theme: THEMES[payload] };

    default:
      return state;
  }
};

export default viewReducer;
