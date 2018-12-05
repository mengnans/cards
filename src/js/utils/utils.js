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