import API from "../api";
import Image from "../../models/image";

const fetchFeed = (count?: number): Promise<Image[]> => {
    const countParam = count ? `?count=${count}` : "";
    return API.get<Image[]>("/feed" + countParam).then((res) => res.data);
};

export { fetchFeed };
