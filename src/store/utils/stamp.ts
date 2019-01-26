export interface IStamp {
  key: string;
  expires: number;
}

interface IParams {
  subreddit: string;
  postId?: string;
}

export const createStamp = ({ subreddit, postId }: IParams, validFor = 10): IStamp => {
  const expires = Date.now() + validFor * 60 * 1000;
  return postId ? { key: postId, expires } : { key: subreddit, expires };
};

export const validateStamp = (stamp: IStamp, params: IParams): boolean => {
  return stamp.expires > Date.now() && stamp.key === createStamp(params).key;
};
