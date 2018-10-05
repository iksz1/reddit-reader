import React from "react";
import styled from "styled-components";
import { IPost } from "../../store/utils/responseParser";
import { CommentBody, CommentMeta } from "./Comment";
import timeago from "timeago.js";

const Wrapper = styled.div`
  margin: 1em 0;
  font-size: 1.6rem;
  &:not(:last-child) {
    border-bottom: 4px solid ${p => p.theme.primary};
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 0.2em;
`;

const ExternalLink = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
  color: inherit;
  word-break: break-all;
`;

const PostBody = styled(CommentBody)`
  margin: 1em 0 2em;
`;

const PostMeta = styled(CommentMeta)``;

interface IProps {
  post: IPost;
}

const MainPost = ({ post }: IProps) => {
  const time = timeago().format(post.created_utc * 1000);

  return (
    <Wrapper>
      <PostTitle>{post.title}</PostTitle>
      <PostMeta>
        posted by <strong>{post.author}</strong> {time}
      </PostMeta>
      {!post.is_self && (
        <ExternalLink href={post.url} target="_blank" rel="noopener">
          <p>{post.url}</p>
        </ExternalLink>
      )}
      <PostBody dangerouslySetInnerHTML={{ __html: post.selftext_html }} />
    </Wrapper>
  );
};

export default MainPost;
