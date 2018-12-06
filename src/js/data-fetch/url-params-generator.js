/* eslint-disable no-console */
import {SORT_DIRECTION, TICKET_TYPE} from "../constants/constant";

// generate the url parameters for data fetching
const generateUrlParams = (page, perPage) => {
  let params = {};
  if (page < 0) {
    console.log("Invalid page number");
    page = 0;
  }
  params["ticketType"] = TICKET_TYPE;
  params["sortDirection"] = SORT_DIRECTION;
  params["page"] = page;
  params["perPage"] = perPage;
  return params;
};

export default generateUrlParams;