import API from "../api";

const fetchFamousHashtag = (): Promise<String[]> => {
    return API.get<String[]>(`/images/hashtags/famous`).then((res) => res.data);
};

export {
    fetchFamousHashtag
};
