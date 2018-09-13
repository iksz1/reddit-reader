import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../store/ducks";
import { LinkGetProps } from "@reach/router";
import { Link } from "@reach/router";
import { toggleSidebar } from "../store/ducks/view";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Wrapper = styled.aside<{ isVisible?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  bottom: 0;
  width: var(--sidebar-width);
  z-index: 1;
  padding: 1em 2em;
  overflow-y: auto;
  background: ${p => p.theme.primary};
  color: ${p => p.theme.bg};
  font-family: "Roboto Condensed", sans-serif;
  text-align: right;
  transition: transform 200ms ease-out;
  transform: translateX(${p => (p.isVisible ? "0" : "calc(var(--sidebar-width) * -1)")});
`;

const Trigger = styled.button<{ active?: boolean }>`
  z-index: 2;
  position: fixed;
  top: 0.5em;
  left: 0.5em;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  font-size: 2rem;
  font-weight: bold;
  background: ${p => (p.active ? "transparent" : "inherit")};
  border: none;
  color: ${p => (p.active ? p.theme.bg : "inherit")};
  cursor: pointer;
  transition: transform 200ms ease-out;
  // transform: translateX(${p => (p.active ? "calc(var(--sidebar-width) - 4.2rem)" : 0)});
`;

const List = styled.ul`
  /* margin-top: 2em; */
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

const SettingsLink = styled(SLink)`
  position: fixed;
  background: ${p => p.theme.bg};
  color: ${p => p.theme.primary};
  border-radius: 50%;
  font-size: 2rem;
  width: 1em;
  height: 1em;
  top: 0.5em;
  left: 0.5em;
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
    <Trigger onClick={toggleVisibility} active={isVisible} aria-label="toggle menu">
      {isVisible ? <MdClose /> : <FiMenu />}
    </Trigger>
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
