import { Reducer } from "redux";
import { TYPES } from "../constants";
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
    case TYPES.FETCH_REQUEST:
      return { ...state, isLoading: true, error: null };
    case TYPES.FETCH_SUCCESS:
      return { ...initialState, data: payload };
    case TYPES.FETCH_FAILURE:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};

export default dataReducer;
