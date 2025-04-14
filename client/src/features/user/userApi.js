import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const register = async (userData) => {
  const res = await axios.post(`${baseUrl}/auth/register`, userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${baseUrl}/auth/login`, userData);
  return res.data;
};

export const userApi = {
  register,
  login,
};
