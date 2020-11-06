import User, { CurrentUser } from "../../models/user";
import { BaseAction } from "../../common";
import UpdateUserDto from "../../api/users/dto/updateUser.dto";
import {
    SetUserAction,
    SetAllUsersAction,
    SetUpdatedUserAction,
    GetUserCallAction,
    UpdateUserCallAction,
    UploadUserProfilePictureCallAction,
    SetCurrentUserAction,
    DeleteUserCallAction,
    LogoutUserCallAction,
    getFamousUsersCallAction,
    setFamousUsersAction,
    FetchMeCallAction,
    ViewNotificationsCallAction,
} from "./interfaces";
import CreateImageDto from "../../api/images/dto/createImage.dto";

export const USERS = {
    ADD_USER: "ADD_USER",
    SET_ALL_USERS: "SET_ALL_USERS",
    GET_USER_CALL: "GET_USER_CALL",
    GET_ALL_USERS_CALL: "GET_ALL_USERS_CALL",
    FETCH_ME_CALL: "FETCH_ME_CALL",
    SET_CURRENT_USER: "SET_CURRENT_USER",
    UPDATE_USER_CALL: "UPDATE_USER_CALL",
    DELETE_USER_CALL: "DELETE_USER_CALL",
    LOGOUT_USER_CALL: "LOGOUT_USER_CALL",
    UPLOAD_USER_PROFILE_PICTURE_CALL: "UPLOAD_USER_PROFILE_PICTURE_CALL",
    VIEW_NOTIFICATIONS_CALL: "VIEW_NOTIFICATIONS_CALL",
    SET_UPDATED_USER: "SET_UPDATED_USER",
    GET_FAMOUS_USER_CALL: "GET_FAMOUS_USER_CALL",
    SET_FAMOUS_USER: "SET_FAMOUS_USER",
};

const addUser = (user: User): SetUserAction => ({
    type: USERS.ADD_USER,
    payload: user,
});

const setAllUsers = (users: User[]): SetAllUsersAction => ({
    type: USERS.SET_ALL_USERS,
    payload: users,
});

const getUserCall = (id: string): GetUserCallAction => ({
    type: USERS.GET_USER_CALL,
    payload: id,
});

const getAllUsersCall = (): BaseAction => ({
    type: USERS.GET_ALL_USERS_CALL,
});

const fetchMeCall = (): FetchMeCallAction => ({
    type: USERS.FETCH_ME_CALL,
});

const viewNotificationsCall = (): ViewNotificationsCallAction => ({
    type: USERS.VIEW_NOTIFICATIONS_CALL,
});

const setCurrentUser = (currentUser: CurrentUser | undefined): SetCurrentUserAction => ({
    type: USERS.SET_CURRENT_USER,
    payload: currentUser,
});

const updateUserCall = (user: UpdateUserDto): UpdateUserCallAction => ({
    type: USERS.UPDATE_USER_CALL,
    payload: user,
});

const deleteUserCall = (): DeleteUserCallAction => ({
    type: USERS.DELETE_USER_CALL,
});

const logoutUserCall = (): LogoutUserCallAction => ({
    type: USERS.LOGOUT_USER_CALL,
});

const setUpdatedUser = (user: User): SetUpdatedUserAction => ({
    type: USERS.SET_UPDATED_USER,
    payload: user,
});

const uploadUserProfilePictureCall = (image: CreateImageDto): UploadUserProfilePictureCallAction => ({
    type: USERS.UPLOAD_USER_PROFILE_PICTURE_CALL,
    payload: image,
});

const getFamousUsersCall = (): getFamousUsersCallAction => ({
    type: USERS.GET_FAMOUS_USER_CALL,
});

const setFamousUsers = (users: User[]): setFamousUsersAction => ({
    type: USERS.SET_FAMOUS_USER,
    payload: users,
});

export {
    addUser,
    setAllUsers,
    getUserCall,
    fetchMeCall,
    getAllUsersCall,
    updateUserCall,
    setCurrentUser,
    setUpdatedUser,
    deleteUserCall,
    logoutUserCall,
    uploadUserProfilePictureCall,
    getFamousUsersCall,
    setFamousUsers,
    viewNotificationsCall,
};
