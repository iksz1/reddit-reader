interface IResource {
  kind: string;
  data: any;
}

interface IListing {
  children: IResource[];
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
}

export interface IComment {
  id: string;
  title: string;
  author: string;
  score: number;
  replies: IResource;
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
  console.log(data);

  if (data.data) {
    // subreddit data
    const { children, after, before }: IListing = data.data;
    const posts = children.map(child => child.data) as IPost[];
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
const flattenComments = (comments: IResource[]) => {
  // return comments.filter(({data: cmt}) => !cmt.children ? {...cmt, replies: getReplies(cmt)} : false);
  const result: IComment[][] = [];
  comments.forEach(({ data: cmt }) => {
    if (!cmt.children) {
      const replies = flattenReplies(cmt);
      result.push([cmt, ...replies]);
    }
  });
  return result;
};

const flattenReplies = (comment: IComment) => {
  if (!comment.replies) return [];

  let replies: IComment[] = [];
  const { children }: IListing = comment.replies.data;
  children.forEach(child => {
    if (child.kind !== "more") {
      const reply = child.data;
      const moreReplies = flattenReplies(reply);
      replies = replies.concat(reply, moreReplies);
    }
  });
  return replies;
};

export default parser;
