import React from "react";
import styled from "styled-components";
import { Button } from "../shared/Button";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  font-size: 4rem;
`;

interface IProps {
  handler: () => void;
}

export const LoadMore = ({ handler }: IProps) => {
  return (
    <Wrapper>
      <StyledButton onClick={handler}>...</StyledButton>
    </Wrapper>
  );
};
