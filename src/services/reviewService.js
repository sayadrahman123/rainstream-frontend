import api from "../api/axiosConfig";

export const getReviews = async (movieId) => {
  try {
    const response = await api.get(`/reviews/${movieId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const addReview = async (movieId, content, rating) => {
  try {
    const response = await api.post("/reviews", { movieId, content, rating });
    return response.data;
  } catch (error) {
    console.error("Failed to add review", error);
    throw error;
  }
};
