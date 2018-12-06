// the url of the back-end
export const BACKEND_URL = "https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets";
// api token
export const API_TOKEN = "eyJhbGciOiJSUzUxMiIsInppcCI6IkRFRiJ9.eNqUkt1qg0AQhd9lrqU0aiB41a2OsmhcWddKKUWMbotQV_GHFsR37yZ3LSWmt2e-MzMczgLjfAIH3oZOTVLVkxwnMKCc60aqSurJpzxpoRpkOckanN3etg7mYW9au3vbgF4ObTOOTadGcF4WUGV7NnEkXnEkSULjQLv7odPg1EgNLetq_OSIK-gTFgKPSUQEXuNdbRBY5IyHfsTyzdWCuiGKImUZdzHdxGMmqE9dIiiLr8GC0yBAfvsf1MNYUPG8CfoUI--mKC74P4PYxMKY5RF6AT6SdPs6z6K_Qn014H3o5v7cCCCCF1mKHLQqv_pLgWzbsizT0kJbNh-_2vdQVpVU0zzIu6prYf0GAAD__w.hA1UxpMEszy7oIY-DJWeOk9iuaShq0GMx1V2LROfmTX6Goi1VYwYvnNLkPke_19-Ianku9e9pwF7hJNgkS8szOl4w_12x3UbDRXzPw7cRMmbDhlyRDXM-q8l7YGtVEBgn7t4yDjgdKnK5tB7ayDvb1tbE6IatvVW0Z42XSAchfQ";
// data per page
export const DATA_PER_PAGE = 12;
// the type of the ticket
export const TICKET_TYPE = "incident";
// the sorting direction
export const SORT_DIRECTION = "DESC";
// the maximum size of the cache
export const MAX_CACHE_LENGTH = 8;
// initial load 5 page data
// the first one for current page
// other four for the cache
export const INITIAL_LOAD_NUMBER = 5;
// if the forward cache is smaller than this threshold
// load more data
export const FORWARD_CACHE_THRESHOLD = 2;
// the interval between each re loads
export const RE_LOAD_INTERVAL = 15;
let twelveArray = new Array(DATA_PER_PAGE);
for (let i = 0; i < twelveArray.length; i++) {
  twelveArray[i] = i;
}
// an array contains 1 to 12
export const TWELVE_ARRAY = twelveArray;