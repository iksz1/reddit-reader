import { Reducer, Action } from "redux";

export const SUBS_LOAD = "SUBS_LOAD";
export const SUBS_ADD = "SUBS_ADD";
export const SUBS_REMOVE = "SUBS_REMOVE";

export type Subs = string[];

const subsReducer: Reducer<Subs> = (state = [], { type, payload }) => {
  switch (type) {
    case SUBS_LOAD:
      return payload;
    case SUBS_ADD:
      return state.concat(payload);
    case SUBS_REMOVE:
      return state.filter(sub => sub !== payload);
    default:
      return state;
  }
};

interface ILoadSubsAction extends Action {
  payload: Subs;
}

export const loadSubs = (subs: Subs): ILoadSubsAction => ({
  type: SUBS_LOAD,
  payload: subs,
});

interface IAddSubAction extends Action {
  payload: string;
}

export const addSub = (sub: string): IAddSubAction => ({
  type: SUBS_ADD,
  payload: sub,
});

interface IRemoveSubAction extends Action {
  payload: string;
}

export const removeSub = (sub: string): IRemoveSubAction => ({
  type: SUBS_REMOVE,
  payload: sub,
});

export default subsReducer;
