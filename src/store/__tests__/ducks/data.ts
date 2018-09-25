import dataReducer, { fetchRequest, fetchSuccess, fetchFailure } from "../../ducks/data";

describe("data reducer", () => {
  it("should handle FETCH_REQUEST", () => {
    const data = { posts: [], comments: [] };
    expect(dataReducer(undefined, fetchRequest({ uri: "/" }))).toEqual({
      data,
      isLoading: true,
      error: null,
    });
  });

  it("should handle FETCH_SUCCESS", () => {
    const data = {
      posts: ["post1", "post2"],
      comments: [],
    };
    expect(dataReducer(undefined, fetchSuccess(data, { uri: "/" }))).toEqual({
      dataId: "/",
      data,
      isLoading: false,
      error: null,
    });
  });

  it("should handle FETCH_FAILURE", () => {
    const data = { posts: [], comments: [] };
    const error = new Error("Failed to fetch.");
    expect(dataReducer(undefined, fetchFailure(error, { uri: "/" }))).toEqual({
      data,
      isLoading: false,
      error,
    });
  });
});
