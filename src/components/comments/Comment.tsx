import React from "react";
import { IComment } from "../../store/utils/redditAPI";
import styled, { css } from "styled-components";
import { darken } from "polished";

const Wrapper = styled.div<{ root: boolean }>`
  font-size: 1.6rem;
  margin-bottom: 1em;
  ${p =>
    p.root
      ? css`
          margin-top: 2em;
          &:not(:first-of-type) {
            padding-top: 2em;
            border-top: 1px solid ${p.theme.primary};
          }
        `
      : null}
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
  <Wrapper style={{ marginLeft: comment.depth + "em" }} root={comment.depth === 0}>
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

export default React.memo(Comment);
