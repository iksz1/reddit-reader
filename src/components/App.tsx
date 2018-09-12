import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import Subreddit from "./subreddit/Subreddit";
import Comments from "./comments/Comments";
import Sidebar from "./Sidebar";
import Settings from "./settings/Settings";
import { IAppState } from "../store/ducks";
import { THEMES } from "../constants";
import Home from "./Home";
import Header from "./Header";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
`;

const MainContent = styled.div<{ shareSpace: boolean }>`
  max-width: var(--content-width);
  padding: 1em;
  transition: transform 200ms ease-out;
  @media (max-width: 1120px) {
    margin-left: ${p => (p.shareSpace ? "var(--sidebar-width)" : 0)};
  }
  @media (max-width: 678px) {
    margin-left: 0;
    transform: translateX(${p => (p.shareSpace ? "var(--sidebar-width)" : 0)});
  }
`;

type PFS = ReturnType<typeof mapStateToProps>;

const App = ({ isSidebarVisible, themeId }: PFS) => (
  <ThemeProvider theme={THEMES[themeId]}>
    <Wrapper>
      <Header />
      <Sidebar />
      <MainContent shareSpace={isSidebarVisible}>
        <Router>
          <Home path="/" />
          <Subreddit path="/r/:subreddit" />
          <Comments path="/r/:subreddit/comments/:postId/*" />
          <Settings path="/settings" />
        </Router>
      </MainContent>
    </Wrapper>
  </ThemeProvider>
);

const mapStateToProps = ({ view }: IAppState) => ({
  isSidebarVisible: view.isSidebarVisible,
  themeId: view.themeId,
});

export default hot(module)(connect(mapStateToProps)(App));
