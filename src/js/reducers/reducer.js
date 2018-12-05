import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED,
  LOAD_FULFILLED,
  LOAD_PENDING,
  PAGE_CHANGE,
  RE_LOAD_FULFILLED,
  RE_LOAD_PENDING,
  RE_LOAD_REJECTED,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE, MAX_CACHE_LENGTH} from "../constants/data-fetch-constant";
import {createInitialPageData, getDataFromCache} from "../utils/utils";


const defaultState = {
  currentPageData: createInitialPageData(1),
  totalPage: "?",
  cache: [],
  //selected Id for drawer
  selectedId: null,
};

const rootReducer = (state = defaultState, action) => {

  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, selectedId: action.payload};
    case PAGE_CHANGE: {
      let nextPage = action.payload;
      let cache = [...state.cache];
      let currentPage = state.currentPageData.page;
      let nextPageData = getDataFromCache(nextPage, cache);
      // if next page is not in the cache
      if (!nextPageData) {
        nextPageData = createInitialPageData(nextPage);
      }
      let currentPageDataFromCache = getDataFromCache(currentPage, cache);
      // if current page is not in the cache
      if (!currentPageDataFromCache) {
        cache.push(state.currentPageData);
        if (cache.length > MAX_CACHE_LENGTH) {
          cache.shift();
        }
      }
      return {
        ...state,
        currentPageData: nextPageData,
        cache: cache,
      };
    }

    case INITIAL_LOAD_PENDING: {
      let cache = new Array(5);
      for (let i = 0; i < cache.length; i++) {
        cache[i] = createInitialPageData(i + 1);
      }
      // the first page for current page
      // others for the cache
      let currentPageData = cache.shift();
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
      }
      currentPageData.data = fetchedCurrentPageData;
      currentPageData.isLoading = false;
      totalPage = Math.round(totalItemNumber / DATA_PER_PAGE) + 1;

      return {
        ...state,
        totalPage: totalPage.toString(),
        currentPageData: currentPageData,
        cache: cache
      };
    }

    case LOAD_PENDING: {
      let currentPageData = {...state.currentPageData};
      currentPageData.isLoading = true;
      currentPageData.attemptTimes++;
      return {...state, currentPageData}
    }

    case LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let fetchedDataParams = action.payload.params;
      let fetchedDataPage = fetchedDataParams.page + 1;
      let currentPageData = {...state.currentPageData};
      let cache = [...state.cache];
      if (fetchedDataPage === currentPageData.page) {
        currentPageData.isLoading = false;
        currentPageData.data = fetchedData;
      } else {
        let cachePageData = getDataFromCache(fetchedDataPage, cache);
        // if it's in the cache
        if (cachePageData) {
          cachePageData.isLoading = false;
          cachePageData.data = fetchedData;
        }
      }
      return {...state, currentPageData: currentPageData, cache: cache}
    }


    default:
      return state;
  }
};

export default rootReducer;