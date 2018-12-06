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

export const generateRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shrinkCacheIfNeeded = (cache, cacheMaxSize, currentPageNumber, onlyRemoveBackwardData) => {
  while (cache.length > cacheMaxSize) {
    if (onlyRemoveBackwardData) {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i].page < currentPageNumber) {
          cache.splice(i, 1);
          break;
        }
      }
    } else {
      let leftmostCachePage = currentPageNumber;
      let leftmostCacheIndex = 0;

      for (let i = 0; i < cache.length; i++) {
        if (cache[i].page < leftmostCachePage) {
          leftmostCachePage = cache[i].page;
          leftmostCacheIndex = i;
        }
      }
      cache.splice(leftmostCacheIndex, 1);
    }
  }
};
