import api from "./api.js";

export const registerRequest = (payload) => api.post("/auth/register", payload);

export const loginRequest = (payload) => api.post("/auth/login", payload);

export const logoutRequest = () => api.post("/auth/logout");

export const meRequest = () => api.get("/auth/me");

export const refreshRequest = () => api.post("/auth/refresh-token", {}, { withCredentials: true });
