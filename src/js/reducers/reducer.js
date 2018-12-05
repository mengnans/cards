import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED,
  LOAD_FULFILLED,
  LOAD_PENDING, LOAD_REJECTED,
  PAGE_CHANGE, REMOVE_IS_RECENTLY_RE_LOADED,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE, MAX_CACHE_LENGTH, MAX_RE_LOAD_DISTANCE} from "../constants/data-fetch-constant";
import {calcTotalPage, createInitialPageData, getDataFromCache, reLoadedData} from "../utils/utils";


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
  console.log(action.type);

  switch (action.type) {
    case TOGGLE_DRAWER:{
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

    case REMOVE_IS_RECENTLY_RE_LOADED: {
      let cache = [... state.cache];
      let currentPageData = {...state.currentPageData};
      let pageToRemove = action.payload;
      let pageData;
      pageData = getDataFromCache(pageToRemove, cache);
      if(pageData){
        pageData.isRecentlyReLoaded = false;
      } else if(pageToRemove === currentPageData.page) {
        currentPageData.isRecentlyReLoaded = false;
      }
      return {...state, currentPageData: currentPageData, cache: cache}
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
          reLoadedData(cache[i]);
        }
        currentPageData = {...state.currentPageData};
        reLoadedData(currentPageData);
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
      }
      currentPageData.data = fetchedCurrentPageData;
      currentPageData.isLoading = false;
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
      }
      currentPageData.isLoading = false;
      return {...state, currentPageData: currentPageData, cache: cache}
    }

    case LOAD_PENDING: {
      let currentPageData = {...state.currentPageData};
      currentPageData.isLoading = true;
      currentPageData.attemptTimes++;
      if(currentPageData.attemptTimes > 1){
        currentPageData.isRecentlyReLoaded = true;
      }
      return {...state, currentPageData: currentPageData}
    }

    case LOAD_FULFILLED: {
      let fetchedData = action.payload.data;
      let totalItemNumber = action.payload.totalItemNumber;
      let fetchedDataParams = action.payload.params;
      let fetchedDataPage = fetchedDataParams.page + 1;
      let currentPageData = {...state.currentPageData};
      let cache = [...state.cache];
      let totalPage;
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
      totalPage = calcTotalPage(totalItemNumber, DATA_PER_PAGE);
      return {...state, currentPageData: currentPageData, cache: cache, totalPage: totalPage.toString()}
    }

    case LOAD_REJECTED: {
      let currentPageData = {...state.currentPageData};
      let currentPage = currentPageData.page;
      let fetchedDataParams = action.payload;
      let fetchedDataPage = fetchedDataParams.page + 1;
      let cache = [...state.cache];
      // if it's the current page
      if (fetchedDataPage === currentPage) {
        // set isLoading is false
        // let the program know the loading is over
        // so when program realizes the loading is over but no data is retrieved
        // it will load the data again
        currentPageData.isLoading = false;
      } else {
        let cachedPageData = getDataFromCache(fetchedDataPage, cache);
        if (cachedPageData) {
          cachedPageData.isLoading = false;
        }
      }
      return {...state, currentPageData: currentPageData, cache: cache}
    }

    default:
      return state;
  }
};

export default appReducer;