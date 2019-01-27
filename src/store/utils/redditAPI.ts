const BASE_URL = "https://www.reddit.com";
const BASE_QUERY = "?raw_json=1";

const queryBuilder = (query?: string) => {
  if (query) {
    return query.startsWith("?") ? BASE_QUERY + "&" + query.slice(1) : BASE_QUERY + "&" + query;
  }
  return BASE_QUERY;
};

const fetchData = async (url: string, init?: RequestInit): Promise<unknown> => {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
};

interface IParams {
  subreddit: string;
  postId?: string;
  query?: string;
}

type RawPosts = IListingRes<IPostRes>;

const getPosts = async ({ subreddit, query }: IParams): Promise<IParsedPosts> => {
  const url = `${BASE_URL}/r/${subreddit}/.json${queryBuilder(query)}`;
  const data = (await fetchData(url)) as RawPosts;
  const { children, after, before } = data.data;
  const posts = children.map(child => child.data);
  return { data: posts, meta: { after, before } };
};

type RawComments = [IListingRes<IPostRes>, IListingRes<ICommentRes>];

const getComments = async ({ subreddit, postId, query }: IParams): Promise<IParsedComments> => {
  const url = `${BASE_URL}/r/${subreddit}/comments/${postId}/.json${queryBuilder(query)}`;
  const data = (await fetchData(url)) as RawComments;
  const post = data[0].data.children[0].data;
  const { children, after, before } = data[1].data;
  const comments = flattenComments(children);
  return { data: [post, comments], meta: { after, before } };
};

interface IRawMoreComments {
  json: {
    data: {
      things: CommentOrMore[];
    };
  };
}

const getMoreComments = async ({
  linkId,
  more,
}: {
  linkId: string;
  more: IMoreComments;
}): Promise<IParsedMoreComments> => {
  const query = `api_type=json&link_id=t3_${linkId}&children=${more.children.join(",")}`;
  const url = `${BASE_URL}/api/morechildren/.json${queryBuilder(query)}`;
  const data = (await fetchData(url)) as IRawMoreComments;
  return {
    data: data.json.data.things,
    meta: { moreId: more.id },
  };
};

interface IListingRes<T> {
  kind: "Listing";
  data: {
    children: T[];
    after: string | null;
    before: string | null;
  };
}

export interface IPostRes {
  kind: "t3";
  data: IPost;
}

export interface ICommentRes {
  kind: "t1";
  data: IComment;
}

export interface IMoreCommentsRes {
  kind: "more";
  data: IMoreComments;
}

export interface IPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  url: string;
  permalink: string;
  selftext_html: string;
  is_self: boolean;
  created_utc: number;
}

export interface IComment {
  id: string;
  author: string;
  author_flair_text: string | null;
  score: number;
  replies: IListingRes<ICommentRes> | "";
  body_html: string;
  depth: number;
  is_submitter: boolean;
}

export interface IMoreComments {
  id: string;
  name: string;
  parent_id: string;
  children: string[];
  count: number;
  depth: number;
}

export interface IMeta {
  after?: string | null;
  before?: string | null;
}

export interface IParsedPosts {
  data: IPost[];
  meta: IMeta;
}

export interface IParsedComments {
  data: [IPost, CommentOrMore[]];
  meta: IMeta;
}

export interface IParsedMoreComments {
  data: CommentOrMore[];
  meta: { moreId: string };
}

export type CommentOrMore = ICommentRes | IMoreCommentsRes;

// normalize comments
const flattenComments = (children: CommentOrMore[]): CommentOrMore[] => {
  return children.reduce((result: CommentOrMore[], child) => {
    if (child.kind === "t1") {
      return result.concat(
        child,
        flattenComments(child.data.replies ? child.data.replies.data.children : [])
      );
    } else {
      return result.concat(child);
    }
  }, []);
};

export default { getPosts, getComments, getMoreComments };
