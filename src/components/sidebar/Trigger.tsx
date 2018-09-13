import React from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Wrapper = styled.button<{ isActive?: boolean }>`
  z-index: 2;
  position: fixed;
  top: 0.5em;
  left: 0.5em;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  font-size: 2rem;
  font-weight: bold;
  background: ${p => (p.isActive ? "transparent" : "inherit")};
  border: none;
  color: ${p => (p.isActive ? p.theme.bg : "inherit")};
  cursor: pointer;
`;

interface IProps {
  onClick: () => void;
  isActive: boolean;
}

const Trigger = ({ onClick, isActive }: IProps) => {
  return (
    <Wrapper onClick={onClick} isActive={isActive} aria-label="toggle menu">
      {isActive ? <MdClose /> : <FiMenu />}
    </Wrapper>
  );
};

export default Trigger;
