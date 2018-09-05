import { Reducer, Action } from "redux";
import { DEFAULT_THEME } from "../../constants";

export const VIEW_TOGGLE_SIDEBAR = "VIEW_TOGGLE_SIDEBAR";
export const VIEW_CHANGE_THEME = "VIEW_CHANGE_THEME";

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
    case VIEW_TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    case VIEW_CHANGE_THEME:
      return { ...state, themeId: payload };

    default:
      return state;
  }
};

export const toggleSidebar = (): Action => ({
  type: VIEW_TOGGLE_SIDEBAR,
});

interface IChangeThemeAction extends Action {
  payload: string;
}

export const changeTheme = (themeName: string): IChangeThemeAction => ({
  type: VIEW_CHANGE_THEME,
  payload: themeName,
});

export default viewReducer;
