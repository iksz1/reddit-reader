import React from "react";
import styled, { keyframes } from "styled-components";
import { IPost } from "../utils/responseParser";

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
  animation: 200ms ease backwards ${appear};
`;

const PostTitle = styled.a`
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
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.4rem;
`;

// const ScoreBox = styled.div`
//   border: 1px solid tan;
//   border-radius: 50%;
//   min-width: 4em;
//   padding: 0.5em 0;
//   margin-right: 1em;
//   font-weight: bold;
//   text-align: center;
// `;

interface IProps {
  post: IPost;
  delay: number;
}

const Post = ({ post, delay }: IProps) => (
  <Wrapper style={{ animationDelay: delay + "ms" }}>
    <div>
      <PostTitle href={post.url}>{post.title}</PostTitle>
      <PostMeta>
        <b>{post.score}</b> points | posted 5 min ago by {post.author} | <b>{post.num_comments}</b>{" "}
        comments
      </PostMeta>
    </div>
  </Wrapper>
);

export default Post;
