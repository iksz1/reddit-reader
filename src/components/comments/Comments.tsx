import React, { Component } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import MainPost from "./MainPost";
import { Spinner } from "../shared/Spinner";
import ErrorMessage from "../shared/ErrorMessage";
import { ICommentsProps } from "./CommentsContainer";

const Title = styled.h1`
  font-size: 2.4rem;
  margin: 1em 0 0.2em;
`;

const CommentsChunk = styled.div`
  font-size: 1.6rem;
  padding: 1em 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.primary};
    margin-bottom: 1em;
  }
`;

const StyledSpinner = styled(Spinner)`
  margin: 1em auto;
`;

class Comments extends Component<ICommentsProps> {
  componentDidMount() {
    const { subreddit, postId, commentsFetch } = this.props;
    commentsFetch({ subreddit: subreddit!, postId: postId! });
  }

  render() {
    const { post, comments, isLoading, error, commentsFetchMore, postId } = this.props;

    return (
      <>
        {post && (
          <>
            <Title>{post.title}</Title>
            <MainPost post={post} />
          </>
        )}
        {isLoading && <StyledSpinner size="2em" />}
        {comments &&
          comments.map(cmt =>
            cmt.kind === "t1" ? (
              <Comment key={cmt.data.id} comment={cmt.data} />
            ) : cmt.data.id === "_" ? null : (
              <div key={cmt.data.id} style={{ marginLeft: cmt.data.depth + "em" }}>
                <button onClick={() => commentsFetchMore(postId!, cmt.data)}>
                  LOAD MORE ({cmt.data.count})
                </button>
              </div>
            )
          )}
        {error && <ErrorMessage message={error.message} />}
      </>
    );
  }
}
export default Comments;
