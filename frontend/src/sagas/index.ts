import { all } from "redux-saga/effects";

import usersSaga from "./usersSaga";
import profileSaga from "./profileSaga";
import feedSaga from "./feedSaga";

export default function* rootSaga() {
    yield all([usersSaga(), profileSaga(), feedSaga()]);
}
