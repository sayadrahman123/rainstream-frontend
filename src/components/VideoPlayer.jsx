import React, { useState, useRef, useEffect } from "react";
// 1. Add Router Hooks & Service
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { getProgress, saveProgress } from "../services/progressService";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  Captions,
} from "lucide-react";

// Helper: Format seconds into MM:SS or HH:MM:SS
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const h = Math.floor(timeInSeconds / 3600);
  const m = Math.floor((timeInSeconds % 3600) / 60);
  const s = Math.floor(timeInSeconds % 60);
  if (h > 0) {
    return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  }
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

// Helper: Extract YouTube ID
const getYoutubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const VideoPlayer = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  // State
  const [movie, setMovie] = useState(null); // Local Movie State
  const [loading, setLoading] = useState(true); // Loading State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // 1. FETCH MOVIE DATA
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch Movie Details
        const movieData = await getMovieById(id);

        // Fetch Saved Progress for this movie
        // We wrap this in a try/catch so if it fails (new user/movie), it doesn't break the player
        let savedTime = 0;
        try {
          // Assuming you have an endpoint like /api/progress/{movieId}
          // If not, we can rely on the Home page passing it, but fetching here is safer.
          const progressData = await getProgress(id);
          if (progressData && progressData.progressSeconds) {
            savedTime = progressData.progressSeconds;
          }
        } catch (err) {
          console.log("No saved progress found.");
        }

        // Merge data
        setMovie({ ...movieData, startTime: savedTime });
      } catch (error) {
        console.error("Failed to load movie", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieData();
  }, [id]);

  // Determine Video Type
  const youtubeId = getYoutubeId(movie?.videoUrl);
  const isYoutube = !!youtubeId;

  // Auto-hide controls timer
  const controlsTimeoutRef = useRef(null);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !showSettings) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showSettings]);

  // Force Video Reload on Movie Change
  useEffect(() => {
    if (videoRef.current && movie) {
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      videoRef.current.load();
    }
  }, [movie]);

  // --- CONTROLS LOGIC ---
  const handleBack = () => {
    navigate(-1); // Use Router to go back
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      if (movie?.startTime && movie.startTime > 0) {
        videoRef.current.currentTime = movie.startTime;
        setCurrentTime(movie.startTime);
      }
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Autoplay prevented:", error));
      }
    }
  };

  const handleSeek = (e) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Save Progress Interval
  useEffect(() => {
    if (!movie?.id || !isPlaying) return;
    const interval = setInterval(() => {
      if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        if (current > 0 && total > 0) {
          saveProgress(movie.id, current, total);
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, movie]);

  // --- RENDER ---
  if (loading)
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Movie not found.
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center font-sans group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* --- CASE A: YOUTUBE --- */}
      {isYoutube ? (
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/80 hover:text-white transition pointer-events-auto bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <ArrowLeft className="w-6 h-6" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={movie?.title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        /* --- CASE B: CUSTOM MP4 PLAYER --- */
        <>
          <video
            key={movie?.videoUrl}
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            src={movie?.videoUrl}
            poster={movie?.backdropUrl || movie?.posterUrl}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          ></video>

          {/* 1. TOP BAR */}
          <div
            className={`absolute top-0 left-0 w-full p-8 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-3 text-white/90 hover:text-green-500 transition group/back"
            >
              <ArrowLeft className="w-8 h-8 transition-transform group-hover/back:-translate-x-1" />
              {movie?.title && (
                <h2 className="text-xl font-bold tracking-wide drop-shadow-md">
                  {movie.title}
                </h2>
              )}
            </button>
          </div>

          {/* 2. CENTER PLAY ICON */}
          {!isPlaying && showControls && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-full border border-white/10 shadow-2xl">
                <Play className="w-12 h-12 text-white fill-current translate-x-1" />
              </div>
            </div>
          )}

          {/* 3. BOTTOM CONTROLS BAR */}
          <div
            className={`absolute bottom-0 left-0 w-full px-8 pb-8 pt-24 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-300 ${
              showControls ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="text-white hover:text-green-500 transition focus:outline-none"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current" />
                )}
              </button>

              <span className="text-gray-200 font-medium text-sm w-12">
                {formatTime(currentTime)}
              </span>

              <div
                className="flex-1 h-2 bg-gray-600/50 rounded-full cursor-pointer relative group/slider"
                onClick={handleSeek}
                ref={progressBarRef}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity"
                  style={{ left: `${progressPercentage}%` }}
                ></div>
              </div>

              <span className="text-gray-400 font-medium text-sm w-12 text-right">
                {formatTime(duration)}
              </span>

              <div className="flex items-center gap-5 ml-2 text-gray-300">
                <button
                  onClick={toggleMute}
                  className="hover:text-white transition"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>

                <button className="hover:text-white transition">
                  <Captions className="w-6 h-6" />
                </button>

                <button className="hover:text-white transition">
                  <Settings className="w-6 h-6" />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="hover:text-white transition"
                >
                  {isFullscreen ? (
                    <Minimize className="w-6 h-6" />
                  ) : (
                    <Maximize className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
