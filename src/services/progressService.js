import api from "../api/axiosConfig";

export const getContinueWatching = async () => {
  try {
    const response = await api.get("/progress");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const saveProgress = async (movieId, progress, totalDuration) => {
  try {
    await api.post("/progress", {
      movieId,
      progress,
      totalDuration,
    });
  } catch (error) {
    console.error("Error saving progress:", error);
  }
};

export const getProgress = async (movieId) => {
  const response = await api.get(`/progress/${movieId}`);
  return response.data;
};
