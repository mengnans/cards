import {applyMiddleware, createStore} from "redux";
import appReducer from "../reducers/reducer";
import promiseMiddleware from "redux-promise-middleware";

let composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware(),
)(createStore);
const store = composeStoreWithMiddleware(appReducer);
export default store;