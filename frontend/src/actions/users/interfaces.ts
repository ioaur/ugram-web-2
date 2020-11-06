import { BaseAction } from "../../common";

import UpdateUserDto from "../../api/users/dto/updateUser.dto";
import User, { CurrentUser } from "../../models/user";
import CreateImageDto from "../../api/images/dto/createImage.dto";

export interface UpdateUserCallAction extends BaseAction {
    payload: UpdateUserDto;
}

export interface DeleteUserCallAction extends BaseAction {}

export interface LogoutUserCallAction extends BaseAction {}

export interface SetUserAction extends BaseAction {
    payload: User;
}

export interface SetAllUsersAction extends BaseAction {
    payload: User[];
}

export interface GetUserCallAction extends BaseAction {
    payload: string;
}

export interface UploadUserProfilePictureCallAction extends BaseAction {
    payload: CreateImageDto;
}

export interface GetAllUsersCallAction extends BaseAction {
    payload: string;
}

export interface SetUpdatedUserAction extends BaseAction {
    payload: User;
}

export interface FetchMeCallAction extends BaseAction {}

export interface ViewNotificationsCallAction extends BaseAction {}

export interface SetCurrentUserAction extends BaseAction {
    payload: CurrentUser | undefined;
}

export interface getFamousUsersCallAction extends BaseAction {}

export interface setFamousUsersAction extends BaseAction {
    payload: User[];
}
