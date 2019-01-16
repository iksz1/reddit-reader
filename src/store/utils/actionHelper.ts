import { Action } from "redux";

interface IActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): IActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  if (payload) return { type, payload };
  return { type };
}

// export type Optional<T> = { [P in keyof T]?: T[P] };
