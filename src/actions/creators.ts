import { Action, ActionCreator } from "redux";
import types from "./types";

// subs

interface ILoadSubsAction extends Action {
  type: types.SUBS_LOAD;
  payload: string[];
}

export const loadSubs: ActionCreator<ILoadSubsAction> = (subs: string[]) => ({
  type: types.SUBS_LOAD,
  payload: subs,
});

interface IAddSubAction extends Action {
  type: types.SUBS_ADD;
  payload: string;
}

export const addSub: ActionCreator<IAddSubAction> = (sub: string) => ({
  type: types.SUBS_ADD,
  payload: sub,
});

interface IRemoveSubAction extends Action {
  type: types.SUBS_REMOVE;
  payload: string;
}

export const removeSub: ActionCreator<IRemoveSubAction> = (sub: string) => ({
  type: types.SUBS_REMOVE,
  payload: sub,
});

// auth

export interface IAuth {
  access_token?: string;
}

interface ISetAuthAction extends Action {
  type: types.AUTH_SET;
  payload: IAuth;
}

export const setAuth: ActionCreator<ISetAuthAction> = (auth: IAuth) => ({
  type: types.AUTH_SET,
  payload: auth,
});

// view

export interface IView {
  type?: string;
  id?: string;
  data?: any;
  isLoading?: boolean;
  error?: string | null;
}

interface ISetViewAction extends Action {
  type: types.VIEW_SET;
  payload: IView;
}

export const setView: ActionCreator<ISetViewAction> = (view: IView) => ({
  type: types.VIEW_SET,
  payload: view,
});

// fetch

export interface IReq {
  type: string;
  id: string;
  onSuccess: (data: any) => void;
}

interface IFetchDataAction extends Action {
  type: types.FETCH;
  payload: IReq;
}

export const fetchData: ActionCreator<IFetchDataAction> = (req: IReq) => ({
  type: types.FETCH,
  payload: req,
});
