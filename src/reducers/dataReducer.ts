import { Reducer } from "redux";
import types from "../actions/types";
import { IPost, IComment } from "../utils/responseParser";

export interface IData {
  data: {
    posts?: IPost[];
    commnets?: IComment[];
    meta?: any;
  };
  isLoading: boolean;
  error: Error | null;
}

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

const dataReducer: Reducer<IData> = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case types.FETCH_SUCCESS:
      return { ...initialState, data: payload };
    case types.FETCH_FAILURE:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

export default dataReducer;
