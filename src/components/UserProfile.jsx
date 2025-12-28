// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   MapPin,
//   Calendar,
//   Edit3,
//   Heart,
//   List,
//   MessageSquare,
// } from "lucide-react";
// import { getWatchlist } from "../services/watchlistService";
// import { getUserPosts } from "../services/postService";
// import { getMyProfile } from "../services/userService"; // <--- Import
// import MovieSlider from "./MovieSlider";
// import EditProfileModal from "./EditProfileModal"; // <--- Import Modal

// const UserProfile = ({ onPlay }) => {
//   const [activeTab, setActiveTab] = useState("watchlist");
//   const [user, setUser] = useState(null); // Real User Data
//   const [watchlist, setWatchlist] = useState([]);
//   const [myPosts, setMyPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [isEditOpen, setIsEditOpen] = useState(false); // Modal State

//   // Fetch ALL Profile Data
//   const fetchProfileData = async () => {
//     try {
//       const profile = await getMyProfile(); // Fetch /user/me
//       setUser(profile);

//       // Fetch related data
//       const [list, posts] = await Promise.all([
//         getWatchlist(),
//         getUserPosts(profile.nickname || profile.email), // Fallback to email if no nickname
//       ]);

//       setWatchlist(list);
//       setMyPosts(posts);
//     } catch (error) {
//       console.error("Failed to load profile", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   if (loading || !user)
//     return (
//       <div className="h-screen flex items-center justify-center text-white">
//         Loading Profile...
//       </div>
//     );

//   return (
//     <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
//       {/* 1. Header */}
//       <div className="relative">
//         <div className="h-64 w-full overflow-hidden relative">
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] to-transparent z-10"></div>
//           {/* Fallback Banner */}
//           <img
//             src="https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
//             alt="Banner"
//             className="w-full h-full object-cover opacity-60"
//           />
//         </div>

//         <div className="px-8 md:px-16 -mt-20 relative z-20 flex flex-col md:flex-row items-end md:items-center gap-6">
//           <div className="w-32 h-32 rounded-full border-4 border-[#0b0c0f] overflow-hidden bg-gray-800 shadow-xl">
//             <img
//               src={
//                 user.avatarUrl ||
//                 "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
//               }
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="flex-1 mb-2">
//             <h1 className="text-3xl font-bold">
//               {user.nickname || "Movie Fan"}
//             </h1>
//             <p className="text-gray-400 text-sm mt-1">{user.email}</p>
//           </div>

//           <button
//             onClick={() => setIsEditOpen(true)} // Open Modal
//             className="bg-[#1a1c21] hover:bg-[#25272e] border border-gray-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition mb-4"
//           >
//             <Edit3 className="w-4 h-4" /> Edit Profile
//           </button>
//         </div>
//       </div>

//       {/* 2. Stats & Content */}
//       <div className="px-8 md:px-16 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-1 space-y-4">
//           <div className="bg-[#1a1c21] p-6 rounded-2xl border border-gray-800">
//             <h3 className="font-bold mb-3 text-lg">About</h3>
//             <p className="text-gray-400 text-sm leading-relaxed mb-4">
//               {user.bio || "No bio yet."}
//             </p>
//             <div className="space-y-2 text-sm text-gray-500">
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-4 h-4" /> {user.location || "Unknown"}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4" /> Joined{" "}
//                 {user.joinDate || "Recently"}
//               </div>
//             </div>
//           </div>

//           {/* Real Stats */}
//           <div className="flex gap-4 justify-around bg-[#1a1c21] p-4 rounded-xl border border-gray-800">
//             <div className="text-center">
//               <div className="font-bold text-xl">{watchlist.length}</div>
//               <div className="text-xs text-gray-500 uppercase tracking-wide">
//                 Watched
//               </div>
//             </div>
//             <div className="w-px bg-gray-700"></div>
//             <div className="text-center">
//               <div className="font-bold text-xl">{myPosts.length}</div>
//               <div className="text-xs text-gray-500 uppercase tracking-wide">
//                 Discussions
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="md:col-span-2">
//           {/* Tabs */}
//           <div className="flex gap-8 border-b border-gray-800 mb-6">
//             <button
//               onClick={() => setActiveTab("watchlist")}
//               className={`pb-3 text-sm font-bold flex items-center gap-2 transition ${
//                 activeTab === "watchlist"
//                   ? "text-green-500 border-b-2 border-green-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               <Heart className="w-4 h-4" /> My Watchlist
//             </button>
//             <button
//               onClick={() => setActiveTab("reviews")}
//               className={`pb-3 text-sm font-bold flex items-center gap-2 transition ${
//                 activeTab === "reviews"
//                   ? "text-green-500 border-b-2 border-green-500"
//                   : "text-gray-400 hover:text-white"
//               }`}
//             >
//               <List className="w-4 h-4" /> My Discussions
//             </button>
//           </div>

