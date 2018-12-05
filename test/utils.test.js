import {BACKEND_URL, DATA_PER_PAGE} from "../src/js/constants/data-fetch-constant";
import {calcTotalPage} from "../src/js/utils/utils";

test('calc the correct total page', () => {
  let totalPage1 = calcTotalPage(3024, DATA_PER_PAGE);
  let totalPage2 = calcTotalPage(3025, DATA_PER_PAGE);
  let totalPage3 = calcTotalPage(28, DATA_PER_PAGE);
  expect(totalPage1).toBe(252);
  expect(totalPage2).toBe(253);
  expect(totalPage3).toBe(3);
});