import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import allReducers from "./reducers/allReducers";

const middlewares = [thunk];

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
