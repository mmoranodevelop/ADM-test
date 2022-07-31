import { all } from 'redux-saga/effects'
import peopleSaga from "./effects/people.saga";
import planetSaga from "./effects/planet.saga";

export default function* appSaga() {
    yield all([
        peopleSaga(),
        planetSaga()
    ])
}
