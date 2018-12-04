import {applyMiddleware, createStore} from "redux";
import rootReducer from "../reducers/reducer";
import promiseMiddleware from 'redux-promise-middleware'

let composeStoreWithMiddleware = applyMiddleware(
  promiseMiddleware(),
)(createStore);
const store = composeStoreWithMiddleware(rootReducer);
export default store;