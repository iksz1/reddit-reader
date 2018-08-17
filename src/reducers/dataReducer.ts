import { Reducer } from "redux";
import types from "../actions/types";
import { IParsedData } from "../utils/responseParser";

export interface IData {
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
