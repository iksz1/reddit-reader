import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { IAppState } from "../../store/ducks";
import { toggleSidebar } from "../../store/ducks/view";
import Trigger from "./Trigger";
import Nav from "./Nav";

const Wrapper = styled.aside<{ isVisible?: boolean }>`
  visibility: ${p => (p.isVisible ? "visible" : "hidden")};
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
  @media (max-width: 1120px) {
    & ~ main {
      margin-left: ${p => (p.isVisible ? "var(--sidebar-width)" : "auto")};
    }
  }
  @media (max-width: 678px) {
    & ~ main {
      margin-left: auto;
      transform: translateX(${p => (p.isVisible ? "var(--sidebar-width)" : 0)});
    }
  }
`;

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD {}

const Sidebar = ({ subs, isVisible, toggleVisibility }: IProps) => (
  <>
    <Trigger onClick={toggleVisibility} isActive={isVisible} />
    <Wrapper isVisible={isVisible} aria-hidden={!isVisible}>
      <Nav subs={subs} />
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
