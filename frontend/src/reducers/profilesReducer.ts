import { Reducer } from "redux";
import { BaseAction } from "../common";
import { PROFILES } from "../actions/profiles";
import Profile from "../models/profile";
import { SetProfileImageAction } from "../actions/profiles/interfaces";
import Image from "../models/image";

export interface ProfilesState {
    readonly currentProfile?: Profile;
}

const initialState: ProfilesState = {
    currentProfile: undefined,
};

const profilesReducer: Reducer<ProfilesState> = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case PROFILES.SET_USER_PROFILE:
            return { ...state, currentProfile: action.payload };
        case PROFILES.SET_PROFILE_IMAGE:
            return {
                ...state,
                currentProfile: {
                    ...state.currentProfile,
                    images: updateImage(state.currentProfile, action as SetProfileImageAction),
                },
            };
        default:
            return state;
    }
};

function updateImage(currentProfile: Profile | undefined, action: SetProfileImageAction): Image[] {
    if (currentProfile) {
        return currentProfile.images.map((image, index) => {
            if (image.uuid !== action.payload.id) {
                return image;
            }
            return action.payload.image;
        });
    }
    return [];
}

export default profilesReducer;
