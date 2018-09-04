import { Action } from "redux";
import { TYPES } from "../constants";
import { Subs } from "../reducers/subsReducer";
import { IAuth } from "../reducers/authReducer";

// subs

interface ILoadSubsAction extends Action {
  payload: Subs;
}

export const loadSubs = (subs: Subs): ILoadSubsAction => ({
  type: TYPES.SUBS_LOAD,
  payload: subs,
});

interface IAddSubAction extends Action {
  payload: string;
}

export const addSub = (sub: string): IAddSubAction => ({
  type: TYPES.SUBS_ADD,
  payload: sub,
});

interface IRemoveSubAction extends Action {
  payload: string;
}

export const removeSub = (sub: string): IRemoveSubAction => ({
  type: TYPES.SUBS_REMOVE,
  payload: sub,
});

// auth

interface ISetAuthAction extends Action {
  payload: IAuth;
}

export const setAuth = (auth: IAuth): ISetAuthAction => ({
  type: TYPES.AUTH_SET,
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
  type: TYPES.FETCH_REQUEST,
  payload: request,
});

interface IFetchSuccessAction extends Action {
  payload: any;
}

export const fetchSuccess = (data: any): IFetchSuccessAction => ({
  type: TYPES.FETCH_SUCCESS,
  payload: data,
});

interface IFetchFailureAction extends Action {
  payload: Error;
}

export const fetchFailure = (error: Error): IFetchFailureAction => ({
  type: TYPES.FETCH_FAILURE,
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
  type: TYPES.CACHE_SET,
  payload: { key, data },
});

// view

export const toggleSidebar = (): Action => ({
  type: TYPES.VIEW_TOGGLE_SIDEBAR,
});

interface IChangeThemeAction extends Action {
  payload: string;
}

export const changeTheme = (themeName: string): IChangeThemeAction => ({
  type: TYPES.VIEW_CHANGE_THEME,
  payload: themeName,
});
