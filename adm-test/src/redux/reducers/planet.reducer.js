import {GET_PLANET_SUCCESS, RESET_PLANET_STATE} from "../actions/planet.actions";

const initialPlanetState = {planet: null};

export const PlanetReducer = (state = initialPlanetState, action) => {
    switch (action.type) {
        case GET_PLANET_SUCCESS:
            return {...state, planet: action.payload};
        case RESET_PLANET_STATE:
            return initialPlanetState;
        default:
            return state;
    }
}
