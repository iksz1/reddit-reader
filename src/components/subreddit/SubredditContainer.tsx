import { connect } from "react-redux";
import Subreddit from "./Subreddit";
import { IAppState } from "../../store/ducks";
import { RouteComponentProps } from "@reach/router";
import * as P from "../../store/ducks/posts";

const mapStateToProps = (state: IAppState) => ({
  posts: P.dataSelector(state),
  meta: P.metaSelector(state),
  isLoading: P.loadingSelector(state),
  error: P.errorSelector(state),
});

const mapDispatchToProps = {
  postsFetch: P.postsFetch,
  postsFetchMore: P.postsFetchMore,
};

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

export interface ISubredditProps extends PFS, PFD, RouteComponentProps {
  subreddit?: string;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddit);
