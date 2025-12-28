// import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import NavbarLoggedIn from "./components/NavbarLoggedIn";
// import Footer from "./components/Footer";

// // Views
// import Home from "./pages/Home";
// import MovieDetails from "./components/MovieDetails";
// import VideoPlayer from "./components/VideoPlayer";
// import Discover from "./components/Discover";
// import LoginModal from "./components/LoginModal";
// import SignUpModal from "./components/SignUpModal";
// import MovieRelease from "./components/MovieRelease";
// import Forum from "./components/Forum";
// import CreateProfile from "./components/CreateProfile";
// import UserProfile from "./components/UserProfile";
// import DiscussionDetail from "./components/DiscussionDetail";

// // Helper to check token validity
// const isTokenValid = (token) => {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp > Date.now() / 1000;
//   } catch (e) {
//     return false;
//   }
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentView, setCurrentView] = useState("home");

//   // 1. NEW STATE: Tracks where to go back to (Home vs Discover)
//   const [detailBackTarget, setDetailBackTarget] = useState("home");

//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Persistence Logic
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && isTokenValid(token)) {
//       setIsLoggedIn(true);
//     } else {
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//     }
//   }, []);

//   // --- Navigation Helpers ---
//   const goHome = () => {
//     setCurrentView("home");
//     window.scrollTo(0, 0);
//   };
//   const goDiscover = () => {
//     setCurrentView("discover");
//     window.scrollTo(0, 0);
//   };

//   // 2. UPDATED: Open Detail Page directly
//   const goDetail = (movie) => {
//     setDetailBackTarget(currentView); // Remember: "I came from Home/Discover"
//     setSelectedMovie(movie);
//     window.scrollTo(0, 0);
//     setCurrentView("detail");
//   };

//   // 3. UPDATED: Open Player
//   const goPlayer = (movie) => {
//     // If we are NOT coming from the detail page (e.g. clicked Play on Home),
//     // we still want the future Detail page to remember we came from Home.
//     if (currentView !== "detail") {
//       setDetailBackTarget(currentView);
//     }

//     setSelectedMovie(movie);
//     setCurrentView("player");
//   };

//   // 4. UPDATED: Smart Back Button for Player
//   const goBackFromPlayer = () => {
//     // Always go to Detail page after watching (so user can rate/like)
//     setCurrentView("detail");
//   };

//   // 5. UPDATED: Smart Back Button for Details
//   const goBackFromDetail = () => {
//     setCurrentView(detailBackTarget); // Go back to Home or Discover!
//     window.scrollTo(0, 0);
//   };

//   // Other Navigation
//   const goRelease = () => {
//     window.scrollTo(0, 0);
//     setCurrentView("release");
//   };
//   const goForum = () => {
//     window.scrollTo(0, 0);
//     setCurrentView("forum");
//   };
//   const goCreateProfile = () => {
//     window.scrollTo(0, 0);
//     setCurrentView("create-profile");
//   };
//   const goUserProfile = () => {
//     window.scrollTo(0, 0);
//     setCurrentView("user-profile");
//   };
//   const goDiscussionDetail = () => {
//     window.scrollTo(0, 0);
//     setCurrentView("discussion-detail");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setCurrentView("home");
//     window.scrollTo(0, 0);
//   };

//   // Auth & Modals
//   const openLogin = () => {
//     setIsLoginOpen(true);
//     document.body.style.overflow = "hidden";
//   };
//   const openSignUp = () => {
//     setIsSignUpOpen(true);
//     document.body.style.overflow = "hidden";
//   };
//   const closeAllModals = () => {
//     setIsLoginOpen(false);
//     setIsSignUpOpen(false);
//     document.body.style.overflow = "unset";
//   };
//   const handleLoginSuccess = (e) => {
//     if (e) e.preventDefault();
//     setIsLoggedIn(true);
//     closeAllModals();
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentView("discover");
//     window.scrollTo(0, 0);
//   };

//   // --- Render View Logic ---
//   const renderContent = () => {
//     switch (currentView) {
//       case "player":
//         return (
//           <VideoPlayer
//             // Use videoUrl as key instead of ID so episodes trigger a reset too!
//             key={selectedMovie?.videoUrl || selectedMovie?.id}
//             movie={selectedMovie}
//             onBack={goBackFromPlayer}
//           />
//         );
//       case "detail":
//         return (
//           <MovieDetails
//             key={selectedMovie?.id}
//             movie={selectedMovie}
//             onBack={goBackFromDetail}
//             // --- FIX BELOW ---
//             // Remove: () => goPlayer(selectedMovie)
//             // Change to: goPlayer
//             onPlay={goPlayer}
//           />
//         );
//       case "discover":
//         return <Discover onPlay={goPlayer} initialQuery={searchQuery} />;
//       case "release":
//         return <MovieRelease onPlay={goPlayer} />;
//       case "forum":
//         return <Forum onCreateProfile={goCreateProfile} />;
//       case "user-profile":
//         return (
//           <UserProfile
//             onDiscussionClick={goDiscussionDetail}
//             onPlay={goPlayer}
//           />
//         );
//       case "discussion-detail":
//         return (
//           <DiscussionDetail onBack={() => setCurrentView("user-profile")} />
//         );
//       case "create-profile":
//         return (
//           <CreateProfile
//             onCancel={() => setCurrentView("forum")}
//             onContinue={goUserProfile}
//           />
//         );
//       default:
//         return (
//           <Home
//             isLoggedIn={isLoggedIn}
//             onPlay={goPlayer}
//             onSearch={handleSearch}
//           />
//         );
//     }
//   };

//   return (
//     <div className="bg-[#0b0c0f] min-h-screen text-white font-sans">
//       {currentView !== "player" &&
//         currentView !== "create-profile" &&
//         (isLoggedIn ? (
//           <NavbarLoggedIn
//             onHome={goHome}
//             onDiscover={goDiscover}
//             onRelease={goRelease}
//             onForum={goForum}
//             onProfile={goUserProfile}
//             onLogout={handleLogout}
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         ) : (
//           <Navbar
//             onLoginClick={openLogin}
//             onSignUpClick={openSignUp}
//             onHome={goHome}
//             onDiscover={goDiscover}
//             onRelease={goRelease}
//             onForum={goForum}
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         ))}

