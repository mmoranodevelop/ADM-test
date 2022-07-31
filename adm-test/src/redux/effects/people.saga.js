import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {disableOverlay, enableOverlay, setToast} from "../actions/ui.actions";
import {apiError} from "../actions/error.actions";
import {getPeopleList} from "../../services/peopleService";
import {GET_PEOPLES, getPeoplesSuccess} from "../actions/people.actions";


/**
 * getPeoplesEffect
 * @param {*} param0
 */
function* getPeoplesEffect({payload}) {
    try {
        yield put(enableOverlay('Loading Peoples...'));
        const customersList = yield call(getPeopleList, payload.page);
        yield put(getPeoplesSuccess(customersList));
        yield put(disableOverlay());
        yield put(setToast({
            severity: 'success',
            summary: 'People success!',
            detail: 'People list retrieved with success!',
            life: 1500
        }));
    } catch (err) {
        console.log('error:', err);
        yield put(apiError(err));
        yield put(disableOverlay());
        yield put(setToast({
            severity: 'error',
            summary: 'Error From Server',
            detail: 'Peoples are all dead right now! Retry later...',
            life: 1500
        }));
    }
}

/**
 * Watchers
 */
export function* watchGetPeoples() {
    yield takeEvery(GET_PEOPLES, getPeoplesEffect);
}

function* peopleSaga() {
    yield all([
        fork(watchGetPeoples),
    ]);
}

export default peopleSaga;
