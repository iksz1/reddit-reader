import React, { Component } from "react";
import styled from "styled-components";
import Post from "./Post";
import { Spinner } from "../shared/Spinner";
import { ISubredditProps } from "./SubredditContainer";
import ErrorMessage from "../shared/ErrorMessage";

const Title = styled.h1`
  display: flex;
  align-items: center;
`;

const StyledSpinner = styled(Spinner)`
  margin-left: 0.5em;
`;

class Subreddit extends Component<ISubredditProps> {
  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps: ISubredditProps) {
    if (prevProps.uri !== this.props.uri) {
      this.getPosts();
    }
  }

  getPosts = () => {
    const { subreddit, postsFetch } = this.props;
    postsFetch({ subreddit: subreddit! });
  };

  getMorePosts = () => {
    const { subreddit, meta, postsFetchMore } = this.props;
    postsFetchMore({ subreddit: subreddit!, query: `after=${meta.after!}` });
  };

  render() {
    const { subreddit, posts, isLoading, error } = this.props;

    return (
      <>
        <Title>
          {`r/${subreddit}`}
          {isLoading && <StyledSpinner size="0.8em" />}
        </Title>
        {posts.map((post, i) => (
          <Post key={post.id} post={post} delay={(i + 1) * 40} />
        ))}
        {isLoading ? (
          <StyledSpinner size="0.8em" />
        ) : (
          <button onClick={this.getMorePosts}>...</button>
        )}
        {error && <ErrorMessage message={error.message} />}
      </>
    );
  }
}

export default Subreddit;
