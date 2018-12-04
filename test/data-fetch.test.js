import generateUrlParams from "../src/js/data-fetch/url-params-generator";
import {get} from "../src/js/data-fetch/data-fetch";
import {BACKEND_URL} from "../src/js/constants/data-fetch-constant";

test('fetch the data from backend', async () => {
  let page = 0;
  let dataPerPage = 12;
  let params = generateUrlParams(page, dataPerPage);
  let dataFetched = await get(BACKEND_URL, params);
  expect(dataFetched.length).toBe(12);
  dataFetched.map(dataItem => {
    expect(dataItem).not.toBe(null);
  });
  // the id of first data is 471d4732a9fe198100affbf655e59172
  expect(dataFetched[0].coreData.id).toBe("471d4732a9fe198100affbf655e59172");

});