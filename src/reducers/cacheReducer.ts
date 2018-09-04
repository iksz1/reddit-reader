import { Reducer } from "redux";
import { TYPES } from "../constants";

interface ICacheItem {
  key: string;
  data: any;
  expires: number;
}

export type Cache = ICacheItem[];

const cacheReducer: Reducer<Cache> = (state = [], { type, payload }) => {
  switch (type) {
    case TYPES.CACHE_SET:
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

export default cacheReducer;
