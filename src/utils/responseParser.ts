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
}

export interface IComment {
  id: string;
  title: string;
  author: string;
  score: number;
  replies: IResource;
  url: string;
}

const parser = (data: any) => {
  console.log(data);

  if (data.data) {
    // subreddit data
    const { children, after, before }: IListing = data.data;
    const posts = children.map(child => child.data) as IPost[];
    const meta = { after, before };
    return { posts, meta };
  } else {
    // comments data
    const post = data[0].data.children[0].data as IPost;
    const comments = flatComments(data[1].data.children);
    return { post, comments };
  }
};

// normalize comments
const flatComments = (comments: IResource[]) => {
  // return comments.filter(({data: cmt}) => !cmt.children ? {...cmt, replies: getReplies(cmt)} : false);
  const result: IComment[] = [];
  comments.forEach(({ data: cmt }) => {
    if (!cmt.children) {
      const replies = getReplies(cmt);
      result.push({ ...cmt, replies });
    }
  });
  return result;
};

const getReplies = (comment: IComment) => {
  if (!comment.replies) return [];

  let replies: IComment[] = [];
  const { children }: IListing = comment.replies.data;
  children.forEach(child => {
    if (child.kind !== "more") {
      const rep = child.data;
      const moreReps = getReplies(rep);
      replies = replies.concat(rep, moreReps);
    }
  });
  return replies;
};

export default parser;
