import React from "react";
import styled from "styled-components";
import { Link, LinkGetProps } from "@reach/router";
import { MdSettings } from "react-icons/md";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: transparent;
  text-align: right;
`;

const SettingsLink = styled(Link)`
  z-index: 1;
  color: inherit;
  text-decoration: none;
  position: absolute;
  font-size: 2rem;
  width: 1em;
  height: 1em;
  top: 0.5em;
  right: 1em;
`;

// apply style to active link
const isActive = ({ isCurrent }: LinkGetProps) => {
  return isCurrent ? { style: { visibility: "hidden" } } : {};
};

export default () => {
  return (
    <Wrapper>
      <SettingsLink to="/settings" aria-label="settings" getProps={isActive}>
        <MdSettings />
      </SettingsLink>
    </Wrapper>
  );
};
