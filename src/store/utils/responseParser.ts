interface IResource<T> {
  kind: string;
  data: T;
}

interface IListing<T> {
  children: IResource<T>[];
  after: string | null;
  before: string | null;
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
  title: string;
  author: string;
  score: number;
  replies: IResource<IListing<IComment>> | "";
  url: string;
  body_html: string;
  depth: number;
}

interface IMeta {
  after: string | null;
  before: string | null;
}

export interface IParsedData {
  posts: IPost[];
  comments: IComment[][];
  meta?: IMeta;
}

const parser = (data: any): IParsedData => {
  if (data.data) {
    // subreddit data
    const { children, after, before }: IListing<IPost> = data.data;
    const posts = children.map(child => child.data);
    const meta = { after, before };
    return { posts, comments: [], meta };
  } else {
    // comments data
    const post = data[0].data.children[0].data as IPost;
    const comments = flattenComments(data[1].data.children);
    return { posts: [post], comments };
  }
};

// normalize comments
const flattenComments = (comments: IResource<IComment>[]): IComment[][] => {
  const result: IComment[][] = [];
  comments.forEach(({ kind, data }) => {
    if (kind === "t1") {
      result.push([data, ...flattenReplies(data)]);
    }
  });
  return result;
};

// recursively get replies
const flattenReplies = (comment: IComment): IComment[] => {
  if (!comment.replies) return [];

  const result: IComment[] = [];
  comment.replies.data.children.forEach(({ kind, data }) => {
    if (kind === "t1") {
      result.push(data, ...flattenReplies(data));
    }
  });
  return result;
};

export default parser;
