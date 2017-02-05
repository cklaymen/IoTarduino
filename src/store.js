import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { socketsMiddleware } from "./sockets";

import reducers from "./reducers";

const middleware = applyMiddleware(promise(), thunk, logger(), socketsMiddleware);
export default createStore(reducers, middleware);
