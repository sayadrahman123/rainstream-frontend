import React, { useState, useRef, useEffect } from "react";
import { Search, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import Router Hooks

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate(); // 2. Init Navigate Hook

  // Auto-focus input when opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search if empty and blurred
  const handleBlur = () => {
    if (searchQuery.trim() === "") {
      setIsSearchOpen(false);
    }
  };

  // 3. Handle Live Search
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Navigate to Discover with query param
    if (query.trim().length > 0) {
      navigate(`/discover?q=${query}`);
    } else {
      navigate("/discover");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent px-8 md:px-16 py-4 flex items-center justify-between transition-all duration-300">
      {/* 1. Left Side: Logo & Links */}
      <div className="flex items-center gap-12">
        {/* Logo - Clicks to Home */}
        <div
          className="flex items-center gap-2 cursor-pointer font-bold text-2xl tracking-tight"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
            R
          </div>
          <span className="text-white">RainStream</span>
        </div>

        {/* Links (Hidden when Search is Open) */}
        <div
          className={`hidden md:flex gap-8 transition-opacity duration-300 ${
            isSearchOpen
              ? "opacity-0 pointer-events-none absolute"
              : "opacity-100"
          }`}
        >
          <Link
            to="/"
            className="text-sm font-medium hover:text-green-400 transition text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/discover"
            className="text-sm font-medium hover:text-green-400 transition text-gray-200"
          >
            Discover
          </Link>
          <Link
            to="/releases"
            className="text-sm font-medium hover:text-green-400 transition text-gray-200"
          >
            Movie Release
          </Link>
          <Link
            to="/forum"
            className="text-sm font-medium hover:text-green-400 transition text-gray-200"
          >
            Forum
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:text-green-400 transition text-gray-200"
          >
            About
          </Link>
        </div>
      </div>

      {/* 2. Right Side: Search & Auth Buttons */}
      <div className="flex items-center gap-4">
        {/* EXPANDABLE SEARCH BAR */}
        <div
          className={`relative flex items-center transition-all duration-500 ease-in-out ${
            isSearchOpen
              ? "w-64 md:w-80 bg-white/10 rounded-full px-4 py-2"
              : "w-8 bg-transparent"
          }`}
        >
          <Search
            className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white min-w-[20px]"
            onClick={() => {
              setIsSearchOpen(true);
              navigate("/discover"); // Go to discover when opening search
            }}
          />

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={handleBlur}
            placeholder="Titles, people, genres"
            className={`bg-transparent border-none focus:outline-none text-white ml-3 text-sm w-full transition-opacity duration-300 ${
              isSearchOpen ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          />

          {/* Close Button (X) */}
          {isSearchOpen && (
            <X
              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white ml-2"
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(false);
              }}
            />
          )}
        </div>

        {/* Auth Buttons OR Profile (Based on Login Status) */}
        <div
          className={`flex items-center gap-4 transition-opacity duration-300 ${
            isSearchOpen ? "hidden md:flex" : "flex"
          }`}
        >
          {isLoggedIn ? (
            // LOGGED IN VIEW: Profile & Logout
            <div className="flex items-center gap-4">
              <Link to="/profile">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center border border-white/20 hover:scale-105 transition">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Link>
              <button
                onClick={onLogout}
                className="text-gray-400 hover:text-white transition"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            // GUEST VIEW: Login & Signup
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white hover:text-green-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
