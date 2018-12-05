export const BACKEND_URL = "https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets";
export const DATA_PER_PAGE = 12;
export const TICKET_TYPE = "incident";
export const SORT_DIRECTION = "DESC";
export const MAX_CACHE_LENGTH = 8;
export const MAX_RE_LOAD_DISTANCE = 2;
export const RE_LOAD_INTERVAL = 5;

let twelveArray = new Array(DATA_PER_PAGE);
for (let i = 0; i < twelveArray.length; i++) {
  twelveArray[i] = i;
}
export const TWELVE_ARRAY = twelveArray;