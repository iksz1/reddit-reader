import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./components/App/App";
import { injectGlobal, ThemeProvider } from "styled-components";

const theme = {
  bg: "#313529",
  bgAlt: "#2a2d23",
  primary: "tan",
  border: "4px solid tan",
  borderAlt: "8px solid tan",
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// global styles
// tslint:disable-next-line
injectGlobal`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  html {
    font-size: 62.5%;
  }
  body {
    font-family: "Open Sans", sans-serif;
    font-size: 1.8rem;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    --content-width: 72rem;
  }
`;
