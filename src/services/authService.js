import api from "../api/axiosConfig";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/authenticate", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
