import {TOGGLE_DRAWER, PAGE_CHANGE, INITIAL_LOAD} from "../constants/action-types";
import { get } from '../data-fetch/data-fetch';
import {URL} from "../constants/data-fetch-constant";
import generateUrlParams from "../data-fetch/url-params-generator";
import {createAsyncAction} from "redux-promise-middleware-actions";

export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});
export const toggleDrawer = (drawerData) => ({type: TOGGLE_DRAWER, payload: drawerData});
export const initialLoad = createAsyncAction(INITIAL_LOAD, () => (get(URL,generateUrlParams(0, 5*12))));
