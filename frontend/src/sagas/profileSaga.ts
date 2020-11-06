import { call, put, debounce } from "redux-saga/effects";
import { PROFILES, setUserProfile } from "../actions/profiles";
import { GetUserProfileCallAction } from "../actions/profiles/interfaces";
import { fetchProfile } from "../api/profiles";
import { NotificationLevel } from "../common/notifications";
import { displayNotification } from "../actions/notifications";

function* handleGetUserProfile(action: GetUserProfileCallAction) {
    const username = action.payload;
    try {
        const userProfile = yield call(fetchProfile, username);
        if (userProfile) {
            yield put(setUserProfile(userProfile));
        }
    } catch (error) {
        yield put(displayNotification("There was an error retrieving your profile.", NotificationLevel.Error));
        console.log(error);
    }
}

export default function* watchAllProfileCall() {
    yield debounce(250, PROFILES.GET_USER_PROFILE_CALL, handleGetUserProfile);
}
