import api from "../api/axiosConfig";

export const getLikedMovies = async () => {
  try {
    const response = await api.get("/likes");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeMovie = async (movieId) => {
  try {
    const response = await api.post(`/likes/add/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeMovie = async (movieId) => {
  try {
    const response = await api.delete(`/likes/remove/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
