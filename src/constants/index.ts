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
