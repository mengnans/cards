export const getDataFromCache = (page, cache) => {

  for (let i = 0; i < cache.length; i++) {
    if (cache[i].page === page) {
      return cache[i];
    }
  }
  return null;
};

export const createInitialPageData = (page) => {
  let initialPageData = {};
  initialPageData.page = page;
  initialPageData.isLoading = false;
  initialPageData.isRecentlyReLoaded = false;
  initialPageData.attemptTimes = 0;
  initialPageData.data = null;
  return initialPageData;
};

export const calcTotalPage = (totalDataNumber, dataPerPage) => {
  return Math.ceil(totalDataNumber / dataPerPage);
};

export const reLoadedData = (data) => {
  data.isLoading = true;
  data.attemptTimes++;
};

export const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shrinkCacheIfNeeded = (cache, cacheMaxSize, onlyRemoveBackwardData = false, currentPageNumber = 0) => {
  while (cache.length > cacheMaxSize) {
    if (onlyRemoveBackwardData) {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i].page < currentPageNumber) {
          cache.splice(i, 1);
          break;
        }
      }
    } else {
      cache.shift();
    }
  }
};
