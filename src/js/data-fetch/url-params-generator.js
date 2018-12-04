import {SORT_DIRECTION, TICKET_TYPE} from "../constants/data-fetch-constant";

const generateUrlParams = (page, perPage) => {
  let params = {};
  if (page < 0) {
    console.error("Error page number");
    page = 0;
  }
  params['ticketType'] = TICKET_TYPE;
  params['sortDirection'] = SORT_DIRECTION;
  params['page'] = page;
  params['perPage'] = perPage;
  return params;
};

export default generateUrlParams;