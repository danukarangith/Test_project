import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_WEAVY_API_BASE_URL;
const API_KEY = import.meta.env.VITE_WEAVY_API_KEY;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
    },
});

export const createUser = async (userData: any) => {
    const response = await api.post("/users", userData);
    return response.data;
};

export const listUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};

export const getUserDetails = async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const updateUser = async (userId: string, userData: any) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};
