import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://api.spotify.com/v1",
    // withCredentials: true,
});

export const axiosInstanceToken = axios.create({
    baseURL: "https://accounts.spotify.com",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
});