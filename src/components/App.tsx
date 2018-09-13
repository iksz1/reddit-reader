import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import Subreddit from "./subreddit/Subreddit";
import Comments from "./comments/Comments";
import Sidebar from "./sidebar/Sidebar";
import Settings from "./settings/Settings";
import { IAppState } from "../store/ducks";
import { THEMES } from "../constants";
import Home from "./Home";
import Header from "./Header";

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
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
    <Wrapper>
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
    </Wrapper>
  </ThemeProvider>
);

const mapStateToProps = ({ view }: IAppState) => ({
  themeId: view.themeId,
});

export default hot(module)(connect(mapStateToProps)(App));
