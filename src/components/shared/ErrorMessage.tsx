import React from "react";
import styled from "styled-components";

const Message = styled.h2`
  font-family: var(--font-secondary);
`;

const Hint = styled.p`
  font-size: 1.4rem;
`;

interface IProps {
  message: string;
}

const ErrorMessage = ({ message }: IProps) => {
  return (
    <>
      <Message>{message}</Message>
      <Hint>
        If you have tracking protection enabled, consider adding <b>{"https://www.reddit.com/"}</b>{" "}
        to exceptions.
      </Hint>
    </>
  );
};

export default ErrorMessage;
