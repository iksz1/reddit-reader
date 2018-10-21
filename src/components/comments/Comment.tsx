import React from "react";
import { IComment } from "../../store/utils/responseParser";
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
    word-break: break-all;
  }
  hr {
    border: 1px dashed ${p => p.theme.primary};
  }
`;

export const CommentMeta = styled.div`
  margin-bottom: 0.5em;
  font-family: var(--font-secondary);
  font-size: 1.4rem;
`;

const Author = styled.span<{ isSubmitter: boolean }>`
  font-weight: bold;
  text-decoration: ${p => p.isSubmitter && "underline"};
`;

const AuthorFlair = styled.span``;

const Score = styled.span`
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

const Comment = ({ comment }: IProps) => (
  <Wrapper style={{ marginLeft: comment.depth + "em" }}>
    <CommentMeta>
      <Score>{comment.score}</Score>
      <Author isSubmitter={comment.is_submitter}>{comment.author}</Author>
      <AuthorFlair>
        {comment.author_flair_text ? ` <${comment.author_flair_text}>` : null}
      </AuthorFlair>
    </CommentMeta>
    <CommentBody dangerouslySetInnerHTML={{ __html: comment.body_html }} />
  </Wrapper>
);

export default Comment;
