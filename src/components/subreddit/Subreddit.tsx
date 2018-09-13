import React from "react";
import styled from "styled-components";
import { withFetching, IWithFetchingProps } from "../hoc/withFetching";
import Post from "./Post";
import { Spinner } from "../shared/Spinner";

const Title = styled.h1`
  display: flex;
  align-items: center;
  ${Spinner} {
    margin-left: 0.5em;
  }
`;

interface IProps extends IWithFetchingProps {
  subreddit?: string;
}

const Subreddit = ({ data: { posts }, isLoading, subreddit }: IProps) => {
  return (
    <>
      <Title>
        {`r/${subreddit}`}
        {isLoading && <Spinner size="0.8em" />}
      </Title>
      {posts.map((post, i) => (
        <Post key={post.id} post={post} delay={(i + 1) * 40} />
      ))}
    </>
  );
};

export default withFetching(Subreddit);
