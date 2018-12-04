import extractData from "../src/js/data-fetch/data-extract";
import mockData from "../src/js/data-fetch/mock-data";

test('extract the mock data', ()=> {
  const id = "471d4732a9fe198100affbf655e59172";
  let extractedData;
  extractedData = extractData(mockData, id);
  expect(extractedData).not.toBe(null);
  expect(extractedData.id).toBe(id);
  expect(extractedData.number).toBe("INC0000040");
  expect(extractedData.drawerListData['made_sla']).toBeFalsy();

});