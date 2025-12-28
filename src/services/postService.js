import api from "../api/axiosConfig";

export const getAllPosts = async () => {
  try {
    const response = await api.get("/posts");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPosts = async (authorName) => {
  try {
    const response = await api.get(`/posts/user/${authorName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likePost = async (postId) => {
  // Returns the updated post (with new like count)
  const response = await api.put(`/posts/${postId}/like`);
  return response.data;
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
