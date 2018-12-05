import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED, PAGE_CHANGE,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const defaultState = {
  currentPageData: {isLoading: true, page: 1, data: null},
  totalPage: "?",
  forwardCache: [],
  backwardCache: [],
  //selected Id for drawer
  selectedId: null,
};

const getDataFromCache = (page, cache) => {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i].page === page) {
        return cache[i];
      }
    }
    return null;
  }
;

const rootReducer = (state = defaultState, action) => {

  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, selectedId: action.payload};
    case PAGE_CHANGE: {
      let currentPage = state.currentPageData.page;
      let nextPage = action.payload;
      let backwardCache = [...state.backwardCache];
      let forwardCache = [...state.forwardCache];
      let combinedCache = [...backwardCache, ...forwardCache]
      let isForward = false;
      if (nextPage > currentPage) {
        isForward = true;
      }
      let nextPageData = getDataFromCache(nextPage, combinedCache);
      if (nextPageData) {

      } else {
        //TODO: dispatch a get action to load more data
        nextPageData = {};
        nextPageData.page = nextPage;
        nextPageData.data = null;
        nextPageData.isLoading = true;
      }

      let currentPageDataFromCache = getDataFromCache(currentPage, combinedCache);
      // if it's not in the cache
      if (!currentPageDataFromCache) {
        let cacheItem = {};
        cacheItem.page = currentPage;
        cacheItem.data = state.currentPageData;
        cacheItem.isLoding = false;
      }
      return {
        ...state,
        currentPageData: nextPageData,
        forwardCache: forwardCache,
        backwardCache: backwardCache
      };
    }
    case INITIAL_LOAD_PENDING:
      // do nothing
      return state;
    case INITIAL_LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let totalItemNumber = action.payload.totalItemNumber;
      let totalPage;
      let currentPageData = {}
      let fetchedCurrentPageData = fetchedData.slice(0, DATA_PER_PAGE);
      let fetchedForwardData = fetchedData.slice(DATA_PER_PAGE);
      let forwardCache = [];
      for (let i = 0; i < fetchedForwardData.length; i++) {
        forwardCache[i] = {};
        forwardCache[i].page = i + 2;
        forwardCache[i].data = fetchedForwardData.slice(i * DATA_PER_PAGE, (i + 1) * DATA_PER_PAGE);
        forwardCache[i].isLoading = false;
      }
      currentPageData.page = 1;
      currentPageData.data = fetchedCurrentPageData;
      currentPageData.isLoading = false;
      totalPage = Math.round(totalItemNumber / DATA_PER_PAGE) + 1;
      return {
        ...state,
        totalPage: totalPage.toString(),
        currentPageData: currentPageData,
        forwardCache: forwardCache
      };
    }
    case INITIAL_LOAD_REJECTED:
      // return default data
      return state;
    default:
      return state;
  }
};

export default rootReducer;