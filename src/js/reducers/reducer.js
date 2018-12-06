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
  reLoadedData,
  shrinkCacheIfNeeded
} from "../utils/utils";


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
      let nextPageData = getDataFromCache(nextPage, cache);
      let currentPageDataFromCache;

      // if next page is not in the cache
      if (!nextPageData) {
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
      currentPageDataFromCache = getDataFromCache(currentPage, cache);
      // if current page data is not in the cache
      if (!currentPageDataFromCache) {
        cache.push(state.currentPageData);
        shrinkCacheIfNeeded(cache, MAX_CACHE_LENGTH);
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
      let pageData;
      pageData = getDataFromCache(page, cache);
      if (pageData) {
        pageData.isRecentlyReLoaded = flag;
      } else if (page === currentPageData.page) {
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
          cache[i] = createInitialPageData(i + 1);
          cache[i].isLoading = true;
        }
        // the first page for current page
        // others for the cache
        currentPageData = cache.shift();
      }
      // if it's not the first time
      else {
        for (let i = 0; i < cache.length; i++) {
          cache[i].isLoading = true;
        }
        currentPageData = {...state.currentPageData};
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
        cache[i].data = fetchedForwardData.slice(i * DATA_PER_PAGE, (i + 1) * DATA_PER_PAGE);
        cache[i].isLoading = false;
        cache[i].attemptTimes ++;
      }
      currentPageData.data = fetchedCurrentPageData;
      currentPageData.isLoading = false;
      currentPageData.attemptTimes ++;
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

      for (let i = 0; i < cache.length; i++) {
        cache[i].isLoading = false;
        cache[i].attemptTimes ++;
      }
      currentPageData.isLoading = false;
      currentPageData.attemptTimes ++;
      return {...state, currentPageData: currentPageData, cache: cache};
    }

    case LOAD_PENDING: {
      let currentPageData = {...state.currentPageData};
      currentPageData.isLoading = true;
      return {...state, currentPageData: currentPageData};
    }

    case LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let totalItemNumber = action.payload.totalItemNumber;
      let fetchedDataParams = action.payload.params;
      // the first page loaded, and the last page loaded
      let startPage, endPage;
      let paramPage = fetchedDataParams.page;
      let pageLoadedNumber = fetchedDataParams.perPage / DATA_PER_PAGE;
      let currentPageData = {...state.currentPageData};
      let cache = [...state.cache];
      let totalPage;

      startPage = paramPage * pageLoadedNumber + 1;
      endPage = startPage + pageLoadedNumber - 1;

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
      for (let i = startPage; i <= endPage; i++) {
        let pageData = createInitialPageData(i);
        pageData.isLoading = true;
        cache.push(pageData);
      }
      shrinkCacheIfNeeded(cache, MAX_CACHE_LENGTH, true, currentPageNumber);

      return {...state, cache: cache};
    }

    default:
      return state;
  }
};

export default appReducer;