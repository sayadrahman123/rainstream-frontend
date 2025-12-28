import api from "../api/axiosConfig";

export const getAllMovies = async () => {
  try {
    const response = await api.get("/movies");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedMovies = async () => {
  try {
    const response = await api.get("/movies/featured");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get(`/movies/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await api.get("/movies");
    // "Hack": If a movie has no releaseDate, give it a random future date
    // so your UI shows data immediately.
    const moviesWithDates = response.data.map((movie) => {
      if (!movie.releaseDate) {
        // Random date within next 30 days
        const futureDate = new Date();
        futureDate.setDate(
          futureDate.getDate() + Math.floor(Math.random() * 30)
        );
        return { ...movie, releaseDate: futureDate.toISOString() };
      }
      return movie;
    });
    return moviesWithDates;
  } catch (error) {
    console.error("API Error fetching upcoming:", error);
    return [];
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await api.get(`/movies/similar/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};

export const getRandomFeaturedMovie = async () => {
  try {
    const response = await api.get("/movies/featured/random");
    return response.data;
  } catch (error) {
    console.error("Failed to load featured movie", error);
    return null;
  }
};

// Get SINGLE movie (The broken one)
export const getMovieById = async (id) => {
  // 2. This log MUST appear in your Browser Console (F12)
  // console.log(`[MovieService] Requesting: GET /movies/${id}`);

  try {
    const response = await api.get(`/movies/${id}`);
    // console.log("[MovieService] Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("[MovieService] Error:", error);
    throw error;
  }
};
