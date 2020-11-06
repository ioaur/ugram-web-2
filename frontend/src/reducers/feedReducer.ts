import { Reducer } from "redux";
import { BaseAction } from "../common";
import Image from "../models/image";
import { FEED } from "../actions/feed";
import { SetImageAction } from "../actions/feed/interfaces";

export type FeedState = Readonly<{
    images: Array<Image>;
}>;

const initialState: FeedState = {
    images: [],
};

export const feedReducer: Reducer<FeedState> = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case FEED.SET_FEED:
            return { ...state, images: action.payload };
        case FEED.REMOVE_IMAGE:
            return { ...state, images: removeImage(state.images, action.payload) };
        case FEED.SET_IMAGE:
            return { ...state, images: updateImage(state.images, action as SetImageAction) };
        case FEED.SET_NEXT_IMAGES:
            return { ...state, images: action.payload.concat(state.images) };
        case FEED.ADD_IMAGE:
            return { ...state, images: [action.payload].concat(state.images) };
        default:
            return state;
    }
};

function removeImage(array: Image[], imageUuid: string): Image[] {
    return array.filter((image, index) => image.uuid !== imageUuid);
}

function updateImage(array: Image[], action: SetImageAction): Image[] {
    return array.map((image, index) => {
        if (image.uuid !== action.payload.id) {
            return image;
        }
        return action.payload.image;
    });
}
