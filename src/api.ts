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
    const {
        uid,
        name,
        given_name,
        middle_name,
        family_name,
        nickname,
        email,
        phone_number,
        comment,
        picture,
        directory,
        metadata,
        tags,
    } = userData;

    const response = await api.post("/api/users", {
        uid,
        name,
        given_name,
        middle_name,
        family_name,
        nickname,
        email,
        phone_number,
        comment,
        picture,
        directory,
        metadata,
        tags,
    });
    return response.data;
};


export const listUsers = async () => {
    const response = await api.get("/api/users");
    return response.data;
};


export const getUserDetails = async (userId: string) => {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
};


export const updateUser = async (userId: string, userData: any) => {
    const {
        name,
        given_name,
        middle_name,
        family_name,
        nickname,
        email,
        phone_number,
        comment,
        picture,
        directory,
        metadata,
        tags,
    } = userData;

    const response = await api.patch(`/api/users/${userId}`, {
        name,
        given_name,
        middle_name,
        family_name,
        nickname,
        email,
        phone_number,
        comment,
        picture,
        directory,
        metadata,
        tags,
    });
    return response.data;
};


export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data;
};