//       {renderContent()}

//       {currentView !== "player" && <Footer />}

//       {isLoginOpen && (
//         <LoginModal
//           onClose={closeAllModals}
//           onSignUpClick={() => {
//             closeAllModals();
//             openSignUp();
//           }}
//           onLoginSubmit={handleLoginSuccess}
//         />
//       )}
//       {isSignUpOpen && (
//         <SignUpModal
//           onClose={closeAllModals}
//           onLoginClick={() => {
//             closeAllModals();
//             openLogin();
//           }}
//           onRegisterSuccess={handleLoginSuccess}
//         />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
// 1. Import Router components
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoviePage from "./pages/MoviePage";
import MovieRelease from "./pages/MovieRelease";
import Forum from "./pages/Forum"; // <--- ADD THIS IMPORT

// Import Components
import Navbar from "./components/Navbar";
import VideoPlayer from "./components/VideoPlayer";
import Discover from "./components/Discover";
import UserProfile from "./components/UserProfile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook to change pages programmatically
  const location = useLocation(); // Hook to know where we are

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Send to home after logout
  };

  // Hide Navbar on Player or Login/Register pages for clean look
  const hideNavbar =
    location.pathname.startsWith("/watch") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white">
      {/* Show Navbar unless hidden */}
      {!hideNavbar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onSearch={(query) => navigate(`/discover?q=${query}`)}
        />
      )}

      {/* 2. THE NEW ROUTING SYSTEM */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        {/* Feature Routes */}
        <Route path="/discover" element={<Discover />} />
        {/* Protected Routes */}
        <Route path="/profile" element={<UserProfile />} />
        {/* Movie & Player Routes */}
        <Route path="/watch/:id" element={<VideoPlayer />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        {/* Navigation Routes */}
        <Route path="/releases" element={<MovieRelease />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </div>
  );
};

export default App;
