/* eslint-disable indent */
/* eslint-disable no-console */
import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED,
  LOAD_FULFILLED, LOAD_MORE_CACHE,
  LOAD_PENDING, LOAD_REJECTED,
  PAGE_CHANGE, SET_RECENTLY_RE_LOADED_FLAG,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE, MAX_CACHE_LENGTH} from "../constants/constant";
import {
  calcTotalPage,
  createInitialPageData,
  getDataFromCache,
  shrinkCacheIfNeeded
} from "../utils/utils";

/**
 * the default state
 */
const defaultState = {
  // default current page data
  currentPageData: createInitialPageData(1),
  // default total page is ?, since we ain't sure how many pages in total
  totalPage: "?",
  // default empty cache for the system
  cache: [],
  // default null selected Id for the drawer
  selectedId: null,
};

const appReducer = (state = defaultState, action) => {

  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {...state, selectedId: action.payload};
    }

    case PAGE_CHANGE: {
      let nextPage = action.payload;
      let cache = [...state.cache];
      let currentPage = state.currentPageData.page;
      let nextPageData;
      let currentPageDataFromCache;

      // get next page data from cache
      nextPageData = getDataFromCache(nextPage, cache);
      // if next page is not in the cache
      if (!nextPageData) {
        // create a new next page data object
        nextPageData = createInitialPageData(nextPage);
      } else {
        // remove this data from cache
        // since it will be saved in current page
        for (let i = 0; i < cache.length; i++) {
          if (cache[i].page === nextPage) {
            cache.splice(i, 1);
            break;
          }
        }
      }
      // get current page data from cache
      currentPageDataFromCache = getDataFromCache(currentPage, cache);
      // if current page data is not in the cache
      if (!currentPageDataFromCache) {
        cache.push(state.currentPageData);
        // remove the leftmost elements if needed
        shrinkCacheIfNeeded(cache, MAX_CACHE_LENGTH, currentPage, false);
      }
      return {
        ...state,
        currentPageData: nextPageData,
        cache: cache,
      };
    }

    case SET_RECENTLY_RE_LOADED_FLAG: {
      let cache = [...state.cache];
      let currentPageData = {...state.currentPageData};
      let {page, flag} = action.payload;
      let pageDataFromCache;

      pageDataFromCache = getDataFromCache(page, cache);
      // if it's in the cache
      if (pageDataFromCache) {
        // set the isRecentlyReloaded flag to this page data
        pageDataFromCache.isRecentlyReLoaded = flag;
      }
      // else if it's the current page
      else if (page === currentPageData.page) {
        // set the isRecentlyReloaded flag to this page data
        currentPageData.isRecentlyReLoaded = flag;
      }
      return {...state, currentPageData: currentPageData, cache: cache};
    }

    case INITIAL_LOAD_PENDING: {
      let cache = [...state.cache];
      let currentPageData;

      // if it's the first time
      if (cache.length === 0) {
        cache = new Array(5);
        for (let i = 0; i < cache.length; i++) {
          // create initial data object
          cache[i] = createInitialPageData(i + 1);
          // let redux know these data are loading now
          cache[i].isLoading = true;
        }
        // the first page for the current page
        // others for the cache
        currentPageData = cache.shift();
      }
      // if it's not the first time
      else {
        for (let i = 0; i < cache.length; i++) {
          // let redux know these data are loading now
          cache[i].isLoading = true;
        }
        currentPageData = {...state.currentPageData};
        // let redux know these data are loading now
        currentPageData.isLoading = true;
      }
      return {...state, currentPageData: currentPageData, cache: cache};
    }

    case INITIAL_LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let totalItemNumber = action.payload.totalItemNumber;
      let totalPage;
      let currentPageData = {...state.currentPageData};
      let fetchedCurrentPageData = fetchedData.slice(0, DATA_PER_PAGE);
      let fetchedForwardData = fetchedData.slice(DATA_PER_PAGE);
      let cache = [...state.cache];


      for (let i = 0; i < cache.length; i++) {
        // set the data
        cache[i].data = fetchedForwardData.slice(i * DATA_PER_PAGE, (i + 1) * DATA_PER_PAGE);
        // let redux know the loading of these data is over
        cache[i].isLoading = false;
        // set the attemptTimes
        cache[i].attemptTimes++;
      }
      // set the data
      currentPageData.data = fetchedCurrentPageData;
      // let redux know the loading of these data is over
      currentPageData.isLoading = false;
      // set the attemptTimes
      currentPageData.attemptTimes++;

      // calculate the total page
      totalPage = calcTotalPage(totalItemNumber, DATA_PER_PAGE);

      return {
        ...state,
        totalPage: totalPage.toString(),
        currentPageData: currentPageData,
        cache: cache
      };
    }

    case INITIAL_LOAD_REJECTED: {
      let cache = [...state.cache];
      let currentPageData = {...state.currentPageData};

      // let redux know the loading of these data are over
      for (let i = 0; i < cache.length; i++) {
        cache[i].isLoading = false;
        cache[i].attemptTimes++;
      }
      currentPageData.isLoading = false;
      currentPageData.attemptTimes++;
      return {...state, currentPageData: currentPageData, cache: cache};
    }

    case LOAD_PENDING: {
      let currentPageData = {...state.currentPageData};
      // in my design, there are two ways of load
      // 1. load the current page
      // 2. load other caches
      // It only load the current page when current page data is empty
      if(!currentPageData.data){
        // let redux know we are loading the current page
        currentPageData.isLoading = true;
      }
      return {...state, currentPageData: currentPageData};
    }

    case LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let totalItemNumber = action.payload.totalItemNumber;
      let fetchedDataParams = action.payload.params;
      let startPage, endPage;
      let paramPage = fetchedDataParams.page;
      let pageLoadedNumber = fetchedDataParams.perPage / DATA_PER_PAGE;
      let currentPageData = {...state.currentPageData};
      let cache = [...state.cache];
      let totalPage;

      // calc the numbers of the first and the last page loaded
      startPage = paramPage * pageLoadedNumber + 1;
      endPage = startPage + pageLoadedNumber - 1;

      // put these data into current page or cache
      for (let i = startPage; i <= endPage; i++) {
        let singlePageData = fetchedData.slice((i - startPage) * DATA_PER_PAGE, (i - startPage + 1) * DATA_PER_PAGE);
        if (i === currentPageData.page) {
          currentPageData.isLoading = false;
          currentPageData.data = singlePageData;
          currentPageData.attemptTimes++;
        } else {
          let cachePageData = getDataFromCache(i, cache);
          // if it's in the cache
          if (cachePageData) {
            cachePageData.isLoading = false;
            cachePageData.data = singlePageData;
            cachePageData.attemptTimes++;
          }
        }
      }

      // calc the total page
      totalPage = calcTotalPage(totalItemNumber, DATA_PER_PAGE);
      return {...state, currentPageData: currentPageData, cache: cache, totalPage: totalPage.toString()};

    }

    case LOAD_REJECTED: {
      let currentPageData = {...state.currentPageData};
      let fetchedDataParams = action.payload;
      let fetchedDataPage = fetchedDataParams.page + 1;
      let paramPage = fetchedDataParams.page;
      let pageLoadedNumber = fetchedDataParams.perPage / DATA_PER_PAGE;
      let cache = [...state.cache];
      let startPage, endPage;

      startPage = paramPage * pageLoadedNumber + 1;
      endPage = startPage + pageLoadedNumber - 1;

      // let redux know loading of these data is over (failed)
      for (let i = startPage; i <= endPage; i++) {
        // if it's the current page
        if (fetchedDataPage === i) {
          // set isLoading is false
          // let the program know the loading is over
          // so when program realizes the loading is over but no data is retrieved
          // it will load the data again
          currentPageData.isLoading = false;
          currentPageData.attemptTimes++;
        } else {
          let cachedPageData = getDataFromCache(i, cache);
          if (cachedPageData) {
            cachedPageData.isLoading = false;
            cachedPageData.attemptTimes++;
          }
        }
      }

      return {...state, currentPageData: currentPageData, cache: cache};
    }

    case LOAD_MORE_CACHE: {
      let {startPage, endPage} = action.payload;
      let cache = [...state.cache];
      let currentPageData = {...state.currentPageData};
      let currentPageNumber = currentPageData.page;

      // let redux know we are loading these cache data
      for (let i = startPage; i <= endPage; i++) {
        let pageData = createInitialPageData(i);
        pageData.isLoading = true;
        cache.push(pageData);
      }
      // remove backward (left) elements
      shrinkCacheIfNeeded(cache, MAX_CACHE_LENGTH, currentPageNumber, true);

      return {...state, cache: cache};
    }

    default:
      return state;
  }
};

export default appReducer;