import Profile from "../../models/profile";
import Image from "../../models/image";
import { GetUserProfileCallAction, SetUserProfileAction, SetProfileImageAction } from "./interfaces";

export const PROFILES = {
    GET_USER_PROFILE_CALL: "GET_USER_PROFILE_CALL",
    SET_USER_PROFILE: "SET_USER_PROFILE",
    SET_PROFILE_IMAGE: "SET_PROFILE_IMAGE",
};

const getUserProfileCall = (username: string): GetUserProfileCallAction => ({
    type: PROFILES.GET_USER_PROFILE_CALL,
    payload: username,
});

const setUserProfile = (profile: Profile): SetUserProfileAction => ({
    type: PROFILES.SET_USER_PROFILE,
    payload: profile,
});

const setProfileImage = (id: string, image: Image): SetProfileImageAction => ({
    type: PROFILES.SET_PROFILE_IMAGE,
    payload: {
        id: id,
        image: image,
    },
});

export { getUserProfileCall, setUserProfile, setProfileImage };
