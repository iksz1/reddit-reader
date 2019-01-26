import React from "react";
import styled from "styled-components";
import { Button } from "../shared/Button";
import { IoIosMore as IconMore } from "react-icons/io";

const Wrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled(Button)`
  height: 4rem;
  padding: 0 4px;
  &:hover {
    background: none;
    transform: scale(1.1);
  }
`;

interface IProps {
  handler: () => void;
}

export const LoadMore = ({ handler }: IProps) => {
  return (
    <Wrapper>
      <StyledButton onClick={handler} aria-label="load more">
        <IconMore size={"4rem"} />
      </StyledButton>
    </Wrapper>
  );
};
