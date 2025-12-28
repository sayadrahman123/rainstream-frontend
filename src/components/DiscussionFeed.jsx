import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Send, User } from "lucide-react";
// Added getCommentsByPostId and createComment to imports
import {
  getAllPosts,
  createPost,
  likePost,
  getCommentsByPostId,
  createComment,
} from "../services/postService";
import { getMyProfile } from "../services/userService";

const DiscussionFeed = ({ onCreateProfile, handleLogin }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Post Creation State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Comment Section State
  const [expandedPostId, setExpandedPostId] = useState(null); // Tracks which post is open
  const [activeComments, setActiveComments] = useState([]); // Stores comments for the open post
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);

        if (isLoggedIn) {
          const userData = await getMyProfile();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Failed to load forum data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn]);

  // --- POST CREATION LOGIC ---
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsPosting(true);
    try {
      const author = currentUser?.nickname || currentUser?.email || "Anonymous";

      const payload = {
        title: newTitle,
        content: newContent,
        authorName: author,
        movieTitle: "General",
        liked: false,
        isLiked: false,
        likes: 0,
        commentsCount: 0,
      };

      await createPost(payload);

      setNewTitle("");
      setNewContent("");

      const updatedPosts = await getAllPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Failed to post", error);
    } finally {
      setIsPosting(false);
    }
  };

  // --- LIKE LOGIC ---
  const handleLike = async (postId) => {
    if (!isLoggedIn) {
      handleLogin();
      return;
    }

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.liked !== undefined ? post.liked : post.isLiked;
          const isNowLiked = !isLiked;
          return {
            ...post,
            liked: isNowLiked,
            isLiked: isNowLiked,
            likes: isNowLiked ? (post.likes || 0) + 1 : (post.likes || 0) - 1,
          };
        }
        return post;
      })
    );

    try {
      await likePost(postId);
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  // --- COMMENT LOGIC ---

  // 1. Toggle Comment Section & Fetch Comments
  const handleToggleComments = async (postId) => {
    // If clicking the same post, close it
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      setActiveComments([]);
      return;
    }

    // Open new post section
    setExpandedPostId(postId);
    setLoadingComments(true);
    setCommentText(""); // Clear input

    try {
      // Fetch comments for this specific post
      const commentsData = await getCommentsByPostId(postId);
      setActiveComments(commentsData || []);
    } catch (error) {
      console.error("Failed to fetch comments", error);
      setActiveComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  // 2. Submit New Comment
  const handleSubmitComment = async (postId) => {
    if (!commentText.trim()) return;
    setIsSubmittingComment(true);

    try {
      const author = currentUser?.nickname || currentUser?.email || "Anonymous";

      // Call backend
      const newComment = await createComment(postId, {
        content: commentText,
        authorName: author,
        // Add other fields if your backend is strict like the posts
        createdAt: new Date().toISOString(),
      });

      // Update local comments list immediately
      setActiveComments((prev) => [...prev, newComment]);
      setCommentText("");

      // Update the comment count on the main post object nicely
      setPosts((currentPosts) =>
        currentPosts.map((p) =>
          p.id === postId
            ? { ...p, commentsCount: (p.commentsCount || 0) + 1 }
            : p
        )
      );
    } catch (error) {
      console.error("Failed to submit comment", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return (
      new Date(dateString).toLocaleDateString() +
      " " +
      new Date(dateString).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <div className="px-8 md:px-16 pb-16">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xl">⭐</span>
        <h2 className="text-xl text-white font-bold">Popular Discussion</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Create Post Form */}
          {isLoggedIn ? (
            <div className="bg-[#1a1c21] p-6 rounded-2xl border border-gray-800">
              <h3 className="text-white font-bold mb-4">
                Start a Discussion as{" "}
                <span className="text-green-400">
                  {currentUser?.nickname || "User"}
                </span>
              </h3>
              <input
                type="text"
                placeholder="Title (e.g., Is Dune 2 the best sci-fi ever?)"
                className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white mb-3 focus:outline-none focus:border-green-500"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Share your thoughts..."
                className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white mb-3 h-24 focus:outline-none focus:border-green-500"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button
                onClick={handleCreatePost}
                disabled={isPosting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> {isPosting ? "Posting..." : "Post"}
              </button>
            </div>
          ) : (
            <div className="bg-[#1a1c21] p-8 rounded-2xl border border-gray-800 text-center">
              <h3 className="text-xl font-bold text-gray-300 mb-2">
                Join the Conversation
              </h3>
              <p className="text-gray-500 mb-6">
                Log in to post your thoughts and reply to others.
              </p>
              <button
                onClick={handleLogin}
                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition"
              >
                Log In to Post
              </button>
            </div>
          )}

          {/* Posts List */}
          {loading ? (
            <div className="text-gray-500 text-center py-10">
              Loading discussions...
            </div>
          ) : posts.length > 0 ? (
            posts.map((item) => {
              const isLiked =
                item.liked !== undefined ? item.liked : item.isLiked;
              const isExpanded = expandedPostId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-[#131418] p-6 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition animate-fade-in"
                >
                  <div className="flex justify-between items-start gap-6">
                    {/* Upvote/Downvote Column */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleLike(item.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition
                          ${
                            isLiked
                              ? "text-red-500 bg-gray-700"
                              : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                      >
                        ↑
                      </button>
                      <span
                        className={`text-xs font-bold ${
                          isLiked ? "text-red-500" : "text-white"
                        }`}
                      >
                        {item.likes}
                      </span>
                      <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700">
                        ↓
                      </button>
                    </div>

                    {/* Content Column */}
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2 hover:text-green-400 cursor-pointer transition">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed whitespace-pre-wrap">
                        {item.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium text-gray-400">
                            @{item.authorName}
                          </span>
                          <span>•</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-400 text-xs">
                          {/* Like Button */}
                          <div
                            onClick={() => handleLike(item.id)}
                            className={`flex items-center gap-1 cursor-pointer transition ${
                              isLiked ? "text-red-500" : "hover:text-white"
                            }`}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isLiked ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                            <span>{item.likes}</span>
                          </div>

                          {/* Comment Toggle Button */}
                          <div
                            onClick={() => handleToggleComments(item.id)}
                            className={`flex items-center gap-1 cursor-pointer transition ${
                              isExpanded ? "text-green-400" : "hover:text-white"
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />{" "}
                            <span>{item.commentsCount}</span>
                          </div>
                        </div>
                      </div>

                      {/* EXPANDABLE COMMENT SECTION */}
                      {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-800 animate-fade-in">
                          <h4 className="text-sm font-bold text-gray-300 mb-4">
                            Comments
                          </h4>

                          {/* Comment Input */}
                          {isLoggedIn ? (
                            <div className="flex gap-3 mb-6">
                              <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-500 flex-shrink-0">
                                <User className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={commentText}
                                  onChange={(e) =>
                                    setCommentText(e.target.value)
                                  }
                                  placeholder="Write a comment..."
                                  className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-green-500"
                                  onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    handleSubmitComment(item.id)
                                  }
                                />
                                <div className="flex justify-end mt-2">
                                  <button
                                    onClick={() => handleSubmitComment(item.id)}
                                    disabled={
                                      isSubmittingComment || !commentText.trim()
                                    }
                                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full disabled:opacity-50 transition"
                                  >
                                    {isSubmittingComment
                                      ? "Sending..."
                                      : "Reply"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500 mb-4 italic">
                              Please log in to leave a comment.
                            </div>
                          )}

                          {/* Comment List */}
                          <div className="space-y-4">
                            {loadingComments ? (
                              <div className="text-center text-xs text-gray-500">
                                Loading comments...
                              </div>
                            ) : activeComments.length > 0 ? (
                              activeComments.map((comment, index) => (
                                <div
                                  key={comment.id || index}
                                  className="flex gap-3"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 flex-shrink-0 text-xs">
                                    {comment.authorName
                                      ? comment.authorName
                                          .charAt(0)
                                          .toUpperCase()
                                      : "?"}
                                  </div>
                                  <div className="flex-1">
                                    <div className="bg-[#0b0c0f] p-3 rounded-lg rounded-tl-none border border-gray-800/50">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-gray-300">
                                          {comment.authorName}
                                        </span>
                                        <span className="text-[10px] text-gray-600">
                                          {formatDate(comment.createdAt)}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-400 leading-relaxed">
                                        {comment.content}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center text-xs text-gray-600 py-2">
                                No comments yet. Be the first to say something!
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* END COMMENT SECTION */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-10">
              No discussions yet. Be the first!
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: CTA Card */}
        <div className="lg:col-span-1">
          <div className="bg-[#131418] p-8 rounded-2xl border border-gray-800 sticky top-24 text-center">
            <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
              WANT TO MAKE A MOVIE INFLUENCE PROFILE?
            </h3>
            <button
              onClick={onCreateProfile}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition w-full shadow-lg shadow-green-900/20"
            >
              Create Your Profile Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionFeed;
