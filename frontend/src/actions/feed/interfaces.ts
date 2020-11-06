import { BaseAction } from "../../common";
import Image from "../../models/image";
import CreateImageDto from "../../api/images/dto/createImage.dto";
import UpdateImageDto from "../../api/images/dto/updateImage.dto";
import CreateImageCommentDto from "../../api/images/dto/createImageCommentDto";

export interface GetFeedCallAction extends BaseAction {
    payload?: number;
}

export interface SetFeedAction extends BaseAction {
    payload: Image[];
}

export interface CreateImageCallAction extends BaseAction {
    payload: CreateImageDto;
}

export interface UploadImageToS3CallAction extends BaseAction {
    payload: string;
}

export interface AddImageToFeedAction extends BaseAction {
    payload: Image;
}

export interface UpdateImageCallAction extends BaseAction {
    payload: {
        id: string;
        updateImageDto: UpdateImageDto;
    };
}

export interface CommentImageCallAction extends BaseAction {
    payload: {
        id: string;
        createImageCommentDto: CreateImageCommentDto;
    };
}

export interface LikeImageCallAction extends BaseAction {
    payload: string;
}

export interface ReactionImageCallAction extends BaseAction {
    payload: {
        id: string;
        reaction: number;
    };
}

export interface SetImageAction extends BaseAction {
    payload: {
        id: string;
        image: Image;
    };
}

export interface DeleteImageCallAction extends BaseAction {
    payload: string;
}

export interface RemoveImageAction extends BaseAction {
    payload: string;
}

export interface GetNextImagesCallAction extends BaseAction {
    payload: { id: string; count?: number };
}

export interface SetNextImagesAction extends BaseAction {
    payload: Image[];
}
