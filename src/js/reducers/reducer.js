import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED, PAGE_CHANGE,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const defaultState = {
  currentPageData: null,
  currentPage: 1,
  totalPage: "?",
  forwardCache: [],
  backwardCache: [],
  //selected Id for drawer
  selectedId: null,
};

const rootReducer = (state = defaultState, action) => {

  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, selectedId: action.payload};
    case PAGE_CHANGE: {
      let currentPage = state.currentPage;
      let nextPage = action.payload;
      let backwardCache = [...state.backwardCache];
      let forwardCache = [...state.forwardCache];
      let isForward = false;
      if (nextPage > currentPage) {
        isForward = true;
      }
      // cache the old data
      let isCached = false;
      if (isForward) {
        for (let i = 0; i < backwardCache.length; i++) {
          // current page is already cached
          if (backwardCache[i].page === currentPage) {
            isCached = true;
            break;
          }
        }
        // if the data is not cached
        if (!isCached) {
          let newCache = {};
          newCache.data = state.currentPageData;
          newCache.isLoading = false;
          newCache.page = currentPage;
          backwardCache.push(newCache);
        }
      } else {
        for (let i = 0; i < forwardCache.length; i++) {
          // current page is already cached
          if (forwardCache[i].page === currentPage) {
            isCached = true;
            break;
          }
        }
        // if the data is not cached
        if (!isCached) {
          let newCache = {};
          newCache.data = state.currentPageData;
          newCache.isLoading = false;
          newCache.page = currentPage;
          forwardCache.push(newCache);
        }
      }
      // get the new data from cache
      let nextPageData = null;
      if (isForward) {
        for (let i = 0; i < forwardCache.length; i++) {
          // current page is already cached
          if (forwardCache[i].page === nextPage) {
            nextPageData = forwardCache[i].data;
            break;
          }
        }
      } else {
        for (let i = 0; i < backwardCache.length; i++) {
          // current page is already cached
          if (backwardCache[i].page === nextPage) {
            nextPageData = backwardCache[i].data;
            break;
          }
        }
      }
      return {
        ...state,
        currentPage: nextPage,
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
      let pageData = fetchedData.slice(0, DATA_PER_PAGE);
      let forwardData = fetchedData.slice(DATA_PER_PAGE);
      let forwardCache = [];
      for (let i = 0; i < forwardData.length; i++) {
        forwardCache[i] = {};
        forwardCache[i].page = i + 2;
        forwardCache[i].data = forwardData.slice(i * DATA_PER_PAGE, (i + 1) * DATA_PER_PAGE);
        forwardCache[i].isLoading = false;
      }
      totalPage = Math.round(totalItemNumber / DATA_PER_PAGE) + 1;
      return {
        ...state,
        totalPage: totalPage.toString(),
        currentPage: 1,
        currentPageData: pageData,
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