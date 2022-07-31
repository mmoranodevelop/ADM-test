import {createAction} from "@reduxjs/toolkit";
// PEOPLE action types
export const GET_PEOPLES = '[PEOPLE] Getting peoples...';
export const RESET_PEOPLE_STATE = '[PEOPLE] Reset people state!';
export const GET_PEOPLES_SUCCESS = '[PEOPLE] People list get with success!';

// PEOPLE actions
export const getPeoples = createAction(GET_PEOPLES);
export const resetPeopleState = createAction(RESET_PEOPLE_STATE);
export const getPeoplesSuccess = createAction(GET_PEOPLES_SUCCESS);
