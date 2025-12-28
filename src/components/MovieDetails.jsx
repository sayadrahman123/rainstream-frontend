import React, { useEffect, useState } from "react";
import { getSimilarMovies } from "../services/movieService";
import { getReviews, addReview } from "../services/reviewService"; // <--- Import
import { Star, User as UserIcon, Send } from "lucide-react";
import {
  Play,
  Plus,
  Download,
  Share2,
  ThumbsUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

// The component now accepts the 'movie' object as a prop
const MovieDetails = ({ movie, onBack, onPlay }) => {
  const [activeTab, setActiveTab] = useState("Episode");
  const [similarMovies, setSimilarMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    if (activeTab === "Reviews" && movie?.id) {
      getReviews(movie.id).then(setReviews);
    }
  }, [activeTab, movie]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const addedReview = await addReview(movie.id, newComment, newRating);
      setReviews([addedReview, ...reviews]); // Add to top of list immediately
      setNewComment(""); // Clear form
    } catch (error) {
      alert("Login to post a review!");
    }
  };

  useEffect(() => {
    const fetchSimiar = async () => {
      if (movie?.id) {
        const data = await getSimilarMovies(movie.id);
        setSimilarMovies(data);
      }
    };
    fetchSimiar();
  }, [movie]);

  // SAFETY CHECK: If no movie data is passed, return null or a loading state
  if (!movie)
    return <div className="text-white p-10">Loading movie details...</div>;

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white font-sans pb-20">
      {/* 1. Detail Hero Section */}
      <div className="relative w-full h-[85vh]">
        {/* DYNAMIC BACKGROUND IMAGE */}
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0f] via-[#0b0c0f]/40 to-transparent"></div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-24 left-8 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <ChevronLeft className="w-5 h-5" /> Back to Browse
        </button>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full px-8 md:px-16 pb-12">
          <div className="mb-4">
            <span className="bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded text-xs border border-white/10 uppercase tracking-wider">
              {movie.type || "Movie"}
            </span>
          </div>

          {/* DYNAMIC TITLE */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {movie.title}
          </h1>

          {/* DYNAMIC METADATA */}
          <div className="flex items-center gap-3 text-sm text-gray-300 mb-8">
            <span>
              {movie.duration
                ? `${Math.round(movie.duration / 60)}m`
                : "2h 15m"}
            </span>
            <span>•</span>
            <span>{movie.year || "2023"}</span>
            <span>•</span>
            <span>{movie.genre || "Action • Sci-Fi"}</span>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Left Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (movie.episodeList && movie.episodeList.length > 0) {
                    // If it's a series, play the first episode
                    const firstEp = movie.episodeList[0];
                    onPlay({
                      ...movie,
                      videoUrl: firstEp.videoUrl,
                      title: `${movie.title} - S${firstEp.seasonNumber} E${firstEp.episodeNumber}: ${firstEp.title}`,
                      startTime: 0, // Optional: Reset time for new episode
                    });
                  } else {
                    // If it's a movie, play it normally
                    onPlay(movie);
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 transition shadow-lg shadow-green-900/20"
              >
                <Play className="w-5 h-5 fill-current" /> Play Now
              </button>

              <button className="bg-transparent hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 border border-gray-600 transition">
                <Plus className="w-5 h-5" /> Add Watchlist
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex gap-4">
              <ActionButton
                icon={<Download className="w-5 h-5" />}
                label="Download"
              />
              <ActionButton
                icon={<Share2 className="w-5 h-5" />}
                label="Share"
              />
              <ActionButton
                icon={<ThumbsUp className="w-5 h-5" />}
                label="Like"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="px-8 md:px-16 py-8">
        {/* DYNAMIC STORY LINE */}
        <div className="mb-12 max-w-4xl">
          <h3 className="text-lg font-bold text-white mb-3">Story Line</h3>
          <p className="text-gray-400 text-sm leading-relaxed text-lg">
            {movie.description ||
              "No description available for this movie yet. Stay tuned for updates!"}
          </p>
        </div>

        {/* STATIC Top Cast (Can be made dynamic later if API supports credits) */}
        {/* DYNAMIC Top Cast */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Top Cast</h3>
          </div>

          {/* Check if castList exists and has items */}
          {movie.castList && movie.castList.length > 0 ? (
            <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-2">
              {movie.castList.map((actor) => (
                <CastMember
                  key={actor.id}
                  name={actor.name}
                  role={actor.roleName}
                  image={actor.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Cast information not available.
            </p>
          )}
        </div>

        {/* 3. Tabs */}
        <div className="border-b border-gray-800 mb-8 flex gap-8">
          {/* CONDITIONALLY RENDER 'Episodes' TAB */}
          {movie.episodeList && movie.episodeList.length > 0 && (
            <button
              onClick={() => setActiveTab("Episodes")}
              className={`pb-3 text-sm font-medium transition ${
                activeTab === "Episodes"
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Episodes
            </button>
          )}

          {movie.trailerList && movie.trailerList.length > 0 && (
            <button
              onClick={() => setActiveTab("Trailers")}
              className={`pb-3 text-sm font-medium transition ${
                activeTab === "Trailers"
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Trailers
            </button>
          )}

          {["Related", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition ${
                activeTab === tab
                  ? "text-white border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 4. Tab Content: Episodes (Static for Demo) */}
        {/* 4. Tab Content: Episodes */}
        {activeTab === "Episodes" && movie.episodeList && (
          <div className="mb-12 animate-fade-in">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {movie.episodeList.map((ep) => (
                <EpisodeCard
                  key={ep.id}
                  number={ep.episodeNumber}
                  image={ep.thumbnailUrl || movie.backdropUrl}
                  time={ep.duration}
                  // For now, progress is hardcoded or 0 because we track Movie progress, not Episode progress yet
                  progress="0%"
                  // Optional: Clicking an episode could play it specifically
                  onClick={() =>
                    onPlay &&
                    onPlay({ ...movie, videoUrl: ep.videoUrl, title: ep.title })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Reviews" && (
          <div className="max-w-3xl animate-fade-in">
            {/* 1. Input Form */}
            <form
              onSubmit={handleSubmitReview}
              className="mb-10 bg-[#131418] p-6 rounded-xl border border-gray-800"
            >
              <h4 className="text-white font-bold mb-4">Write a Review</h4>

              {/* Rating Selector */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className={`transition ${
                      star <= newRating ? "text-yellow-500" : "text-gray-600"
                    }`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <textarea
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition mb-4"
                rows="3"
                placeholder="Share your thoughts on this movie..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" /> Post Review
              </button>
            </form>

            {/* 2. Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-800 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gray-700 p-2 rounded-full">
                        <UserIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h5 className="text-white font-bold text-sm">
                          {rev.user?.username || "RainStream User"}
                        </h5>
                        <span className="text-xs text-gray-500">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="ml-auto flex text-yellow-500 text-xs">
                        {/* Render Stars */}
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed ml-11">
                      {rev.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-10">
                  No reviews yet. Be the first to review!
                </div>
              )}
            </div>
          </div>
        )}

        {/* TRAILERS TAB CONTENT */}
        {activeTab === "Trailers" && movie.trailerList && (
          <div className="mb-12 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movie.trailerList.map((trailer) => (
                <div
                  key={trailer.id}
                  className="group cursor-pointer relative"
                  onClick={() =>
                    onPlay &&
                    onPlay({
                      ...movie,
                      videoUrl: trailer.videoUrl,
                      title: trailer.name,
                    })
                  }
                >
                  {/* Thumbnail */}
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-gray-800 group-hover:border-green-500 transition">
                    <img
                      src={trailer.thumbnailUrl}
                      alt={trailer.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                    />

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:bg-green-600 transition">
                        <Play className="w-6 h-6 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="mt-3 text-white font-bold text-sm group-hover:text-green-500 transition">
                    {trailer.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-6">
            You might also like
          </h3>

          {similarMovies.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {similarMovies.map((sim) => (
                <SimilarCard
                  key={sim.id}
                  title={sim.title}
                  rating="4.5" // You can add a rating field to DB later
                  image={sim.posterUrl}
                  // Clicking a similar movie should act like clicking a new movie
                  // We can reuse onPlay(sim) to open it in player,
                  // OR ideally we should navigate to its details.
                  // For now, let's just trigger onPlay to keep it simple,
                  // or if you want to navigate, we need a separate prop like `onMovieClick`.
                  onClick={() => onPlay && onPlay(sim)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No similar movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ActionButton = ({ icon, label }) => (
  <button className="flex items-center gap-2 text-white bg-[#1a1b1f] hover:bg-[#25262b] px-5 py-3.5 rounded-xl text-sm font-medium transition border border-gray-800">
    {icon} <span className="hidden md:inline">{label}</span>
  </button>
);

const CastMember = ({ name, role, image }) => (
  <div className="flex items-center gap-3 min-w-[200px]">
    <img
      src={image}
      alt={name}
      className="w-12 h-12 rounded-full object-cover border border-gray-700"
    />
    <div>
      <h4 className="text-white font-bold text-sm">{name}</h4>
      <p className="text-gray-500 text-xs">{role}</p>
    </div>
  </div>
);

const EpisodeCard = ({ number, image, progress, time, onClick }) => (
  <div className="min-w-[280px] cursor-pointer group" onClick={onClick}>
    <div className="relative rounded-xl overflow-hidden h-40 mb-3 border border-gray-800 group-hover:border-gray-600 transition">
      <img
        src={image || "https://via.placeholder.com/300x200"}
        alt={`Chapter ${number}`}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
      />
      <div className="absolute bottom-3 left-3 right-3">
        <h4 className="text-white font-bold text-sm mb-1 shadow-black drop-shadow-md">
          Episode {number}
        </h4>
        <div className="flex items-center gap-3 text-[10px] text-gray-300 font-mono">
          <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: progress }}
            ></div>
          </div>
          <span>{time}</span>
        </div>
      </div>
    </div>
  </div>
);

const SimilarCard = ({ title, rating, image, onClick }) => (
  <div className="min-w-[200px] cursor-pointer group" onClick={onClick}>
    <div className="relative rounded-xl overflow-hidden h-[300px] mb-3 border border-gray-800">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
    </div>
    <h4 className="text-white font-bold text-sm mb-1 truncate">{title}</h4>
    <div className="flex items-center text-yellow-500 gap-1 text-xs">
      <span>★ {rating}</span>
    </div>
  </div>
);

export default MovieDetails;
