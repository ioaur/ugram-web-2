import Profile from "../../models/profile";
import { BaseAction } from "../../common";
import Image from "../../models/image";

export interface SetUserProfileAction extends BaseAction {
    payload: Profile;
}

export interface GetUserProfileCallAction extends BaseAction {
    payload: string;
}

export interface SetProfileImageAction extends BaseAction {
    payload: {
        id: string;
        image: Image;
    };
}
