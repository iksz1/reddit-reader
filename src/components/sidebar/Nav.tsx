import React from "react";
import styled from "styled-components";
import { Link, LinkGetProps } from "@reach/router";

const List = styled.ul`
  padding: 0;
  overflow-x: hidden;
  list-style: none;
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
  li {
    margin: 0.5em 0;
  }
`;

const SLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// apply style to active link
const isActive = ({ isCurrent }: LinkGetProps) => {
  return isCurrent ? { style: { textDecoration: "underline" } } : {};
};

interface IProps {
  subs: string[];
}

const Nav = ({ subs }: IProps) => (
  <nav>
    <List>
      {subs.map(sub => (
        <li key={sub}>
          <SLink to={`/r/${sub}`} getProps={isActive}>
            {sub}
          </SLink>
        </li>
      ))}
    </List>
  </nav>
);

export default Nav;
