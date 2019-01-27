import commentsReducer, {
  commentsFetch,
  commentsReplace,
  commentsAdd,
  commentsError,
} from "../../ducks/comments";
import { createStamp } from "../../utils/stamp";
import { IParsedComments, CommentOrMore } from "../../utils/redditAPI";
import { mockPost } from "./posts";

export const mockComment: CommentOrMore = {
  kind: "t1",
  data: {
    id: "1",
    author: "",
    author_flair_text: null,
    score: 0,
    replies: "",
    body_html: "",
    depth: 0,
    is_submitter: false,
  },
};

export const mockCommentTwo: CommentOrMore = {
  kind: "t1",
  data: {
    id: "2",
    author: "",
    author_flair_text: null,
    score: 0,
    replies: "",
    body_html: "",
    depth: 0,
    is_submitter: false,
  },
};

export const mockMoreComments: CommentOrMore = {
  kind: "more",
  data: {
    id: "2",
    name: "",
    parent_id: "",
    children: ["2"],
    count: 1,
    depth: 0,
  },
};

describe("comments reducer", () => {
  it("should handle COMMENTS_FETCH", () => {
    expect(
      commentsReducer(undefined, commentsFetch({ subreddit: "reactjs", postId: "abc" }))
    ).toEqual({
      data: [],
      meta: {},
      isLoading: true,
      error: null,
    });
  });

  it("should handle COMMENTS_REPLACE", () => {
    const data: IParsedComments = { data: [mockPost, [mockComment]], meta: {} };
    const stamp = createStamp({ subreddit: "reactjs", postId: "abc" });
    expect(commentsReducer(undefined, commentsReplace(data, stamp))).toEqual({
      ...data,
      isLoading: false,
      error: null,
      stamp,
    });
  });

  it("should handle COMMENTS_ADD", () => {
    const data: IParsedComments["data"] = [mockPost, [mockComment, mockMoreComments]];
    const initialState = {
      data,
      meta: {},
      isLoading: false,
      error: null,
    };
    expect(
      commentsReducer(initialState, commentsAdd({ data: [mockCommentTwo], meta: { moreId: "2" } }))
    ).toEqual({
      data: [mockPost, [mockComment, mockCommentTwo]],
      meta: {},
      isLoading: false,
      error: null,
    });
  });

  it("should handle COMMENTS_ERROR", () => {
    const error = new Error();
    expect(commentsReducer(undefined, commentsError(error))).toEqual({
      data: [],
      meta: {},
      isLoading: false,
      error,
    });
  });
});
