import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, X, LogOut, Settings } from "lucide-react";

const NavbarLoggedIn = ({
  onHome,
  onDiscover,
  onRelease, // <--- 1. Accept Prop
  onForum, // <--- 2. Accept Prop
  onProfile,
  searchQuery,
  setSearchQuery,
  onLogout, // <--- 3. Accept Prop
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const inputRef = useRef(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent px-8 md:px-16 py-4 flex items-center justify-between transition-all duration-300">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-12">
        <div
          className="flex items-center gap-2 cursor-pointer font-bold text-2xl tracking-tight"
          onClick={onHome}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
            R
          </div>
          <span className="text-white">RainStream</span>
        </div>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex gap-8 transition-opacity duration-300 ${
            isSearchOpen
              ? "opacity-0 pointer-events-none absolute"
              : "opacity-100"
          }`}
        >
          <button
            onClick={onHome}
            className="text-sm font-medium hover:text-green-400 transition"
          >
            Home
          </button>
          <button
            onClick={onDiscover}
            className="text-sm font-medium hover:text-green-400 transition"
          >
            Discover
          </button>

          {/* FIXED: Connected to onRelease */}
          <button
            onClick={onRelease}
            className="text-sm font-medium hover:text-green-400 transition"
          >
            Movie Release
          </button>

          {/* FIXED: Connected to onForum */}
          <button
            onClick={onForum}
            className="text-sm font-medium hover:text-green-400 transition"
          >
            Forum
          </button>

          <button className="text-sm font-medium hover:text-green-400 transition">
            About
          </button>
        </div>
      </div>

      {/* Right Side: Icons */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
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
              onDiscover();
            }}
          />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => {
              if (searchQuery.trim() === "") setIsSearchOpen(false);
            }}
            placeholder="Titles, people, genres"
            className={`bg-transparent border-none focus:outline-none text-white ml-3 text-sm w-full transition-opacity duration-300 ${
              isSearchOpen ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          />
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

        <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer transition" />

        {/* --- PROFILE DROPDOWN --- */}
        <div className="relative">
          <div
            className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600 cursor-pointer hover:border-green-500 transition"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
            />
          </div>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-[#1a1c21] rounded-xl shadow-xl border border-gray-700 py-2 animate-fade-in">
              <div
                className="px-4 py-3 border-b border-gray-700 cursor-pointer hover:bg-white/5 transition"
                onClick={() => {
                  setIsProfileOpen(false);
                  onProfile && onProfile(); // Navigate to Profile
                }}
              >
                <p className="text-sm text-white font-semibold">My Account</p>
                <p className="text-xs text-gray-400">Manage profile</p>
              </div>

              <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-green-500 flex items-center gap-2 transition">
                <Settings className="w-4 h-4" /> Settings
              </button>

              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  onLogout && onLogout(); // <--- FIXED: Calls Parent Logout
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLoggedIn;