//           {activeTab === "watchlist" && (
//             <div className="-mx-8 md:-mx-16">
//               {watchlist.length > 0 ? (
//                 <MovieSlider title="" data={watchlist} onPlay={onPlay} />
//               ) : (
//                 <div className="mx-8 text-center text-gray-500 py-10">
//                   Watchlist is empty.
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === "reviews" && (
//             <div className="space-y-4">
//               {myPosts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="bg-[#1a1c21] p-6 rounded-xl border border-gray-800"
//                 >
//                   <h4 className="font-bold mb-2 text-white">{post.title}</h4>
//                   <p className="text-gray-400 text-sm mb-4 line-clamp-2">
//                     {post.content}
//                   </p>
//                   <span className="text-xs text-gray-500">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* EDIT MODAL */}
//       {isEditOpen && (
//         <EditProfileModal
//           user={user}
//           onClose={() => setIsEditOpen(false)}
//           onUpdateSuccess={(updatedUser) => {
//             setUser(updatedUser); // Update UI immediately
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
// 1. Import Hook
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Edit3, Heart, List } from "lucide-react";
import { getWatchlist } from "../services/watchlistService";
import { getUserPosts } from "../services/postService";
import { getMyProfile } from "../services/userService";
import MovieSlider from "./MovieSlider";
import EditProfileModal from "./EditProfileModal";

// 2. Remove 'onPlay' prop
const UserProfile = () => {
  const navigate = useNavigate(); // 3. Initialize Hook

  const [activeTab, setActiveTab] = useState("watchlist");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 4. Create local handler
  const handlePlay = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const fetchProfileData = async () => {
    try {
      const profile = await getMyProfile();
      setUser(profile);

      const [list, posts] = await Promise.all([
        getWatchlist(),
        getUserPosts(profile.nickname || profile.email),
      ]);

      setWatchlist(list);
      setMyPosts(posts);
    } catch (error) {
      console.error("Failed to load profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading || !user)
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#0b0c0f]">
        Loading Profile...
      </div>
    );

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      {/* 1. Header */}
      <div className="relative">
        <div className="h-64 w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] to-transparent z-10"></div>
          <img
            src="https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg"
            alt="Banner"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="px-8 md:px-16 -mt-20 relative z-20 flex flex-col md:flex-row items-end md:items-center gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-[#0b0c0f] overflow-hidden bg-gray-800 shadow-xl">
            <img
              src={
                user.avatarUrl ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-bold">
              {user.nickname || "Movie Fan"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-[#1a1c21] hover:bg-[#25272e] border border-gray-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition mb-4"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* 2. Stats & Content */}
      <div className="px-8 md:px-16 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-[#1a1c21] p-6 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-3 text-lg">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {user.bio || "No bio yet."}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {user.location || "Unknown"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Joined{" "}
                {user.joinDate || "Recently"}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-around bg-[#1a1c21] p-4 rounded-xl border border-gray-800">
            <div className="text-center">
              <div className="font-bold text-xl">{watchlist.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Watched
              </div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="font-bold text-xl">{myPosts.length}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Discussions
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab("watchlist")}
              className={`pb-3 text-sm font-bold flex items-center gap-2 transition ${
                activeTab === "watchlist"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Heart className="w-4 h-4" /> My Watchlist
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-bold flex items-center gap-2 transition ${
                activeTab === "reviews"
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" /> My Discussions
            </button>
          </div>

          {activeTab === "watchlist" && (
            <div className="-mx-8 md:-mx-16">
              {watchlist.length > 0 ? (
                // 5. Use handlePlay here
                <MovieSlider title="" data={watchlist} onPlay={handlePlay} />
              ) : (
                <div className="mx-8 text-center text-gray-500 py-10">
                  Watchlist is empty.
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {myPosts.length > 0 ? (
                myPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#1a1c21] p-6 rounded-xl border border-gray-800"
                  >
                    <h4 className="font-bold mb-2 text-white">{post.title}</h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10">
                  No discussions yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditOpen(false)}
          onUpdateSuccess={(updatedUser) => {
            setUser(updatedUser);
          }}
        />
      )}
    </div>
  );
};

export default UserProfile;
