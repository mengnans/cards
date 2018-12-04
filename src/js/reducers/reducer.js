import {TOGGLE_DRAWER} from "../constants/action-types";
import {initialLoad} from "../actions/actions";
import {DATA_PER_PAGE} from "../constants/data-fetch-constant";

const defaultState = {
  isLoading: true,
  pageData: null,
  forwardCache: [],
  backwardCache: [],
  currentPage: '1',
  totalPage: '?',
  selectedId: null,
};

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {...state, selectedId: action.payload};
    case initialLoad.pending.toString():
      return {...state, isLoading: true};
    case initialLoad.fulfilled.toString():
      let fetchedData = action.payload;
      let pageData = fetchedData.slice(0, DATA_PER_PAGE);
      let forwardCache = fetchedData.slice(DATA_PER_PAGE);
      return {...state, isLoading: false, currentPage: 1, pageData: pageData, forwardCache: forwardCache};
    case initialLoad.rejected.toString():
      // return default data
      return state;
    default:
      return state;
  }
};

export default rootReducer;