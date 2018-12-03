import {ADD_PERSON, REMOVE_PERSON} from "./constants/action-types";

export const addPerson = person => ({type: ADD_PERSON, payload: person});
export const removePerson = () => ({type: REMOVE_PERSON});