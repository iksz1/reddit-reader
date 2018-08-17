import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

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
  /* border: ${(p: any) => (p.active ? p.theme.borderAlt : p.theme.border)}; */
  border: ${p => p.theme.border};
  border-radius: 50%;
  &:hover {
    border: ${p => p.theme.borderAlt};
  }
`;

const isActive = ({ isCurrent }: any) => {
  return isCurrent ? { style: { border: "8px solid tan" } } : null;
};

interface IProps {
  subs: string[];
}

class Nav extends Component<IProps> {
  render() {
    const { subs } = this.props;

    return (
      <Wrapper>
        <List>
          {subs.map(sub => (
            <li key={sub}>
              <SLink to={`/r/${sub}`} getProps={isActive}>
                {sub[0]}
              </SLink>
            </li>
          ))}
        </List>
      </Wrapper>
    );
  }
}

export default Nav;
