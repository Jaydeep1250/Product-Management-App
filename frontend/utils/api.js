import axios from "axios";

const API_URL = "http://localhost:8000"; // Backend URL

export const api = axios.create({
    baseURL: API_URL,
});

// Attach JWT token if available
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};