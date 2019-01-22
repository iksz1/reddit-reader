import styled from "styled-components";
import { darken } from "polished";

export const Button = styled.button`
  font-family: inherit;
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${p => darken(0.05, p.theme.bg)};
  }
`;
