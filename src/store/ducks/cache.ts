import { Reducer, Action } from "redux";

const CACHE_SET = "CACHE_SET";

interface ICacheItem {
  key: string;
  data: any;
  expires: number;
}

export type Cache = ICacheItem[];

const cacheReducer: Reducer<Cache> = (state = [], { type, payload }) => {
  switch (type) {
    case CACHE_SET:
      const cache = [...state];
      // keep last 5 entries
      if (cache.length === 5) {
        cache.shift();
      }
      cache.push({ ...payload, expires: 10 * 60 * 1000 + Date.now() }); // expires in 10 minutes
      return cache;
    default:
      return state;
  }
};

interface ISetCacheAction extends Action {
  payload: {
    key: string;
    data: any;
  };
}

export const setCache = (key: string, data: any): ISetCacheAction => ({
  type: CACHE_SET,
  payload: { key, data },
});

export default cacheReducer;
