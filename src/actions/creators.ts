import { Action } from "redux";
import types from "./types";
import { Subs } from "../reducers/subsReducer";
import { IAuth } from "../reducers/authReducer";
import { IView } from "../reducers/viewReducer";

// subs

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

interface ISetAuthAction extends Action {
  payload: IAuth;
}

export const setAuth = (auth: IAuth): ISetAuthAction => ({
  type: types.AUTH_SET,
  payload: auth,
});

// fetch

export interface IFetchRequest {
  uri: string;
}

interface IFetchRequestAction extends Action {
  payload: IFetchRequest;
}

export const fetchRequest = (request: IFetchRequest): IFetchRequestAction => ({
  type: types.FETCH_REQUEST,
  payload: request,
});

interface IFetchSuccessAction extends Action {
  payload: any;
}

export const fetchSuccess = (data: any): IFetchSuccessAction => ({
  type: types.FETCH_SUCCESS,
  payload: data,
});

interface IFetchFailureAction extends Action {
  payload: Error;
}

export const fetchFailure = (error: Error): IFetchFailureAction => ({
  type: types.FETCH_FAILURE,
  payload: error,
});

// cache

interface ISetCacheAction extends Action {
  payload: {
    key: string;
    data: any;
  };
}

export const setCache = (key: string, data: any): ISetCacheAction => ({
  type: types.CACHE_SET,
  payload: { key, data },
});

// view

export const toggleSidebar = (): Action => ({
  type: types.VIEW_TOGGLE_SIDEBAR,
});

interface IChangeThemeAction extends Action {
  payload: string;
}

export const changeTheme = (themeName: string): IChangeThemeAction => ({
  type: types.VIEW_CHANGE_THEME,
  payload: themeName,
});
