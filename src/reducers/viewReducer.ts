import { Reducer } from "redux";
import { TYPES, DEFAULT_THEME } from "../constants";

export interface IView {
  isSidebarVisible: boolean;
  themeId: string;
}

const initialState = {
  isSidebarVisible: false,
  themeId: DEFAULT_THEME,
};

const viewReducer: Reducer<IView> = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.VIEW_TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    case TYPES.VIEW_CHANGE_THEME:
      return { ...state, themeId: payload };

    default:
      return state;
  }
};

export default viewReducer;
