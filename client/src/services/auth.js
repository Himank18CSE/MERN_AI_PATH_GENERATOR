import API from "./api";

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};
