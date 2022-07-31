import {GET_PEOPLES_SUCCESS, RESET_PEOPLE_STATE} from "../actions/people.actions";

const initialPeopleState = {peopleList: [], next: null, previous: null, count: 0};

export const PeopleReducer = (state = initialPeopleState, action) => {
    switch (action.type) {
        case GET_PEOPLES_SUCCESS:
            return {...state, peopleList: [...state.peopleList, ...action.payload.results],
                next: action.payload.next,
                previous: action.payload.previous,
                count: action.payload.count};
        case RESET_PEOPLE_STATE:
            return initialPeopleState;
        default:
            return state;
    }
}
