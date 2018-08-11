import React, { Component } from "react";
import { connect } from "react-redux";
import parser, { IPost } from "../utils/responseParser";
import Post from "./Post";
import { fetchData, IReq } from "../actions/creators";

interface IState {
  posts: IPost[];
}

interface IProps {
  subreddit: string;
  fetchReq: (req: IReq) => void;
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
    const { subreddit, fetchReq } = this.props;
    fetchReq({
      type: "subreddit",
      id: subreddit,
      onSuccess: posts => this.setState({ posts }),
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
  fetchReq: fetchData,
};

export default connect(
  null,
  mapDispatchToProps
)(Subreddit);
