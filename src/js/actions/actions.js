import {TOGGLE_DRAWER, PAGE_CHANGE, INITIAL_LOAD} from "../constants/action-types";
import { get } from '../data-fetch/data-fetch';
import {BACKEND_URL} from "../constants/data-fetch-constant";
import generateUrlParams from "../data-fetch/url-params-generator";

export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});
export const toggleDrawer = (selectedId) => ({type: TOGGLE_DRAWER, payload: selectedId});
export const initialLoad = (page, dataPerPage) => ({ type: INITIAL_LOAD,  payload: get(BACKEND_URL,generateUrlParams(page, dataPerPage))});
