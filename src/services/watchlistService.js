import api from "../api/axiosConfig";

export const getWatchlist = async () => {
  try {
    const response = await api.get("/watchlist");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToWatchlist = async (movieId) => {
  try {
    const response = await api.post(`/watchlist/add/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromWatchlist = async (movieId) => {
  try {
    const response = await api.delete(`/watchlist/remove/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
