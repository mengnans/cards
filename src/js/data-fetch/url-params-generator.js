/* eslint-disable no-console */
import {SORT_DIRECTION, TICKET_TYPE} from "../constants/constant";

const generateUrlParams = (page, perPage) => {
  let params = {};
  if (page < 0) {
    // eslint-disable-next-line no-console
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