import {createAction} from "@reduxjs/toolkit";
// PLANET action types
export const GET_PLANET = '[PLANET] Getting planet...';
export const RESET_PLANET_STATE = '[PLANET] Reset planet state!';
export const GET_PLANET_SUCCESS = '[PLANET] Planet get with success!';

// PLANET actions
export const getPlanet = createAction(GET_PLANET);
export const resetPlanetState = createAction(RESET_PLANET_STATE);
export const getPlanetSuccess = createAction(GET_PLANET_SUCCESS);
