import {API_ERROR} from "../actions/error.actions";

const initialErrorState = {apiError: null};

export const ErrorReducer = (state = initialErrorState, action) => {
    switch (action.type) {
        case API_ERROR:
            return {...state, apiError: action.payload};
        default:
            return state;
    }
}
