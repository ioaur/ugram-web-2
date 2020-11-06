import axios from "axios";

export const baseURL = process.env.REACT_APP_BACKEND_URL;

let API = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
