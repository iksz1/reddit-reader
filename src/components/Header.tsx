import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { MdSettings } from "react-icons/md";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: transparent;
  text-align: right;
`;

const SettingsLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  position: absolute;
  font-size: 2rem;
  width: 1em;
  height: 1em;
  top: 0.5em;
  right: 1em;
`;

export default () => {
  return (
    <Wrapper>
      <SettingsLink to="/settings" aria-label="settings">
        <MdSettings />
      </SettingsLink>
    </Wrapper>
  );
};
