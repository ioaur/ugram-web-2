import API from "../api";
import CreateImageDto from "./dto/createImage.dto";
import Image from "../../models/image";
import UpdateImageDto from "./dto/updateImage.dto";
import CreateImageCommentDto from "./dto/createImageCommentDto";

const createImage = (image: CreateImageDto): Promise<Image> => {
    return API.post<Image>("/images", image).then((res) => res.data);
};

const uploadImageToS3 = (imagePayload: string): Promise<string> => {
    return API.post<string>("/images/S3", { image: imagePayload }).then((res) => res.data);
};

const fetchAllImages = (): Promise<Image[]> => {
    return API.get<Image[]>("/images/search").then((res) => res.data);
};

const fetchImages = (description: string): Promise<Image[]> => {
    let paramImage = {};
    if (description[0] === "#") {
        const modifiedDescription = description.replace("#", "");
        paramImage = { tags: modifiedDescription };
    } else {
        paramImage = { description: description };
    }

    return API.get<Image[]>("/images", { params: paramImage }).then((res) => res.data);
};

const fetchFamousHashtags = (): Promise<string[]> => {
    return API.get<string[]>("/images/hashtags/famous").then((res) => res.data);
};

const likeImage = (id: string): Promise<Image> => {
    return API.post<Image>(`/images/${id}/likes`).then((res) => res.data);
};

const reactionImage = (id: string, reaction: number): Promise<Image> => {
    return API.post<Image>(`/images/${id}/reactions/${reaction}`).then((res) => res.data);
};

const commentImage = (id: string, createImageCommentDto: CreateImageCommentDto): Promise<Image> => {
    return API.post<Image>(`/images/${id}/comments`, createImageCommentDto).then((res) => res.data);
};

const updateImage = (id: string, image: UpdateImageDto): Promise<Image> => {
    return API.put<Image>(`/images/${id}`, image).then((res) => res.data);
};

const deleteImage = (id: string): Promise<Image> => {
    return API.delete<Image>(`/images/${id}`).then((res) => res.data);
};

const fetchImage = (id: string): Promise<Image> => {
    return API.get<Image>(`/images/${id}`).then((res) => res.data);
};

const nextImages = (id: string, count?: number): Promise<Image[]> => {
    const countParam = count ? `?count=${count}` : "";
    return API.get<Image[]>(`/images/next/${id}` + countParam).then((res) => res.data);
};

const getAutocomplete = (word: string) => {
    let paramImage = {};
    if (word[0] === "#") {
        const modifiedDescription = word.replace("#", "");
        paramImage = { tags: modifiedDescription };
    } else {
        paramImage = { description: word };
    }

    return API.get<string[]>("/images/autocomplete", { params: paramImage }).then((res) => res.data);
};

export {
    fetchAllImages,
    fetchFamousHashtags,
    commentImage,
    likeImage,
    createImage,
    updateImage,
    deleteImage,
    fetchImage,
    nextImages,
    fetchImages,
    uploadImageToS3,
    getAutocomplete,
    reactionImage,
};
