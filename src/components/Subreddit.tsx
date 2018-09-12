import React from "react";
import { withFetching, IWithFetchingProps } from "./hoc/withFetching";
import Post from "./Post";
import { Spinner } from "./Loader";

interface IProps extends IWithFetchingProps {
  subreddit?: string;
}

const Subreddit = ({ data: { posts }, isLoading, subreddit }: IProps) => {
  return (
    <>
      <h1>
        {`r/${subreddit}`}
        {isLoading && <Spinner style={{ marginLeft: "0.5em" }} />}
      </h1>
      {posts.map((post, i) => (
        <Post key={post.id} post={post} delay={(i + 1) * 50} />
      ))}
    </>
  );
};

export default withFetching(Subreddit);
