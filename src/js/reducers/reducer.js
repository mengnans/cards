import {ADD_PERSON, REMOVE_PERSON} from "../actions/constants/action-types";

const initialState = {
  people: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {...state, people: [...state.people, action.payload]};
    case REMOVE_PERSON:
      return initialState;
    default:
      return state;
  }
};

export default rootReducer;