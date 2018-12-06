/**
 * find the data from the cache
 * @param page the page number of the data you want to find out
 * @param cache the cache array
 * @returns {*} the page data or a null
 */
export const getDataFromCache = (page, cache) => {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i].page === page) {
      return cache[i];
    }
  }
  return null;
};

/**
 * create the initial data object
 * @param page
 * @returns {*} the page data
 */
export const createInitialPageData = (page) => {
  let initialPageData = {};
  initialPageData.page = page;
  initialPageData.isLoading = false;
  initialPageData.isRecentlyReLoaded = false;
  initialPageData.attemptTimes = 0;
  initialPageData.data = null;
  return initialPageData;
};

/**
 * calculate how many pages in the back-end
 * @param totalDataNumber the number of total data item
 * @param dataPerPage 12 in this case
 * @returns {number} last page number
 */
export const calcTotalPage = (totalDataNumber, dataPerPage) => {
  return Math.ceil(totalDataNumber / dataPerPage);
};

/**
 * get a random integer within [min, max]
 * @param min
 * @param max
 * @returns {number}
 */
export const generateRandomInteger = (min, max) => {
  if (min > max) {
    let temp = min;

    min = max;
    max = temp;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * remove cache items when the length of cache > max cache size
 * @param cache
 * @param cacheMaxSize
 * @param currentPageNumber
 * @param onlyRemoveBackwardData
 */
export const shrinkCacheIfNeeded = (cache, cacheMaxSize, currentPageNumber, onlyRemoveBackwardData) => {
  while (cache.length > cacheMaxSize) {
    // if we only want to remove the data whose page numbers are smaller than current page
    if (onlyRemoveBackwardData) {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i].page < currentPageNumber) {
          cache.splice(i, 1);
          break;
        }
      }
    } else {
      // in other cases
      // remove the left most page
      // since we are unlikely to touch it
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
