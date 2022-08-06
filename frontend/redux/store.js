import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import allReducers from "./reducers/allReducers";

const middlewares = [thunk];

const initStore = () => {
  return createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

const wrapper = createWrapper(initStore);

export default wrapper;
