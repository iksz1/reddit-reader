import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Subreddit from "./subreddit/Subreddit";
import Comments from "./comments/Comments";
import Sidebar from "./sidebar/Sidebar";
import Settings from "./settings/Settings";
import { IAppState } from "../store/ducks";
import { THEMES, ITheme } from "../constants";
import Home from "./Home";
import Header from "./Header";

const GlobalStyle = createGlobalStyle<{ theme?: ITheme }>`
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
    background: ${p => p.theme.bg};
    color: ${p => p.theme.primary};
  }
  :root {
    --content-width: 72rem;
    --sidebar-width: 20rem;
    --font-secondary: "Roboto Condensed", sans-serif;
  }
`;

const MainSection = styled.main`
  margin: 0 auto;
  max-width: var(--content-width);
  padding: 1em;
  transition: transform 200ms ease-out;
`;

type PFS = ReturnType<typeof mapStateToProps>;

const App = ({ themeId }: PFS) => (
  <ThemeProvider theme={THEMES[themeId]}>
    <>
      <Header />
      <Sidebar />
      <MainSection>
        <Router>
          <Home path="/" />
          <Subreddit path="/r/:subreddit" />
          <Comments path="/r/:subreddit/comments/:postId/*" />
          <Settings path="/settings" />
        </Router>
      </MainSection>
      <GlobalStyle />
    </>
  </ThemeProvider>
);

const mapStateToProps = ({ view }: IAppState) => ({
  themeId: view.themeId,
});

export default hot(module)(connect(mapStateToProps)(App));
