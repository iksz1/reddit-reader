import { createStore, applyMiddleware } from "redux";
import { persistMiddleware } from "../../middleware/persistMiddleware";
import reducer from "../../ducks";
import { addSub, removeSub } from "../../ducks/subs";
import { changeTheme } from "../../ducks/view";

describe("persist middleware", () => {
  const initialStore = {
    subs: ["webdev", "javascript", "reactjs"],
    view: {
      themeId: "light",
    },
  };
  const store = createStore(reducer, initialStore, applyMiddleware(persistMiddleware));

  it("should handle SUBS_ADD and SUBS_REMOVE", () => {
    store.dispatch(addSub("typescript"));
    expect(JSON.parse(localStorage.getItem("_subs") as string)).toContain("typescript");
    store.dispatch(removeSub("reactjs"));
    expect(JSON.parse(localStorage.getItem("_subs") as string)).not.toContain("reactjs");
  });

  it("should handle VIEW_CHANGE_THEME", () => {
    store.dispatch(changeTheme("alright"));
    expect(localStorage.getItem("_theme")).toBe("alright");
  });
});
