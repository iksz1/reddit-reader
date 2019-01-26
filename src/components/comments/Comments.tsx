import React, { Component } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import MainPost from "./MainPost";
import { LoadMore } from "./LoadMore";
import { Spinner } from "../shared/Spinner";
import LazyScroll from "./LazyScroll";
import ErrorMessage from "../shared/ErrorMessage";
import { ICommentsProps } from "./CommentsContainer";

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
        {post && <MainPost post={post} />}
        {isLoading && <StyledSpinner size="2em" />}
        <LazyScroll>
          {comments &&
            comments.map(cmt =>
              cmt.kind === "t1" ? (
                <Comment key={cmt.data.id} comment={cmt.data} />
              ) : (
                <LoadMore
                  key={cmt.data.id}
                  data={cmt.data}
                  handler={() => commentsFetchMore(postId!, cmt.data)}
                />
              )
            )}
        </LazyScroll>
        {error && <ErrorMessage message={error.message} />}
      </>
    );
  }
}
export default Comments;
