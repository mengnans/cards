export const BACKEND_URL = "https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets";
export const DATA_PER_PAGE = 12;
export const PAGE_LOAD_PER_TIME = 4;
export const TICKET_TYPE = "incident";
export const SORT_DIRECTION = "DESC";
export const MAX_CACHE_LENGTH = 8;
export const MAX_RE_LOAD_DISTANCE = 2;
let twelweArray = new Array(DATA_PER_PAGE);
for (let i = 0; i < twelweArray.length; i++) {
  twelweArray[i] = i;
}
export const TWELWE_ARRAY = twelweArray;