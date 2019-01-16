import { Reducer } from "redux";
import { createAction } from "../utils/actionHelper";
import { DEFAULT_THEME } from "../../constants";
import { IAppState } from ".";

export const VIEW_TOGGLE_SIDEBAR = "VIEW_TOGGLE_SIDEBAR";
export const VIEW_CHANGE_THEME = "VIEW_CHANGE_THEME";

export interface IViewState {
  isSidebarVisible: boolean;
  themeId: string;
}

const initialState = {
  isSidebarVisible: false,
  themeId: DEFAULT_THEME,
};

export type ViewAction = ToggleSidebar | ChangeTheme;

const viewReducer: Reducer<IViewState, ViewAction> = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_TOGGLE_SIDEBAR:
      return { ...state, isSidebarVisible: !state.isSidebarVisible };
    case VIEW_CHANGE_THEME:
      return { ...state, themeId: action.payload };

    default:
      return state;
  }
};

export type ToggleSidebar = ReturnType<typeof toggleSidebar>;

export const toggleSidebar = () => createAction(VIEW_TOGGLE_SIDEBAR);

export type ChangeTheme = ReturnType<typeof changeTheme>;

export const changeTheme = (themeName: string) => createAction(VIEW_CHANGE_THEME, themeName);

export const sidebarSelector = (state: IAppState) => state.view.isSidebarVisible;

export const themeSelector = (state: IAppState) => state.view.themeId;

export default viewReducer;
