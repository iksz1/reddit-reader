import types from "./types";

export const loadSubs = (subs: string[]) => ({
  type: types.SUBS_LOAD,
  payload: subs,
});

export const subscribe = (subreddit: string) => ({
  types: types.SUBS_ADD,
  payload: subreddit,
});

export const unsubscribe = (subreddit: string) => ({
  type: types.SUBS_REMOVE,
  payload: subreddit,
});

export const setAuth = (auth: any) => ({
  type: types.AUTH_SET,
  payload: auth,
});

export interface IView {
  type: string;
  id: string;
  data?: any;
  isLoading?: boolean;
  error?: string | null;
}

export const setView = (view: IView) => ({
  type: types.VIEW_SET,
  payload: view,
});

export interface IReq {
  type: string;
  id: string;
  onSuccess: (data: any) => void;
}

export const fetchData = (req: IReq) => ({
  type: types.FETCH,
  payload: req,
});
