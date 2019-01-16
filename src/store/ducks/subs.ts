import { Reducer } from "redux";
import { createAction } from "../utils/actionHelper";
import { IAppState } from ".";

export const SUBS_ADD = "SUBS_ADD";
export const SUBS_REMOVE = "SUBS_REMOVE";

export type SubsState = string[];

export type SubsAction = AddSub | RemoveSub;

const subsReducer: Reducer<SubsState, SubsAction> = (state = [], action) => {
  switch (action.type) {
    case SUBS_ADD:
      return state.concat(action.payload);
    case SUBS_REMOVE:
      return state.filter(sub => sub !== action.payload);
    default:
      return state;
  }
};

export type AddSub = ReturnType<typeof addSub>;

export const addSub = (sub: string) => createAction(SUBS_ADD, sub);

export type RemoveSub = ReturnType<typeof removeSub>;

export const removeSub = (sub: string) => createAction(SUBS_REMOVE, sub);

export const subsSelector = (state: IAppState) => state.subs;

export default subsReducer;
