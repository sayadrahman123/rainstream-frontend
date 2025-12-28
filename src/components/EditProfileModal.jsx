import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { updateProfile } from "../services/userService";

const EditProfileModal = ({ user, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    nickname: user.nickname || "",
    location: user.location || "",
    bio: user.bio || "",
    avatarUrl: user.avatarUrl || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateProfile(formData);
      onUpdateSuccess(updatedUser); // Notify parent
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in px-4">
      <div className="bg-[#1a1c21] w-full max-w-md rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Display Name
            </label>
            <input
              type="text"
              className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition"
              value={formData.nickname}
              onChange={(e) =>
                setFormData({ ...formData, nickname: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Location</label>
            <input
              type="text"
              className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Bio</label>
            <textarea
              rows="3"
              className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition resize-none"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          {/* Avatar URL Input (Simple version) */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="w-full bg-[#0b0c0f] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-500 transition text-sm"
              value={formData.avatarUrl}
              onChange={(e) =>
                setFormData({ ...formData, avatarUrl: e.target.value })
              }
            />
            <p className="text-xs text-gray-600 mt-1">
              Paste a link to an image.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition mt-4"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
