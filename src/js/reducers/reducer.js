import {TOGGLE_DRAWER} from "../constants/action-types";
import {initialLoad} from "../actions/actions";

const defaultState = {
  isLoading: true,
  pageData: null,
  cache: [],
  currentPage: '?',
  totalPage: '?',
  drawerData: {isOpen: false, id: null, number: null},
};

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, drawerData: action.payload};
    case initialLoad.pending.toString():
      return {...state, isLoading: true };
    case initialLoad.fulfilled.toString():
      let fetchedData = action.payload;
      let pageData = fetchedData.slice(0,12);
      return {...state, isLoading: false, currentPage: 0, pageData: pageData, cache: [...state.cache, fetchedData]};
    case initialLoad.rejected.toString():
      return state;
    default:
      return state;
  }
};

export default rootReducer;