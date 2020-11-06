import { put, takeEvery } from "redux-saga/effects";
import { HideNotificationAction, DisplayNotificationAction } from "../actions/notifications/interfaces";
import { NOTIFICATIONS, displayNotification, hideNotification } from "../actions/notifications";

function* handleDisplayNotification(action: DisplayNotificationAction) {
    yield put(displayNotification(action.payload.message, action.payload.level));
}

function* handleHideNotification(action: HideNotificationAction) {
    yield put(hideNotification());
}

export default function* watchAllNotifications() {
    yield takeEvery(NOTIFICATIONS.DISPLAY, handleDisplayNotification);
    yield takeEvery(NOTIFICATIONS.HIDE, handleHideNotification);
}
