import {createAction} from "@reduxjs/toolkit";

// Errors action types
export const API_ERROR = '[error] New api error';

// Errors actions
export const apiError = createAction(API_ERROR);

