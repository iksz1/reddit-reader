import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState } from "../reducers/rootReducer";
import { fetchRequest } from "../actions/creators";
import Comment from "./Comment";

interface IProps {
  uri: string;
  postId: string;
}

class Comments extends Component<IProps & IPropsFromState & IPropsFromDispatch> {
  componentDidMount() {
    const { uri, fetchComments } = this.props;
    fetchComments({ uri });
  }

  render() {
    const { post, comments, isLoading } = this.props;

    return (
      <div>
        {post && <h3>{post.title}</h3>}
        {isLoading && <p>Loading...</p>}
        {comments.map(cmtChunk => {
          return cmtChunk.map(cmt => <Comment key={cmt.id} comment={cmt} />);
        })}
      </div>
    );
  }
}

type IPropsFromState = ReturnType<typeof mapStateToProps>;

const mapStateToProps = ({ data }: IAppState, { postId }: IProps) => ({
  post: data.data.posts.find(post => post.id === postId),
  comments: data.data.comments,
  isLoading: data.isLoading,
});

type IPropsFromDispatch = typeof mapDispatchToProps;

const mapDispatchToProps = {
  fetchComments: fetchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
