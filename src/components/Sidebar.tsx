import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../store/ducks";
import { LinkGetProps } from "@reach/router";
import { Link } from "@reach/router";
import { toggleSidebar } from "../store/ducks/view";

interface IWrapperProps {
  isVisible?: boolean;
}

const Wrapper = styled.div<IWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  bottom: 0;
  width: var(--sidebar-width);
  z-index: 1;
  padding: 1em 2em;
  overflow-y: auto;
  background: ${p => p.theme.bg};
  font-family: "Roboto Condensed", sans-serif;
  border-right: 1px solid ${p => p.theme.primary};
  text-align: right;
  transition: transform 200ms ease-out;
  transform: translateX(${p => (p.isVisible ? "0" : "calc(var(--sidebar-width) * -1)")});
`;

const Trigger = styled.button`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  font-weight: bold;
  background: inherit;
  border: none;
  color: inherit;
`;

const List = styled.ul`
  padding-left: 1em;
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

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD {}

const Sidebar = ({ subs, isVisible, toggleVisibility }: IProps) => (
  <>
    <Trigger onClick={toggleVisibility}>#</Trigger>
    <Wrapper isVisible={isVisible} aria-hidden={!isVisible}>
      <List>
        {subs.map(sub => (
          <li key={sub}>
            <SLink to={`/r/${sub}`} tabIndex={isVisible ? 0 : -1} getProps={isActive}>
              {sub}
            </SLink>
          </li>
        ))}
      </List>
    </Wrapper>
  </>
);

const mapStateToProps = ({ subs, view }: IAppState) => ({
  subs,
  isVisible: view.isSidebarVisible,
});

const mapDispatchToProps = {
  toggleVisibility: toggleSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
