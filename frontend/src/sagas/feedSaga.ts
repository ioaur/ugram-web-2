import { takeEvery, call, put, debounce } from "redux-saga/effects";
import { FEED, addImageToFeed, setImage, removeImage, setNextImages, setFeed } from "../actions/feed";
import {
    GetFeedCallAction,
    CreateImageCallAction,
    UpdateImageCallAction,
    DeleteImageCallAction,
    GetNextImagesCallAction,
    UploadImageToS3CallAction,
    LikeImageCallAction,
    CommentImageCallAction,
    ReactionImageCallAction,
} from "../actions/feed/interfaces";
import { fetchFeed } from "../api/feed";
import { displayNotification } from "../actions/notifications";
import { NotificationLevel } from "../common/notifications";
import {
    createImage,
    updateImage,
    deleteImage,
    nextImages,
    uploadImageToS3,
    likeImage,
    commentImage,
    reactionImage,
} from "../api/images";
import { setProfileImage } from "../actions/profiles";

function* handleGetFeed(action: GetFeedCallAction) {
    const count = action.payload;
    try {
        const images = yield call(fetchFeed, count);
        if (images) {
            yield put(setFeed(images));
        }
    } catch (error) {
        yield put(
            displayNotification("Your feed couldn't be loaded. Please try again later.", NotificationLevel.Warning)
        );
        console.log(error);
    }
}

function* handleCreateImage(action: CreateImageCallAction) {
    const createImageDto = action.payload;
    try {
        const image = yield call(createImage, createImageDto);
        if (image) {
            yield put(addImageToFeed(image));
            yield put(displayNotification("Your image was uploaded with success.", NotificationLevel.Success));
        }
    } catch (error) {
        yield put(displayNotification("There was an error with uploading your image.", NotificationLevel.Warning));
        console.log(error);
    }
}

function* handleUploadImageToS3(action: UploadImageToS3CallAction) {
    const imagePayload = action.payload;
    try {
        const imageUrl = yield call(uploadImageToS3, imagePayload);
        if (imageUrl) {
            yield put(displayNotification("Your image was uploaded with success.", NotificationLevel.Success));
        }
    } catch (error) {
        yield put(displayNotification("There was an error with uploading your image.", NotificationLevel.Warning));

        console.log(error);
    }
}

function* handleUpdateImage(action: UpdateImageCallAction) {
    const { id, updateImageDto } = action.payload;
    try {
        const image = yield call(updateImage, id, updateImageDto);
        if (image) {
            yield put(setImage(id, image));
            yield put(displayNotification("Your image was successfully updated.", NotificationLevel.Success));
        }
    } catch (error) {
        console.log(error);
        yield put(
            displayNotification(
                "Something went wrong while trying to update your image informations.",
                NotificationLevel.Error
            )
        );
    }
}

function* handleDeleteImage(action: DeleteImageCallAction) {
    const id = action.payload;
    try {
        const image = yield call(deleteImage, id);
        if (image) {
            yield put(removeImage(image.uuid));
            yield put(displayNotification("Your image was deleted with success.", NotificationLevel.Success));
        }
    } catch (error) {
        yield put(displayNotification("There was an error trying to delete your image.", NotificationLevel.Error));
        console.log(error);
    }
}

function* handleGetNextImages(action: GetNextImagesCallAction) {
    const { id, count } = action.payload;
    try {
        const images = yield call(nextImages, id, count);
        if (images) {
            yield put(setNextImages(images));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleLikeImage(action: LikeImageCallAction) {
    const id = action.payload;
    try {
        const image = yield call(likeImage, id);
        if (image) {
            yield put(setImage(id, image));
            yield put(setProfileImage(id, image));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleReactionImage(action: ReactionImageCallAction) {
    const id = action.payload.id;
    const reaction = action.payload.reaction;
    try {
        const image = yield call(reactionImage, id, reaction);
        if (image) {
            yield put(setImage(id, image));
            yield put(setProfileImage(id, image));
        }
    } catch (error) {
        console.log(error);
    }
}

function* handleCommentImage(action: CommentImageCallAction) {
    const { id, createImageCommentDto } = action.payload;
    try {
        const image = yield call(commentImage, id, createImageCommentDto);
        if (image) {
            yield put(setImage(id, image));
            yield put(setProfileImage(id, image));
        }
    } catch (error) {
        console.log(error);
    }
}

export default function* watchAllFeedCall() {
    yield takeEvery(FEED.GET_FEED_CALL, handleGetFeed);
    yield takeEvery(FEED.CREATE_IMAGE_CALL, handleCreateImage);
    yield takeEvery(FEED.UPLOAD_IMAGE_TO_S3_CALL, handleUploadImageToS3);
    yield takeEvery(FEED.UPDATE_IMAGE_CALL, handleUpdateImage);
    yield takeEvery(FEED.DELETE_IMAGE_CALL, handleDeleteImage);
    yield takeEvery(FEED.GET_NEXT_IMAGES_CALL, handleGetNextImages);
    yield debounce(250, FEED.LIKE_IMAGE_CALL, handleLikeImage);
    yield debounce(250, FEED.REACTION_IMAGE_CALL, handleReactionImage);
    yield takeEvery(FEED.COMMENT_IMAGE_CALL, handleCommentImage);
}
