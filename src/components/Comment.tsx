import React, { Component } from "react";
import { IComment } from "../utils/responseParser";
import styled from "styled-components";
import { darken } from "polished";

const Wrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
}
`;

export const CommentBody = styled.div`
  p {
    margin: 0.5em 0;
  }
  ul {
    margin: 0;
  }
  pre {
    background: ${p => darken(0.025, p.theme.bg)};
    padding: 0.5em;
    white-space: pre-wrap;
  }
  code {
    background: ${p => darken(0.025, p.theme.bg)};
    padding: 0 0.2em;
  }
  blockquote {
    margin: 0.2em 0;
    padding: 0.5em 1em;
    background: ${p => darken(0.025, p.theme.bg)};
    border-left: 5px solid ${p => p.theme.primary};
  }
  a {
    color: inherit;
  }
  hr {
    border: 1px dashed ${p => p.theme.primary};
  }
`;

export const CommentMeta = styled.div`
  margin-bottom: 0.5em;
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.4rem;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const CommentScore = styled.span`
  font-weight: bold;
  margin-right: 0.5em;
  line-height: 1;
  padding: 0 0.625em;
  border: 1px solid ${p => p.theme.primary};
  border-radius: 1em;
`;

interface IProps {
  comment: IComment;
}

export default class Comment extends Component<IProps> {
  render() {
    const { comment } = this.props;

    return (
      <Wrapper style={{ marginLeft: comment.depth + "em" }}>
        <CommentMeta>
          <CommentScore>{comment.score}</CommentScore>
          <CommentAuthor>{comment.author}</CommentAuthor>
        </CommentMeta>
        <CommentBody dangerouslySetInnerHTML={{ __html: comment.body_html }} />
      </Wrapper>
    );
  }
}
