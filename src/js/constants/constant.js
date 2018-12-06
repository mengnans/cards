/**
 * the url of the back-end
 * @type {string}
 */
export const BACKEND_URL = "https://atr-dev-dh.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets";

/**
 * api token
 * @type {string}
 */
export const API_TOKEN = "eyJhbGciOiJSUzUxMiIsInppcCI6IkRFRiJ9.eNqU0t9LhEAQB_D_ZZ4lPM67Op_adJVFz5V1TSJCPN0LKX-gKwXi_956UQ8Raa_f-cyw7MwI_XACE85dU0tRF1L0EjTIhqIUdS5U5U2cVJB3IpOiAHOzM4zNdrc_6PvtjQat6Kqy78um7sF8HKHOqrmJYWSnRxSGJHBVd9s1CspSKDROk_btLAU5ThPKPMenyV_0MpITy8M8jWjMLBwt8oBy4hALcUKDRUxsHHDCHxahQ7CvnoKPoa8ev8i9gCY-tl18h6JljSxO7vGq6ZwR18Vs_e_N0KfIXgX_sY9FxmL_t209afDcNUM7nw4gztI4wgxUKsv8RUj3q6YS8d5-3t61oRsHXQVVVr7-ONzbs7jKmwqmDwAAAP__.KSaEHsfucpA5IZ-RpDq6H0OZ4O8GHUZ_BX5PEXNJrABx3ro6InEXkxKPTdmRRYbpuvQzK7px7EAcRz0xvcXe2T0A1OjEAAU4F-h4TmKAT34cPBCKapIEZfnvytN9rTnEru3Hw2jpHGNeqwFF1Gt75iViwePZRLIpeHFNUC-8UVE";

/**
 * data per page
 * @type {number}
 */
export const DATA_PER_PAGE = 12;

/**
 * the type of the ticket
 * @type {string}
 */
export const TICKET_TYPE = "incident";

/**
 * the sorting direction
 * @type {string}
 */
export const SORT_DIRECTION = "DESC";

/**
 * the maximum size of the cache
 * @type {number}
 */
export const MAX_CACHE_LENGTH = 8;

/**
 * initial load 5 page data
 * the first one for current page
 * other four for the cache
 * @type {number}
 */
export const INITIAL_LOAD_NUMBER = 5;

/**
 * if the forward cache is smaller than this threshold
 * load more data
 * @type {number}
 */
export const FORWARD_CACHE_THRESHOLD = 2;

/**
 * the interval between each re loads
 * @type {number}
 */
export const RE_LOAD_INTERVAL = 15;
let twelveArray = new Array(DATA_PER_PAGE);
for (let i = 0; i < twelveArray.length; i++) {
  twelveArray[i] = i;
}

/**
 * an array contains 1 to 12
 * @type {number[]}
 */
export const TWELVE_ARRAY = twelveArray;