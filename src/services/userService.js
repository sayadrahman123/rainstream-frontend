import api from "../api/axiosConfig";

export const getMyProfile = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put("/user/me", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
