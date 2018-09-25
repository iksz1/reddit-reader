import { getItem, setItem } from "../../utils/localStorage";

describe("localStorage helper", () => {
  it("should call localStorage.getItem", () => {
    const spy = spyOn(Storage.prototype, "getItem");
    getItem("_subs");
    expect(spy).toBeCalled();
  });

  it("should call localStorage.setItem", () => {
    const spy = spyOn(Storage.prototype, "setItem");
    setItem("_theme", "light");
    expect(spy).toBeCalled();
  });
});
