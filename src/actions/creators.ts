import { Action } from "redux";
import types from "./types";

// subs

export type Subs = string[];

interface ILoadSubsAction extends Action {
  payload: Subs;
}

export const loadSubs = (subs: Subs): ILoadSubsAction => ({
  type: types.SUBS_LOAD,
  payload: subs,
});

interface IAddSubAction extends Action {
  payload: string;
}

export const addSub = (sub: string): IAddSubAction => ({
  type: types.SUBS_ADD,
  payload: sub,
});

interface IRemoveSubAction extends Action {
  payload: string;
}

export const removeSub = (sub: string): IRemoveSubAction => ({
  type: types.SUBS_REMOVE,
  payload: sub,
});

// auth

export interface IAuth {
  access_token?: string;
}

interface ISetAuthAction extends Action {
  payload: IAuth;
}

export const setAuth = (auth: IAuth): ISetAuthAction => ({
  type: types.AUTH_SET,
  payload: auth,
});

// fetch

export interface IRequest {
  uri: string;
  onSuccess: (data: any) => void;
}

interface IFetchDataAction extends Action {
  payload: IRequest;
}

export const fetchData = (request: IRequest): IFetchDataAction => ({
  type: types.FETCH,
  payload: request,
});

// export const fetchData: ActionCreator<IFetchDataAction> = (request: IRequest) => ({
//   type: types.FETCH,
//   payload: request,
// });

// cache

export interface ICacheItem {
  key: string;
  data: any;
  expires: number;
}

export type Cache = ICacheItem[];

export const setCache = (key: string, data: any) => ({
  type: types.CACHE_SET,
  payload: { key, data },
});
