import {
  TOGGLE_DRAWER,
  PAGE_CHANGE,
  INITIAL_LOAD,
  LOAD,
  REMOVE_IS_RECENTLY_RE_LOADED,
  LOAD_MORE_CACHE
} from "../constants/action-types";
import { get } from "../data-fetch/data-fetch";
import {BACKEND_URL} from "../constants/constant";
import generateUrlParams from "../data-fetch/url-params-generator";

export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});
export const toggleDrawer = (selectedId) => ({type: TOGGLE_DRAWER, payload: selectedId});
export const initialLoad = (page, dataPerPage) => ({ type: INITIAL_LOAD,  payload: get(BACKEND_URL,generateUrlParams(page, dataPerPage))});
export const load = (page, dataPerPage) => ({ type: LOAD,  payload: get(BACKEND_URL,generateUrlParams(page, dataPerPage))});
export const removeIsRecentlyLoadedFlag = (page) => ({ type: REMOVE_IS_RECENTLY_RE_LOADED,  payload: page});
export const loadMoreCache = (startPage, endPage) => ({ type: LOAD_MORE_CACHE,  payload: {startPage: startPage, endPage: endPage}});