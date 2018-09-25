import configureMockStore from "redux-mock-store";
import { fetchMiddleware } from "../../middleware/fetchMiddleware";
import { fetchRequest, FETCH_SUCCESS, FETCH_FAILURE } from "../../ducks/data";
import { mockResponse } from "./middleware";

const mockStore = configureMockStore([fetchMiddleware]);

describe("fetch middleware", () => {
  const fetchRequestAction = fetchRequest({ uri: "/" });

  it("should dispatch FETCH_SUCCESS", async () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, "", "[[], []]")));
    const store = mockStore();
    await fetchMiddleware(store)(a => a)(fetchRequestAction);
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(FETCH_SUCCESS);
  });

  it("should dispatch FETCH_FAILURE", async () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(404, "", null)));
    const store = mockStore();
    await fetchMiddleware(store)(a => a)(fetchRequestAction);
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(FETCH_FAILURE);
  });

  it("should dispatch FETCH_FAILURE", async () => {
    window.fetch = jest.fn(() => Promise.reject("Failed to fetch"));
    const store = mockStore();
    await fetchMiddleware(store)(a => a)(fetchRequestAction);
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(FETCH_FAILURE);
  });
});
