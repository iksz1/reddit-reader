export enum TYPES {
  SUBS_LOAD = "SUBS_LOAD",
  SUBS_ADD = "SUBS_ADD",
  SUBS_REMOVE = "SUBS_REMOVE",
  AUTH_SET = "AUTH_SET",
  AUTH_CLEAR = "AUTH_CLEAR",
  FETCH_REQUEST = "FETCH_REQUEST",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILURE = "FETCH_FAILURE",
  CACHE_SET = "CACHE_SET",
  VIEW_TOGGLE_SIDEBAR = "VIEW_TOGGLE_SIDEBAR",
  VIEW_CHANGE_THEME = "VIEW_CHANGE_THEME",
}

export const DEFAULT_SUBS = ["webdev", "javascript", "reactjs"];

export const DEFAULT_THEME = "night";

export interface ITheme {
  name: string;
  bg: string;
  primary: string;
}

export const THEMES: { [key: string]: ITheme } = {
  night: {
    name: "Night",
    bg: "#313529",
    primary: "tan",
  },
  light: {
    name: "Light",
    bg: "#f5f5f5",
    primary: "#545454",
  },
  alright: {
    name: "Alright",
    bg: "#2e3440",
    primary: "#A3B16C",
  },
};
