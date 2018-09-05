import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState } from "../store/ducks";
import { RouteComponentProps } from "@reach/router";
import { fetchRequest } from "../store/ducks/data";
import Comment from "./Comment";
import MainPost from "./MainPost";
import styled from "styled-components";
import { Spinner } from "./Loader";
import ErrorMessage from "./ErrorMessage";

const CommentsChunk = styled.div`
  font-size: 1.6rem;
  padding: 1em 0;
  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.primary};
    margin-bottom: 1em;
  }
`;

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends RouteComponentProps {
  postId?: string;
}

class Comments extends Component<IProps & PFS & PFD> {
  componentDidMount() {
    const { uri, fetchComments } = this.props;
    fetchComments({ uri: uri as string });
  }

  render() {
    const { post, comments, isLoading, error } = this.props;

    if (error) return <ErrorMessage message={error.message} />;

    return (
      <>
        {post && <MainPost post={post}>{post.title}</MainPost>}
        {isLoading && <Spinner size="2em" />}
        {comments.map((cmtChunk, i) => (
          <CommentsChunk key={i}>
            {cmtChunk.map(cmt => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsChunk>
        ))}
      </>
    );
  }
}

const mapStateToProps = ({ data }: IAppState, { postId }: IProps) => ({
  post: data.data.posts.find(post => post.id === postId),
  comments: data.data.comments,
  isLoading: data.isLoading,
  error: data.error,
});

const mapDispatchToProps = {
  fetchComments: fetchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
