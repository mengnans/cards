import {TOGGLE_DRAWER, PAGE_CHANGE} from "./constants/action-types";

export const pageChange = pageNumber => ({type: PAGE_CHANGE, payload: pageNumber});
export const toggleDrawer = (drawerData) => ({type: TOGGLE_DRAWER, payload: drawerData});
