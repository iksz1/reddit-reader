import { applyMiddleware } from "redux";
import { cacheMiddleware } from "./cacheMiddleware";
import { fetchMiddleware } from "./fetchMiddleware";
import { persistMiddleware } from "./persistMiddleware";

export default applyMiddleware(cacheMiddleware, fetchMiddleware, persistMiddleware);
