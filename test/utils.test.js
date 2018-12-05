import {DATA_PER_PAGE} from "../src/js/constants/data-fetch-constant";
import {calcTotalPage, createInitialPageData} from "../src/js/utils/utils";

test('calc the correct total page', () => {
  let totalPage1 = calcTotalPage(3024, DATA_PER_PAGE);
  let totalPage2 = calcTotalPage(3025, DATA_PER_PAGE);
  let totalPage3 = calcTotalPage(28, DATA_PER_PAGE);

  expect(totalPage1).toBe(252);
  expect(totalPage2).toBe(253);
  expect(totalPage3).toBe(3);
});

test('create the correct page data object', () => {
  let page = 1;
  let pageData = createInitialPageData(page);
  expect(pageData.page).toBe(page);
  expect(pageData.isLoading).toBeFalsy();
  expect(pageData.data).toBe(null);
});

test('the getDataFromCache function works properly', () => {
  let cache = [];
  for (let page = 1; page < 10; page++) {
    let pageData = createInitialPageData(page);

    cache.push(pageData);
  }
  expect(pageData.page).toBe(page);
  expect(pageData.isLoading).toBeFalsy();
  expect(pageData.data).toBe(null);
});