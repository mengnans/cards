import {
  TOGGLE_DRAWER,
  PAGE_CHANGE,
  INITIAL_LOAD,
  LOAD,
  LOAD_MORE_CACHE, SET_RECENTLY_RE_LOADED_FLAG
} from "../constants/action-types";
import {get} from "../data-fetch/data-fetch";
import {BACKEND_URL} from "../constants/constant";
import generateUrlParams from "../data-fetch/url-params-generator";

/**
 * change the page number
 * @param pageNumber the new page number
 * @returns {{type: string, payload: *}}
 */
export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});

/**
 * toggle the drawer
 * @param selectedId the selected card id for the drawer, and if null
 * is provided, close the drawer
 * @returns {{type: string, payload: *}}
 */
export const toggleDrawer = (selectedId) => ({type: TOGGLE_DRAWER, payload: selectedId});

/**
 * initial load 5 data, one for current page, four for the cache
 * @param page
 * @param dataPerPage
 * @returns {{type: string, payload: Promise<any>}}
 */
export const initialLoad = (page, dataPerPage) => ({
  type: INITIAL_LOAD,
  payload: get(BACKEND_URL, generateUrlParams(page, dataPerPage))
});

/**
 * load single or multiple data
 * @param page
 * @param dataPerPage
 * @returns {{type: string, payload: Promise<any>}}
 */
export const load = (page, dataPerPage) => ({
  type: LOAD,
  payload: get(BACKEND_URL, generateUrlParams(page, dataPerPage))
});

/**
 * let redux know this data has been reloaded recently or not
 * @param page the page to set
 * @param flag true or false
 * @returns {{type: string, payload: {page: *, flag: *}}}
 */
export const setRecentlyReloadedFlag = (page, flag) => ({
  type: SET_RECENTLY_RE_LOADED_FLAG,
  payload: {page: page, flag: flag}
});

/**
 * let redux know we are loading these data
 * @param startPage
 * @param endPage
 * @returns {{type: string, payload: {startPage: *, endPage: *}}}
 */
export const loadMoreCache = (startPage, endPage) => ({
  type: LOAD_MORE_CACHE,
  payload: {startPage: startPage, endPage: endPage}
});
