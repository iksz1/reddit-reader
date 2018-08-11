import React from "react";
import { hot } from "react-hot-loader";
import { Router } from "@reach/router";
import styled from "styled-components";
import Subreddit from "../Subreddit";
import Nav from "../Nav/Nav";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  min-height: 100vh;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10rem;
  border-bottom: ${p => p.theme.border};
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
    <Header>
      <Nav />
    </Header>
    <MainSection>
      <MainContent>
        <Router>
          <Subreddit path="/r/:subreddit" />
        </Router>
      </MainContent>
    </MainSection>
    <Footer>&copy; 2018 iksz</Footer>
  </Wrapper>
);

export default hot(module)(App);
