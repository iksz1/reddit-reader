import configureMockStore from "redux-mock-store";
import { fetchingMiddleware } from "../../middleware/fetchingMiddleware";
import api, { IMoreCommentsRes } from "../../utils/redditAPI";
import * as P from "../../ducks/posts";
import * as C from "../../ducks/comments";
import { mockMoreComments } from "../ducks/comments";

const mockStore = configureMockStore([fetchingMiddleware])();

describe("fetchingMiddleware", () => {
  beforeEach(() => mockStore.clearActions());

  it("should dispatch POSTS_REPLACE", async () => {
    api.getPosts = jest.fn(() => Promise.resolve({ data: [], meta: {} }));
    await fetchingMiddleware(mockStore)(a => a)(P.postsFetch({ subreddit: "reactjs" }));
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(P.POSTS_REPLACE);
  });

  it("should dispatch POSTS_APPEND", async () => {
    api.getPosts = jest.fn(() => Promise.resolve({ data: [], meta: {} }));
    await fetchingMiddleware(mockStore)(a => a)(P.postsFetchMore({ subreddit: "reactjs" }));
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(P.POSTS_APPEND);
  });

  it("should dispatch POSTS_ERROR", async () => {
    api.getPosts = jest.fn(() => Promise.reject("Failed to fetch"));
    await fetchingMiddleware(mockStore)(a => a)(P.postsFetch({ subreddit: "reactjs" }));
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(P.POSTS_ERROR);
  });

  it("should dispatch COMMENTS_REPLACE", async () => {
    api.getComments = jest.fn(() => Promise.resolve({ data: [], meta: {} }));
    await fetchingMiddleware(mockStore)(a => a)(
      C.commentsFetch({ subreddit: "reactjs", postId: "abc" })
    );
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(C.COMMENTS_REPLACE);
  });

  it("should dispatch COMMENTS_ADD", async () => {
    api.getMoreComments = jest.fn(() => Promise.resolve({ data: [], meta: {} }));
    await fetchingMiddleware(mockStore)(a => a)(
      C.commentsFetchMore("abc", (mockMoreComments as IMoreCommentsRes).data)
    );
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(C.COMMENTS_ADD);
  });

  it("should dispatch COMMENTS_ERROR", async () => {
    api.getComments = jest.fn(() => Promise.reject("Failed to fetch"));
    await fetchingMiddleware(mockStore)(a => a)(
      C.commentsFetch({ subreddit: "reactjs", postId: "abc" })
    );
    const expectedActions = mockStore.getActions();
    expect(expectedActions[0].type).toBe(C.COMMENTS_ERROR);
  });
});
