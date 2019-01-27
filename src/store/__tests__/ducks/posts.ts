import postsReducer, { postsFetch, postsReplace, postsError, postsAppend } from "../../ducks/posts";
import { createStamp } from "../../utils/stamp";

export const mockPost = {
  id: "",
  title: "",
  author: "",
  score: 0,
  url: "",
  permalink: "",
  num_comments: 0,
  selftext_html: "",
  is_self: true,
  created_utc: 12345,
};

describe("posts reducer", () => {
  it("should handle POSTS_FETCH", () => {
    expect(postsReducer(undefined, postsFetch({ subreddit: "reactjs" }))).toEqual({
      data: [],
      meta: {},
      isLoading: true,
      error: null,
    });
  });

  it("should handle POSTS_REPLACE", () => {
    const data = { data: [mockPost], meta: {} };
    const stamp = createStamp({ subreddit: "reactjs" });
    expect(postsReducer(undefined, postsReplace(data, stamp))).toEqual({
      ...data,
      isLoading: false,
      error: null,
      stamp,
    });
  });

  it("should handle POSTS_APPEND", () => {
    const initialState = {
      data: [mockPost],
      meta: {},
      isLoading: false,
      error: null,
    };
    const stamp = createStamp({ subreddit: "reactjs" });
    expect(postsReducer(initialState, postsAppend({ data: [mockPost], meta: {} }, stamp))).toEqual({
      data: [mockPost, mockPost],
      meta: {},
      isLoading: false,
      error: null,
      stamp,
    });
  });

  it("should handle POSTS_ERROR", () => {
    const error = new Error("Failed to fetch.");
    expect(postsReducer(undefined, postsError(error))).toEqual({
      data: [],
      meta: {},
      isLoading: false,
      error,
    });
  });
});
