import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import styled from "styled-components";
import Subreddit from "../Subreddit";
import Comments from "../Comments";
import Header from "../Header";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  min-height: 100vh;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
  overflow-x: hidden;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5em;
`;

const MainContent = styled.div`
  /* margin-top: 2.5em; */
  padding: 1em;
  width: var(--content-width);
  min-height: 50vh;
`;

const Footer = styled.div`
  padding: 2.5em 0;
  width: 100%;
  border-top: ${p => p.theme.border};
  text-align: center;
`;

const App = () => (
  <Wrapper>
    <Header />
    <MainSection>
      <MainContent>
        <Router>
          <Subreddit path="/r/:subreddit" />
          <Comments path="/r/:subreddit/comments/:postId/*" />
        </Router>
      </MainContent>
    </MainSection>
    <Footer>&copy; 2018 iksz</Footer>
  </Wrapper>
);

export default hot(module)(App);
