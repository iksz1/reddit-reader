import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers/rootReducer";
import { RouteComponentProps } from "@reach/router";
import { fetchRequest } from "../actions/creators";
import Comment from "./Comment";
import MainPost from "./MainPost";
import styled from "styled-components";
import { Spinner } from "./Loader";

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
    const { post, comments, isLoading } = this.props;

    return (
      <div>
        {post && <MainPost post={post}>{post.title}</MainPost>}
        {isLoading && <Spinner size="2em" />}
        {comments.map((cmtChunk, i) => (
          <CommentsChunk key={i}>
            {cmtChunk.map(cmt => (
              <Comment key={cmt.id} comment={cmt} />
            ))}
          </CommentsChunk>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ data }: IAppState, { postId }: IProps) => ({
  post: data.data.posts.find(post => post.id === postId),
  comments: data.data.comments,
  isLoading: data.isLoading,
});

const mapDispatchToProps = {
  fetchComments: fetchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
