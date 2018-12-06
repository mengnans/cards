import {
  TOGGLE_DRAWER,
  PAGE_CHANGE,
  INITIAL_LOAD,
  LOAD,
  LOAD_MORE_CACHE, SET_RECENTLY_RE_LOADED_FLAG
} from "../constants/action-types";
import { get } from "../data-fetch/data-fetch";
import {BACKEND_URL} from "../constants/constant";
import generateUrlParams from "../data-fetch/url-params-generator";

// change the page number
export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});
// toggle the drawer
export const toggleDrawer = (selectedId) => ({type: TOGGLE_DRAWER, payload: selectedId});
// initial load 5 data, one for current page, four for the cache
export const initialLoad = (page, dataPerPage) => ({ type: INITIAL_LOAD,  payload: get(BACKEND_URL,generateUrlParams(page, dataPerPage))});
// load single or multiple data
export const load = (page, dataPerPage) => ({ type: LOAD,  payload: get(BACKEND_URL,generateUrlParams(page, dataPerPage))});
// let redux knows this data has been reloaded recently or not
export const setRecentlyReloadedFlag = (page, flag) => ({ type: SET_RECENTLY_RE_LOADED_FLAG,  payload: {page: page, flag: flag}});
// let redux knows these data are currently loading
export const loadMoreCache = (startPage, endPage) => ({ type: LOAD_MORE_CACHE,  payload: {startPage: startPage, endPage: endPage}});