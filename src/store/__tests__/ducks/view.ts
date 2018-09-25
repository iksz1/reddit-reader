import viewReducer, { changeTheme, toggleSidebar } from "../../ducks/view";

describe("view reducer", () => {
  const initialState = {
    themeId: "light",
    isSidebarVisible: false,
  };

  it("should change theme", () => {
    const state = viewReducer(initialState, changeTheme("alright"));
    expect(state.themeId).toBe("alright");
  });

  it("should toggle sidebar", () => {
    const state = viewReducer(initialState, toggleSidebar());
    expect(state.isSidebarVisible).toBeTruthy();
    expect(viewReducer(state, toggleSidebar()).isSidebarVisible).toBeFalsy();
  });
});
