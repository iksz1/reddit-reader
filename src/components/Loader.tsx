import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface IProps {
  size?: string;
}

export const Spinner = styled.div<IProps>`
  display: inline-flex;
  width: ${p => p.size || "1em"};
  height: ${p => p.size || "1em"};
  border: 0.3rem solid transparent;
  border-color: ${p => p.theme.primary} transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
