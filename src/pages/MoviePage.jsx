import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Ensure this import path is correct!
import { getMovieById } from "../services/movieService";
import MovieDetails from "../components/MovieDetails";

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // DEBUG LOG 1
    // console.log("MoviePage: Mounted with ID:", id);

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        // DEBUG LOG 2
        // console.log("MoviePage: Calling getMovieById...");

        const data = await getMovieById(id);

        // DEBUG LOG 3
        // console.log("MoviePage: Data received:", data);

        if (data) {
          setMovie(data);
        } else {
          setError("Movie data is empty");
        }
      } catch (err) {
        // DEBUG LOG 4
        console.error("MoviePage: ERROR caught:", err);
        setError("Failed to load movie.");
      } finally {
        // DEBUG LOG 5
        // console.log("MoviePage: Finished loading.");
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    } else {
      console.error("MoviePage: No ID found in URL!");
      setLoading(false);
      setError("Invalid Movie ID");
    }
  }, [id]);

  // Handlers
  const handlePlay = (movieToPlay) => {
    navigate(`/watch/${movieToPlay.id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // --- RENDER ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center pt-20 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading details for ID: {id}...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0b0c0f] flex flex-col items-center justify-center pt-20 text-white">
        <h2 className="text-2xl font-bold text-red-500 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-400">{error || "Movie not found"}</p>
        <button
          onClick={handleBack}
          className="mt-6 bg-gray-800 px-6 py-2 rounded-full hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <MovieDetails movie={movie} onPlay={handlePlay} onBack={handleBack} />;
};

export default MoviePage;
