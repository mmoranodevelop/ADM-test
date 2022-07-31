import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {disableOverlay, enableOverlay, setToast} from "../actions/ui.actions";
import {apiError} from "../actions/error.actions";
import {GET_PLANET, getPlanetSuccess} from "../actions/planet.actions";
import {getPlanet} from "../../services/planetService";


/**
 * getPlanetEffect
 * @param {*} param0
 */
function* getPlanetEffect({payload}) {
    try {
        yield put(enableOverlay('Loading Planet...'));
        const planet = yield call(getPlanet, payload.url);
        yield put(getPlanetSuccess(planet));
        yield put(disableOverlay());
        yield put(setToast({
            severity: 'success',
            summary: 'Planet found!',
            detail: 'Welcome!',
            life: 1500
        }));
    } catch (err) {
        console.log('error:', err);
        yield put(apiError(err));
        yield put(disableOverlay());
        yield put(setToast({
            severity: 'error',
            summary: 'Error From Server',
            detail: 'Planet was destoyed! Retry later...',
            life: 5000
        }));
    }
}

/**
 * Watchers
 */
export function* watchGetPlanet() {
    yield takeEvery(GET_PLANET, getPlanetEffect);
}

function* planetSaga() {
    yield all([
        fork(watchGetPlanet),
    ]);
}

export default planetSaga;
