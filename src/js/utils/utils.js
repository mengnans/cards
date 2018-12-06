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
 * the detail of the data structure is in the README.md
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
 * remove the left-most elements
 * @param cache
 * @param cacheMaxSize
 */
export const shrinkCacheIfNeeded = (cache, cacheMaxSize) => {
  // while the cache exceeds itx maximum size
  while (cache.length > cacheMaxSize) {
    // remove the first element (left-most element)
    cache.shift();
  }
};

/**
 * sort the cache based on its page number
 * @param cache
 */
export const sortTheCache = (cache) => {
  cache.sort((a, b) => {
    return a.page - b.page;
  });
};
