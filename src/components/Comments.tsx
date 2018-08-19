import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers/rootReducer";
import { fetchRequest } from "../actions/creators";
import Comment from "./Comment";
import MainPost from "./MainPost";
import styled from "styled-components";

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

interface IProps {
  uri: string;
  postId: string;
}

class Comments extends Component<IProps & PFS & PFD> {
  componentDidMount() {
    const { uri, fetchComments } = this.props;
    fetchComments({ uri });
  }

  render() {
    const { post, comments, isLoading } = this.props;

    return (
      <div>
        {post && <MainPost post={post}>{post.title}</MainPost>}
        {isLoading && <p>Loading...</p>}
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
