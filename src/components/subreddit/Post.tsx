import React from "react";
import styled, { keyframes } from "styled-components";
import { IPost } from "../../store/utils/responseParser";
import { Link } from "@reach/router";
import timeago from "timeago.js";

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  margin: 1.5em 0;
  animation: ${appear} 200ms ease backwards;
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
  delay: number;
}

const Post = ({ post, delay }: IProps) => {
  const time = timeago().format(post.created_utc * 1000);

  return (
    <Wrapper style={{ animationDelay: delay + "ms" }}>
      <PostTitle to={post.permalink}>{post.title}</PostTitle>
      <PostMeta>
        <b>{post.score}</b> points | posted {time} by {post.author} | <b>{post.num_comments}</b>{" "}
        comments
      </PostMeta>
    </Wrapper>
  );
};

export default Post;
