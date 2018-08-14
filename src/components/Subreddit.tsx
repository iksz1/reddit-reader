import React, { Component } from "react";
import { connect } from "react-redux";
import { IPost } from "../utils/responseParser";
import Post from "./Post";
import { fetchData } from "../actions/creators";

interface IState {
  posts: IPost[];
}

interface IProps {
  subreddit: string;
  uri: string;
  apiRequest: typeof fetchData;
}

class Subreddit extends Component<IProps, IState> {
  state: IState = {
    posts: [],
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: IProps) {
    // to lowercase?
    if (this.props.subreddit !== prevProps.subreddit) {
      this.loadData();
    }
  }

  loadData = () => {
    const { uri, apiRequest } = this.props;
    apiRequest({
      uri,
      onSuccess: data => this.setState({ posts: data.posts }),
    });
  };

  render() {
    const { posts } = this.state;
    const { subreddit } = this.props;

    return (
      <div>
        <h1>{`r/${subreddit}`}</h1>
        {posts.map((post, i) => (
          <Post key={post.id} post={post} delay={(i + 1) * 50} />
        ))}
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({

// })

const mapDispatchToProps = {
  apiRequest: fetchData,
};

export default connect(
  null,
  mapDispatchToProps
)(Subreddit);
