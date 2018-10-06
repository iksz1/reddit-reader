import cacheReducer, { setCache } from "../../ducks/cache";

describe("cache reducer", () => {
  it("should add an item", () => {
    const state = cacheReducer(undefined, setCache("myitem", "some data"));
    expect(state).toHaveLength(1);
    expect(state[0].key).toBe("myitem");
    expect(state[0].data).toBe("some data");
    expect(state[0].expires).toBeGreaterThan(Date.now());
  });

  it("should keep 5 items only", () => {
    const initialState = [
      { key: "1", data: "", expires: 0 },
      { key: "2", data: "", expires: 0 },
      { key: "3", data: "", expires: 0 },
      { key: "4", data: "", expires: 0 },
      { key: "5", data: "", expires: 0 },
    ];
    const state = cacheReducer(initialState, setCache("6", ""));
    expect(state).toHaveLength(5);
    expect(state[0].key).toBe("6");
    expect(state[4].key).toBe("4");
  });
});
