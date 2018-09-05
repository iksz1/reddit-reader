import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { fetchRequest } from "../store/ducks/data";
import { IAppState } from "../store/ducks";
import { RouteComponentProps } from "@reach/router";
import { Spinner } from "./Loader";
import ErrorMessage from "./ErrorMessage";

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

interface IProps extends PFS, PFD, RouteComponentProps {
  subreddit?: string;
}

class Subreddit extends Component<IProps> {
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: IProps) {
    if (this.props.subreddit !== prevProps.subreddit) {
      this.loadData();
    }
  }

  loadData = () => {
    const { uri, fetchPosts } = this.props;
    fetchPosts({ uri: uri as string });
  };

  render() {
    const { subreddit, posts, isLoading, error } = this.props;

    if (error) return <ErrorMessage message={error.message} />;

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
  }
}

const mapStateToProps = ({ data }: IAppState) => ({
  posts: data.data.posts,
  isLoading: data.isLoading,
  error: data.error,
});

const mapDispatchToProps = {
  fetchPosts: fetchRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddit);
