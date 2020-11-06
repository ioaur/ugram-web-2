import API from "../api";
import User, { CurrentUser } from "../../models/user";
import Image from "../../models/image";
import UpdateUserDto from "./dto/updateUser.dto";
import CreateImageDto from "../images/dto/createImage.dto";

const fetchUser = (id: string): Promise<User> => {
    return API.get<User>(`users/${id}`).then((res) => res.data);
};

const fetchAllUsers = (): Promise<User[]> => {
    return API.get<User[]>("/users").then((res) => res.data);
};

const updateUser = (user: UpdateUserDto): Promise<User> => {
    return API.put<User>("/users", user).then((res) => res.data);
};

const deleteUser = (): Promise<User> => {
    return API.delete<User>("/users").then((res) => res.data);
};

const fetchMe = (): Promise<CurrentUser> => {
    return API.get<CurrentUser>("/users/me").then((res) => res.data);
};

const viewNotifications = (): Promise<CurrentUser> => {
    return API.post<CurrentUser>("/users/notifications/seen").then((res) => res.data);
};

const uploadUserProfilePicture = (image: CreateImageDto): Promise<Image> => {
    return API.post<Image>("/users/images", image).then((res) => res.data);
};

const fetchFamousUser = (): Promise<User[]> => {
    return API.get<User[]>("/users/famous").then((res) => res.data);
};

export {
    fetchUser,
    fetchAllUsers,
    updateUser,
    deleteUser,
    uploadUserProfilePicture,
    fetchMe,
    fetchFamousUser,
    viewNotifications,
};
