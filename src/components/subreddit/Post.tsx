import React from "react";
import styled, { keyframes } from "styled-components";
import { IPost } from "../../store/utils/redditAPI";
import { Link } from "@reach/router";
import timeago from "timeago.js";

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8) translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateX(0);
  }
`;

const Wrapper = styled.div`
  margin: 1.5em 0;
  animation: ${appear} 200ms ease-out;
`;

const PostTitle = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PostMeta = styled.div`
  margin-left: 1em;
  font-family: var(--font-secondary);
  font-size: 1.4rem;
`;

interface IProps {
  post: IPost;
}

const Post = ({ post }: IProps) => {
  const time = timeago().format(post.created_utc * 1000);

  return (
    <Wrapper>
      <PostTitle to={post.permalink}>{post.title}</PostTitle>
      <PostMeta>
        <b>{post.score}</b> points | posted {time} by {post.author} | <b>{post.num_comments}</b>{" "}
        comments
      </PostMeta>
    </Wrapper>
  );
};

export default Post;
