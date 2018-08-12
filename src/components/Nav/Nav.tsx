import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import styled from "styled-components";
import { loadSubs } from "../../actions/creators";

const Wrapper = styled.nav`
  position: relative;
  width: var(--content-width);
  font-size: 2rem;
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  position: absolute;
  left: 1em;
  bottom: -2em;
  margin: 0;
  padding: 0;
  list-style: none;
  &::after {
    z-index: 5;
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    min-height: 2em;
    background: ${p => p.theme.bg};
    content: " ";
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 4em;
    min-height: 4em;
    background: ${p => p.theme.bg};
    border: ${p => p.theme.border};
    border-radius: 50%;
    margin-right: 1em;
    text-transform: uppercase;
  }
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  min-width: 3em;
  min-height: 3em;
  color: inherit;
  text-decoration: none;
  border: ${(p: any) => (p.active ? p.theme.borderAlt : p.theme.border)};
  border-radius: 50%;
  &:hover {
    border: ${p => p.theme.borderAlt};
    /* transition: border 300ms; */
    /* transform: scale(1.1); */
  }
`;

interface IProps {
  subs: string[];
  activeSub: string | null;
}

class Nav extends Component<IProps> {
  render() {
    const { subs, activeSub } = this.props;

    return (
      <Wrapper>
        <List>
          {subs.map(sub => (
            <li key={sub}>
              <SLink to={`/r/${sub}`} active={activeSub === sub ? 1 : undefined}>
                {sub[0]}
              </SLink>
            </li>
          ))}
        </List>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ subs, view }: any) => ({
  subs,
  activeSub: view.type === "subreddit" ? view.id : null,
});

const mapDispatchToProps = {
  loadSubs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
