import { combineReducers } from "redux";
import subs, { SubsState } from "./subs";
import view, { IViewState } from "./view";
import posts, { IPostsState } from "./posts";
import comments, { ICommentsState } from "./comments";

const subreddit = combineReducers({ posts });
const thread = combineReducers({ comments });

interface ISubredditState {
  posts: IPostsState;
}

interface IThreadState {
  comments: ICommentsState;
}

export interface IAppState {
  subs: SubsState;
  view: IViewState;
  subreddit: ISubredditState;
  thread: IThreadState;
}

const reducer = combineReducers<IAppState>({ subs, view, subreddit, thread });

export default reducer;
