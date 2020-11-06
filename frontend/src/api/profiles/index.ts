import API from "../api";
import Profile from "../../models/profile";

const fetchProfile = (username: string, lastImageUuid?: string, count?: number): Promise<Profile> => {
    const countParam = count ? `?count=${count}` : "";
    const lastImageUuidParam = lastImageUuid ? `?lastImageUuidParam=${lastImageUuid}` : "";
    return API.get<Profile>(`/profiles/${username}` + countParam + lastImageUuidParam).then((res) => res.data);
};

export { fetchProfile };
