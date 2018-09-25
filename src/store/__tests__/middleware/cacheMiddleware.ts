import configureMockStore from "redux-mock-store";
import { cacheMiddleware } from "../../middleware/cacheMiddleware";
import { CACHE_SET } from "../../ducks/cache";
import { fetchRequest, fetchSuccess, FETCH_SUCCESS } from "../../ducks/data";

const mockStore = configureMockStore([cacheMiddleware]);

describe("cache middleware", () => {
  const fetchRequestAction = fetchRequest({ uri: "/" });

  it("should pass the action to next", () => {
    const store = mockStore({ cache: [] });
    const mockNext = jest.fn();
    cacheMiddleware(store)(mockNext)(fetchRequestAction);
    expect(store.getActions().length).toBe(0);
    expect(mockNext).toBeCalledWith(fetchRequestAction);
  });

  it("should pass FETCH_SUCCESS to next", () => {
    const store = mockStore({
      cache: [{ key: "/", data: "cached data", expires: 600000 + Date.now() }],
    });
    const mockNext = jest.fn();
    cacheMiddleware(store)(mockNext)(fetchRequestAction);
    expect(mockNext.mock.calls[0][0].type).toBe(FETCH_SUCCESS);
  });

  it("should dispatch CACHE_SET", () => {
    const store = mockStore({ cache: [] });
    cacheMiddleware(store)(a => a)(fetchSuccess("", { uri: "/" }));
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(CACHE_SET);
  });
});
