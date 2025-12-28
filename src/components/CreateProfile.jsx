import React, { useState } from "react";
import { Camera, Check } from "lucide-react";

const CreateProfile = ({ onCancel, onContinue }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: "Irvan Wibowo",
    description: "",
    type: "Scripted",
    functions: {
      votes: false,
      discussion: true,
      watchTogether: true,
    },
    socials: {
      facebook: true,
      instagram: false,
      twitter: false,
      twitch: true,
    },
  });

  // Toggle handlers for the custom checkbox groups
  const toggleFunction = (key) => {
    setFormData((prev) => ({
      ...prev,
      functions: { ...prev.functions, [key]: !prev.functions[key] },
    }));
  };

  const toggleSocial = (key) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: !prev.socials[key] },
    }));
  };

  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pt-24 pb-20 px-4 md:px-0 font-sans">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-12">
        <h1 className="text-xl font-bold tracking-wide uppercase">
          Create Profile
        </h1>
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-full border border-gray-700 text-sm hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>

      {/* Main Form Container */}
      <div className="max-w-2xl mx-auto">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center mb-12">
          <span className="text-sm font-bold mb-4">Upload logo</span>
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1a1b1f]">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Camera Icon Overlay */}
            <div className="absolute bottom-0 right-0 bg-green-600 p-2 rounded-full border-4 border-[#0b0c0f] hover:bg-green-500 transition">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            onContinue();
          }}
        >
          {/* Name */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-transparent border border-gray-700 rounded-xl px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition"
              placeholder="Enter your name"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold">Descriptions</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-transparent border border-gray-700 rounded-xl px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition resize-none"
              placeholder="Descriptions"
            />
          </div>

          {/* Type Dropdown */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold">Type</label>
            <div className="relative">
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full bg-transparent border border-gray-700 rounded-xl px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition appearance-none cursor-pointer"
              >
                <option value="Scripted" className="bg-[#1a1b1f]">
                  Scripted
                </option>
                <option value="Reviewer" className="bg-[#1a1b1f]">
                  Reviewer
                </option>
                <option value="Reactor" className="bg-[#1a1b1f]">
                  Reactor
                </option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Functions Section */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold">Functions</label>
            <div className="flex flex-wrap gap-8">
              <CustomCheckbox
                label="Votes"
                checked={formData.functions.votes}
                onChange={() => toggleFunction("votes")}
              />
              <CustomCheckbox
                label="Discussion"
                checked={formData.functions.discussion}
                onChange={() => toggleFunction("discussion")}
              />
              <CustomCheckbox
                label="Watch together"
                checked={formData.functions.watchTogether}
                onChange={() => toggleFunction("watchTogether")}
              />
            </div>
          </div>

          {/* Social Media Automation Section */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold">Social Media Automation</label>
            <div className="flex flex-wrap gap-8">
              <CustomCheckbox
                label="Facebook"
                checked={formData.socials.facebook}
                onChange={() => toggleSocial("facebook")}
              />
              <CustomCheckbox
                label="Instagram"
                checked={formData.socials.instagram}
                onChange={() => toggleSocial("instagram")}
              />
              <CustomCheckbox
                label="Twitter"
                checked={formData.socials.twitter}
                onChange={() => toggleSocial("twitter")}
              />
              <CustomCheckbox
                label="Twitch"
                checked={formData.socials.twitch}
                onChange={() => toggleSocial("twitch")}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-lg transition w-48 shadow-lg shadow-green-900/20"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper Component for the Circular Checkbox
const CustomCheckbox = ({ label, checked, onChange }) => (
  <div
    onClick={onChange}
    className="flex items-center gap-3 cursor-pointer group select-none"
  >
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
        checked
          ? "bg-green-600 border-green-600"
          : "bg-transparent border-gray-600 group-hover:border-gray-400"
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />}
    </div>
    <span
      className={`text-xs font-bold ${
        checked ? "text-white" : "text-gray-400"
      }`}
    >
      {label}
    </span>
  </div>
);

export default CreateProfile;
