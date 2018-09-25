import subsReducer, { addSub, removeSub } from "../../ducks/subs";

describe("subs reducer", () => {
  const initialState = ["webdev", "javascript", "reactjs"];

  it("should add sub", () => {
    const state = subsReducer(initialState, addSub("typescript"));
    expect(state).toHaveLength(4);
    expect(state[3]).toBe("typescript");
  });

  it("should remove sub", () => {
    const state = subsReducer(initialState, removeSub("javascript"));
    expect(state).toHaveLength(2);
    expect(state[1]).toBe("reactjs");
  });
});
