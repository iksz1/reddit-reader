import React from "react";
import styled from "styled-components";
import { IMoreComments } from "../../store/utils/redditAPI";
import { Button } from "../shared/Button";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  font-family: var(--font-secondary);
`;

interface IProps {
  data: IMoreComments;
  handler: () => void;
}

export const LoadMore = ({ data, handler }: IProps) => {
  return data.id === "_" ? null : (
    <Wrapper style={{ marginLeft: data.depth + "em" }}>
      <StyledButton onClick={handler}>load more ({data.count})</StyledButton>
    </Wrapper>
  );
};
