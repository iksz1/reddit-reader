import responseParser from "../../utils/responseParser";

describe("response parser", () => {
  const rawSubredditData = {
    data: {
      after: "",
      before: "",
      children: [
        { data: { title: "Future of React" }, kind: "t3" },
        { data: { title: "Immer vs ImmutableJS" }, kind: "t3" },
        { data: { title: "Typescript with Babel" }, kind: "t3" },
      ],
    },
  };
  const rawCommentsData = [
    {
      data: {
        after: "",
        before: "",
        children: [{ data: { title: "Future of React" }, kind: "t3" }],
      },
    },
    {
      data: {
        after: "",
        before: "",
        children: [
          { data: { body: "yay" }, kind: "t1" },
          { data: { body: "can't wait!" }, kind: "t1" },
          { data: { body: "web components?" }, kind: "t1" },
        ],
      },
    },
  ];
  const parsedSubredditData = {
    posts: [
      { title: "Future of React" },
      { title: "Immer vs ImmutableJS" },
      { title: "Typescript with Babel" },
    ],
    comments: [],
    meta: { after: "", before: "" },
  };
  const parsedCommentsData = {
    posts: [{ title: "Future of React" }],
    comments: [[{ body: "yay" }], [{ body: "can't wait!" }], [{ body: "web components?" }]],
  };

  it("should return null", () => {
    const data = responseParser(["a", "b", "c"]);
    expect(data).toBeNull();
  });

  it("should return parsed subreddit data", () => {
    const data = responseParser(rawSubredditData);
    expect(data).toEqual(parsedSubredditData);
  });

  it("should return parsed components data", () => {
    const data = responseParser(rawCommentsData);
    expect(data).toEqual(parsedCommentsData);
  });
});
