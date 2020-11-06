import { call, put, takeEvery } from "redux-saga/effects";
import { setAllUsers, addUser, setUpdatedUser, setCurrentUser, setFamousUsers } from "../actions/users";
import { USERS } from "../actions/users";
import {
    fetchUser,
    fetchAllUsers,
    updateUser,
    deleteUser,
    uploadUserProfilePicture,
    fetchMe,
    fetchFamousUser,
    viewNotifications,
} from "../api/users";
import {
    GetUserCallAction,
    GetAllUsersCallAction,
    UpdateUserCallAction,
    UploadUserProfilePictureCallAction,
    FetchMeCallAction,
    DeleteUserCallAction,
    LogoutUserCallAction,
    getFamousUsersCallAction,
    ViewNotificationsCallAction,
} from "../actions/users/interfaces";
import { displayNotification } from "../actions/notifications";
import { NotificationLevel } from "../common/notifications";
import Image from "../models/image";

function* handleGetUser(action: GetUserCallAction) {
    const id = action.payload;
    try {
        const user = yield call(fetchUser, id);
        if (user) {
            yield put(addUser(user));
        }
    } catch (error) {
        yield put(displayNotification("User not found.", NotificationLevel.Info));
        console.log(error);
    }
}

function* handleGetAllUsers(action: GetAllUsersCallAction) {
    try {
        const users = yield call(fetchAllUsers);
        if (users) {
            yield put(setAllUsers(users));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleUpdateUser(action: UpdateUserCallAction) {
    const user = action.payload;
    try {
        const updatedUser = yield call(updateUser, user);
        if (updatedUser) {
            yield put(setUpdatedUser(updatedUser));
            yield put(displayNotification("Your profile was updated with success.", NotificationLevel.Success));
        }
    } catch (error) {
        yield put(
            displayNotification(
                "There was an error while trying to update your profile informations.",
                NotificationLevel.Error
            )
        );
        console.log(error);
    }
}

function* handleDeleteUser(action: DeleteUserCallAction) {
    try {
        const user = yield call(deleteUser);
        if (user) {
            yield put(setCurrentUser(undefined));
            yield put(displayNotification("Your account was deleted with success.", NotificationLevel.Success));
            localStorage.removeItem("jwt");
        }
    } catch (error) {
        yield put(
            displayNotification("There was an error while trying to delete your account.", NotificationLevel.Error)
        );
        console.log(error);
    }
}

function* handleLogoutUser(action: LogoutUserCallAction) {
    try {
        yield put(setCurrentUser(undefined));
        yield put(displayNotification("Logged out with success.", NotificationLevel.Success));
        localStorage.removeItem("jwt");
    } catch (error) {
        yield put(displayNotification("There was an error logging out your account.", NotificationLevel.Warning));
        console.log(error);
    }
}

function* handleFetchMe(action: FetchMeCallAction) {
    try {
        const user = yield call(fetchMe);
        if (user) {
            yield put(setCurrentUser(user));
        }
    } catch (error) {
        yield put(displayNotification("There was an error retrieving your profile.", NotificationLevel.Error));
        console.log(error);
    }
}

function* handleViewNotifications(action: ViewNotificationsCallAction) {
    try {
        const user = yield call(viewNotifications);
        if (user) {
            yield put(setCurrentUser(user));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleUploadUserProfilePicture(action: UploadUserProfilePictureCallAction) {
    const image = action.payload;
    let uploadedProfilePicture: Image | undefined;
    try {
        uploadedProfilePicture = yield call(uploadUserProfilePicture, image);
        if (uploadedProfilePicture) {
            const user = yield call(fetchMe);
            if (user) {
                yield put(setUpdatedUser(user));
            }
        }
    } catch (error) {
        if (!uploadedProfilePicture) {
            yield put(
                displayNotification("There was an error uploading your profile picture.", NotificationLevel.Error)
            );
        } else {
            yield put(
                displayNotification("There was an error retrieving your new profile picture.", NotificationLevel.Info)
            );
        }
        console.log(error);
    }
}

function* handleGetFamousUsers(action: getFamousUsersCallAction) {
    try {
        const users = yield call(fetchFamousUser);
        if (users) {
            yield put(setFamousUsers(users));
        }
    } catch (error) {
        yield put(displayNotification("There was an error getting famous users.", NotificationLevel.Error));
        console.log(error);
    }
}

export default function* watchAllUsersCall() {
    yield takeEvery(USERS.GET_USER_CALL, handleGetUser);
    yield takeEvery(USERS.GET_ALL_USERS_CALL, handleGetAllUsers);
    yield takeEvery(USERS.UPDATE_USER_CALL, handleUpdateUser);
    yield takeEvery(USERS.DELETE_USER_CALL, handleDeleteUser);
    yield takeEvery(USERS.LOGOUT_USER_CALL, handleLogoutUser);
    yield takeEvery(USERS.FETCH_ME_CALL, handleFetchMe);
    yield takeEvery(USERS.VIEW_NOTIFICATIONS_CALL, handleViewNotifications);
    yield takeEvery(USERS.UPLOAD_USER_PROFILE_PICTURE_CALL, handleUploadUserProfilePicture);
    yield takeEvery(USERS.GET_FAMOUS_USER_CALL, handleGetFamousUsers);
}
