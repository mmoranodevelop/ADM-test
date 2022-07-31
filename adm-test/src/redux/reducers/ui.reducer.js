import {DISABLE_OVERLAY, ENABLE_OVERLAY, SET_TOAST} from "../actions/ui.actions";


const initialUIState = {
    overlay: {loading: false, message: null},
    toast: {severity: null, summary: null, detail: null, life: null}
};

export const UIReducer = (state = initialUIState, action) => {
    switch (action.type) {
        case ENABLE_OVERLAY:
            return {...state, overlay: {loading: true, message: action.payload}};
        case DISABLE_OVERLAY:
            return {...state, overlay: {loading: false, message: null}};
        case SET_TOAST:
            return {...state, toast: action.payload}
        default:
            return state;
    }
}
