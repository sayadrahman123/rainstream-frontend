import React, { useState } from "react";
import { ArrowUp, ArrowDown, Heart, MessageSquare, Video } from "lucide-react";
import { likePost } from "../services/postService";

const DiscussionDetail = ({ post, onBack }) => {
  // Local state for immediate UI updates inside the detail view
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);

  const handleLikeClick = async () => {
    // Optimistic Update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      await likePost(post.id);
    } catch (error) {
      console.error("Like failed", error);
      // Revert if error
      setIsLiked(!newLikedState);
      setLikes((prev) => (newLikedState ? prev - 1 : prev + 1));
    }
  };

  const mainPost = {
    user: `@${post.authorName || "Anonymous"}`,
    time: new Date(post.createdAt).toLocaleDateString(),
    title: post.title,
    content: post.content,
    image: "https://image.tmdb.org/t/p/w500/5weKu49pzSuYuO9ZhJ9nr7dyO9M.jpg",
    comments: post.commentsCount || 0,
  };

  // ... comments array ...

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pt-8 pb-24 px-8 md:px-16 font-sans animate-fade-in">
      <button
        onClick={onBack}
        className="px-6 py-2 rounded-lg bg-[#1a1b1f] border border-gray-700 text-white font-bold text-sm mb-8 hover:bg-gray-700 transition flex items-center gap-2"
      >
        ← Back to Feed
      </button>

      <div className="bg-[#131418] p-6 rounded-2xl border border-gray-800 mb-12">
        <div className="flex justify-between items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 hover:text-white">
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-white">{likes}</span>
            <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 hover:text-white">
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
              {mainPost.title}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
              {mainPost.content}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
              <span className="text-green-500 font-medium">
                {mainPost.user}
              </span>
              <span>•</span>
              <span>{mainPost.time}</span>
            </div>

            <div className="flex items-center justify-end gap-6 text-xs mt-4">
              {/* Like Button */}
              <button
                onClick={handleLikeClick}
                className={`flex items-center gap-1.5 transition ${
                  isLiked ? "text-red-500" : "text-gray-400 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                {likes}
              </button>

              <div className="flex items-center gap-1.5 text-gray-400">
                <MessageSquare className="w-4 h-4" /> {mainPost.comments}
              </div>
            </div>
          </div>

          <div className="w-32 h-20 rounded-lg overflow-hidden hidden md:block border border-gray-800">
            <img
              src={mainPost.image}
              alt="Topic"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>

      {/* ... Comments Section ... */}
    </div>
  );
};

export default DiscussionDetail;
