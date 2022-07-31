import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineReducers} from "redux";
import {logger} from "redux-logger";
import appSaga from "./saga";
import {PeopleReducer} from "./reducers/people.reducer";
import {ErrorReducer} from "./reducers/error.reducer";
import {UIReducer} from "./reducers/ui.reducer";
import {PlanetReducer} from "./reducers/planet.reducer";

const appReducer = combineReducers({
    // list of reducers
    people: PeopleReducer,
    error: ErrorReducer,
    ui: UIReducer,
    planet: PlanetReducer
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

// export and create store
export const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

sagaMiddleware.run(appSaga);
