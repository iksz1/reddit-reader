import { Reducer, Action } from "redux";
import { IParsedData } from "../utils/responseParser";

export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export interface IData {
  dataId?: string;
  data: IParsedData;
  isLoading: boolean;
  error: Error | null;
}

const initialState = {
  data: {
    posts: [],
    comments: [],
  },
  isLoading: false,
  error: null,
};

const dataReducer: Reducer<IData> = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...initialState, data: payload, dataId: meta.uri };
    case FETCH_FAILURE:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

export interface IFetchRequest {
  uri: string;
}

interface IFetchRequestAction extends Action {
  payload: IFetchRequest;
}

export const fetchRequest = (request: IFetchRequest): IFetchRequestAction => ({
  type: FETCH_REQUEST,
  payload: request,
});

interface IFetchSuccessAction extends Action {
  payload: any;
  meta: IFetchRequest;
}

export const fetchSuccess = (data: any, meta: IFetchRequest): IFetchSuccessAction => ({
  type: FETCH_SUCCESS,
  payload: data,
  meta,
});

interface IFetchFailureAction extends Action {
  payload: Error;
  meta: IFetchRequest;
}

export const fetchFailure = (error: Error, meta: IFetchRequest): IFetchFailureAction => ({
  type: FETCH_FAILURE,
  payload: error,
  meta,
});

export default dataReducer;
