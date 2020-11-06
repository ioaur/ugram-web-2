import {
    GetFeedCallAction,
    SetFeedAction,
    AddImageToFeedAction,
    CreateImageCallAction,
    UpdateImageCallAction,
    SetImageAction,
    DeleteImageCallAction,
    RemoveImageAction,
    GetNextImagesCallAction,
    SetNextImagesAction,
    UploadImageToS3CallAction,
    LikeImageCallAction,
    CommentImageCallAction,
    ReactionImageCallAction,
} from "./interfaces";

import Image from "../../models/image";
import CreateImageDto from "../../api/images/dto/createImage.dto";
import UpdateImageDto from "../../api/images/dto/updateImage.dto";
import CreateImageCommentDto from "../../api/images/dto/createImageCommentDto";

const FEED_CALL = {
    CREATE_IMAGE_CALL: "CREATE_IMAGE_CALL",
    UPLOAD_IMAGE_TO_S3_CALL: "UPLOAD_IMAGE_TO_S3_CALL",
    GET_FEED_CALL: "GET_FEED_CALL",
    GET_NEXT_IMAGES_CALL: "GET_NEXT_IMAGE_CALL",
    UPDATE_IMAGE_CALL: "UPDATE_IMAGE_CALL",
    DELETE_IMAGE_CALL: "DELETE_IMAGE_CALL",
    COMMENT_IMAGE_CALL: "COMMENT_IMAGE_CALL",
    LIKE_IMAGE_CALL: "LIKE_IMAGE_CALL",
    REACTION_IMAGE_CALL: "REACTION_IMAGE_CALL",
};

export const FEED = {
    SET_FEED: "SET_FEED",
    SET_NEXT_IMAGES: "SET_NEXT_IMAGE",
    ADD_IMAGE: "ADD_IMAGE",
    SET_IMAGE: "SET_IMAGE",
    REMOVE_IMAGE: "REMOVE_IMAGE",
    ...FEED_CALL,
};

const getFeedCall = (count?: number): GetFeedCallAction => ({
    type: FEED.GET_FEED_CALL,
    payload: count,
});

const setFeed = (images: Image[]): SetFeedAction => ({
    type: FEED.SET_FEED,
    payload: images,
});

const createImageCall = (image: CreateImageDto): CreateImageCallAction => ({
    type: FEED.CREATE_IMAGE_CALL,
    payload: image,
});

const uploadImageToS3Call = (imagePayload: string): UploadImageToS3CallAction => ({
    type: FEED.UPLOAD_IMAGE_TO_S3_CALL,
    payload: imagePayload,
});

const addImageToFeed = (image: Image): AddImageToFeedAction => ({
    type: FEED.ADD_IMAGE,
    payload: image,
});

const updateImageCall = (id: string, updateImageDto: UpdateImageDto): UpdateImageCallAction => ({
    type: FEED.UPDATE_IMAGE_CALL,
    payload: {
        id: id,
        updateImageDto: updateImageDto,
    },
});

const likeImageCall = (id: string): LikeImageCallAction => ({
    type: FEED.LIKE_IMAGE_CALL,
    payload: id,
});

const reactionImageCall = (id: string, reaction: number): ReactionImageCallAction => ({
    type: FEED.REACTION_IMAGE_CALL,
    payload: {
        id: id,
        reaction: reaction,
    },
});

const commentImageCall = (id: string, createImageCommentDto: CreateImageCommentDto): CommentImageCallAction => {
    return {
        type: FEED.COMMENT_IMAGE_CALL,
        payload: {
            id: id,
            createImageCommentDto: createImageCommentDto,
        },
    };
};

const setImage = (id: string, image: Image): SetImageAction => ({
    type: FEED.SET_IMAGE,
    payload: {
        id: id,
        image: image,
    },
});

const deleteImageCall = (id: string): DeleteImageCallAction => ({
    type: FEED.DELETE_IMAGE_CALL,
    payload: id,
});

const removeImage = (id: string): RemoveImageAction => ({
    type: FEED.REMOVE_IMAGE,
    payload: id,
});

const getNextImagesCall = (id: string, count?: number): GetNextImagesCallAction => ({
    type: FEED.GET_NEXT_IMAGES_CALL,
    payload: {
        id: id,
        count: count,
    },
});

const setNextImages = (images: Image[]): SetNextImagesAction => ({
    type: FEED.SET_NEXT_IMAGES,
    payload: images,
});

export {
    getFeedCall,
    getNextImagesCall,
    setFeed,
    commentImageCall,
    likeImageCall,
    setNextImages,
    createImageCall,
    uploadImageToS3Call,
    updateImageCall,
    deleteImageCall,
    removeImage,
    setImage,
    addImageToFeed,
    reactionImageCall,
};
