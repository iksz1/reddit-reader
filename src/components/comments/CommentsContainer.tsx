import { connect } from "react-redux";
import Comments from "./Comments";
import { IAppState } from "../../store/ducks";
import { RouteComponentProps } from "@reach/router";
import * as C from "../../store/ducks/comments";

interface IOwnProps extends RouteComponentProps {
  subreddit?: string;
  postId?: string;
}

const mapStateToProps = (state: IAppState, props: IOwnProps) => ({
  post: C.postDataSelector(state, props.postId!),
  comments: C.commentsDataSelector(state),
  meta: C.metaSelector(state),
  isLoading: C.loadingSelector(state),
  error: C.errorSelector(state),
});

const mapDispatchToProps = {
  commentsFetch: C.commentsFetch,
  commentsFetchMore: C.commentsFetchMore,
};

type PFS = ReturnType<typeof mapStateToProps>;
type PFD = typeof mapDispatchToProps;

export interface ICommentsProps extends IOwnProps, PFS, PFD {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
