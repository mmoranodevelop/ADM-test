import {createAction} from "@reduxjs/toolkit";

// UI action types
export const ENABLE_OVERLAY = '[UI] Enable Overlay';
export const DISABLE_OVERLAY = '[UI] Disable Overlay';
export const SET_TOAST = '[UI] setting toast';

// UI actions
export const enableOverlay = createAction(ENABLE_OVERLAY);
export const disableOverlay = createAction(DISABLE_OVERLAY);
export const setToast = createAction(SET_TOAST);
