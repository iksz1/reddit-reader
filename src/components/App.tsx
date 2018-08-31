import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import { connect } from "react-redux";
import styled from "styled-components";
import Subreddit from "./Subreddit";
import Comments from "./Comments";
import Sidebar from "./Sidebar";
import Settings from "./Settings";
import { IAppState } from "../reducers/rootReducer";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
`;

interface IMainContentProps {
  shareSpace: boolean;
}

const MainContent = styled.div<IMainContentProps>`
  flex: auto;
  max-width: var(--content-width);
  padding: 1em;
  transition: transform 200ms ease-out;
  @media (min-width: 600px) {
    margin-left: ${p => (p.shareSpace ? "var(--sidebar-width)" : 0)};
  }
  @media (max-width: 599px) {
    transform: translateX(${p => (p.shareSpace ? "var(--sidebar-width)" : 0)});
  }
`;

type PFS = ReturnType<typeof mapStateToProps>;

const App = ({ isSidebarVisible }: PFS) => (
  <Wrapper>
    <Sidebar />
    <MainContent shareSpace={isSidebarVisible}>
      <Router>
        <Subreddit path="/r/:subreddit" />
        <Comments path="/r/:subreddit/comments/:postId/*" />
        <Settings path="/settings" />
      </Router>
    </MainContent>
  </Wrapper>
);

const mapStateToProps = ({ view }: IAppState) => ({
  isSidebarVisible: view.isSidebarVisible,
});

export default hot(module)(connect(mapStateToProps)(App));
