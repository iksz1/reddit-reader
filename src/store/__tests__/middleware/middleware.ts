import configureMockStore from "redux-mock-store";
import { cacheMiddleware } from "../../middleware/cacheMiddleware";
import { fetchMiddleware } from "../../middleware/fetchMiddleware";
import { fetchRequest, FETCH_SUCCESS } from "../../ducks/data";
import { CACHE_SET } from "../../ducks/cache";

const mockStore = configureMockStore([cacheMiddleware, fetchMiddleware]);

export const mockResponse = (status: number, statusText: string, body: any) => {
  return new Response(body, {
    status,
    statusText,
    headers: {
      "Content-type": "application/json",
    },
  });
};

describe("fetch middleware with cache middleware", () => {
  const fetchRequestAction = fetchRequest({ uri: "/" });

  it("should dispatch CACHE_SET and FETCH_SUCCESS", async () => {
    window.fetch = jest.fn(() => Promise.resolve(mockResponse(200, "", "[[], []]")));
    const store = mockStore({ cache: [] });
    await fetchMiddleware(store)(a => a)(fetchRequestAction);
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(CACHE_SET);
    expect(expectedActions[1].type).toBe(FETCH_SUCCESS);
  });

  it("should dispatch FETCH_SUCCESS", () => {
    const store = mockStore({
      cache: [{ key: "/", data: "cached data", expires: 600000 + Date.now() }],
    });
    store.dispatch(fetchRequestAction);
    const expectedActions = store.getActions();
    expect(expectedActions[0].type).toBe(FETCH_SUCCESS);
  });
});
