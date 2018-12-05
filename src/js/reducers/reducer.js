import {
  INITIAL_LOAD_FULFILLED,
  INITIAL_LOAD_PENDING,
  INITIAL_LOAD_REJECTED, PAGE_CHANGE, RE_LOAD_FULFILLED, RE_LOAD_PENDING, RE_LOAD_REJECTED,
  TOGGLE_DRAWER
} from "../constants/action-types";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const getDataFromCache = (page, cache) => {

  for (let i = 0; i < cache.length; i++) {
    if (cache[i].page === page) {
      return cache[i];
    }
  }
  return null;
};

const createInitialPageData = (page) => {
  let initialPageData = {};
  initialPageData.page = page;
  initialPageData.isLoading = true;
  initialPageData.reconnectTimes = 0;
  initialPageData.data = null;
  return initialPageData;
};

// return false if a data has been re-connected more than three times
const addReconnectTimes = (pageDataArray, startPage, endPage) => {
  for (let i = 0; i < pageDataArray.length; i++) {
    let page = pageDataArray[i].page;
    if (page <= endPage && page >= startPage) {
      pageDataArray[i].reconnectTimes++;
      if (pageDataArray[i].reconnectTimes > 3) {
        return false;
      }
    }
  }
  return true;
};

const defaultState = {
  currentPageData: createInitialPageData(1),
  totalPage: "?",
  cache: [],
  reLoadList: [],
  //selected Id for drawer
  selectedId: null,
};

const rootReducer = (state = defaultState, action) => {

  console.log(action.type);

  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, selectedId: action.payload};
    case PAGE_CHANGE: {
      let currentPage = state.currentPageData.page;
      let nextPage = action.payload;
      let cache = [...state.cache];
      let isForward = false;
      if (nextPage > currentPage) {
        isForward = true;
      }
      let nextPageData = getDataFromCache(nextPage, cache);
      if (nextPageData) {

      } else {
        //TODO: dispatch a get action to load more data
        nextPageData = createInitialPageData(nextPage);
      }

      let currentPageDataFromCache = getDataFromCache(currentPage, cache);
      // if it's not in the cache
      if (!currentPageDataFromCache) {
        cache.push(state.currentPageData)
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
    case INITIAL_LOAD_REJECTED:
    case RE_LOAD_REJECTED: {
      let reLoadList = [...state.reLoadList];
      let reLoadItem = {};
      let params = action.payload;
      let reLoadStartPage;
      let reLoadEndPage;
      reLoadItem.page = params.page;
      reLoadItem.perPage = params.perPage;
      reLoadStartPage = reLoadItem.page * (reLoadItem.perPage / DATA_PER_PAGE);
      reLoadEndPage = reLoadItem.page + (reLoadItem.perPage / DATA_PER_PAGE);
      let cache = [...state.cache];
      let currentPageDataArray = [{...state.currentPageData}];
      let reLoadFlag = true;
      reLoadFlag = (reLoadFlag && addReconnectTimes(cache, reLoadStartPage, reLoadEndPage));
      reLoadFlag = (reLoadFlag && addReconnectTimes(currentPageDataArray, reLoadStartPage, reLoadEndPage));
      if (reLoadFlag) {
        reLoadList.push(reLoadItem);
        return {
          ...state,
          reLoadList: reLoadList,
          cache: cache,
          currentPageData: currentPageDataArray[0],
        };
      } else {
        console.log("max re-connect time reached, failed to fetch data");
        return state;
      }
    }
    case RE_LOAD_PENDING: {
      return {
        ...state,
        reLoadList: [],
      };
    }
    case RE_LOAD_FULFILLED: {
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

    default:
      return state;
  }
};

export default rootReducer;