import React, { Component } from "react";
import { IComment } from "../utils/responseParser";
import styled from "styled-components";

const Wrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`;

interface IProps {
  comment: IComment;
}

export default class Comment extends Component<IProps> {
  render() {
    const { comment } = this.props;

    return (
      <Wrapper style={{ marginLeft: comment.depth + "em" }}>
        <span>
          <strong>{comment.score}</strong> {comment.author}
        </span>
        <p dangerouslySetInnerHTML={{ __html: comment.body_html }} />
      </Wrapper>
    );
  }
}
