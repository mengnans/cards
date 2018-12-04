import mockData from "../data-fetch/mock-data";
import {TOGGLE_DRAWER} from "../actions/constants/action-types";

const initialState = {
  pageData: mockData,
  drawerData: {isOpen: false, id: null, number: null},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, drawerData: action.payload};
    default:
      return state;
  }
};

export default rootReducer;