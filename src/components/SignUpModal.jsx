import React, { useState } from "react";
import { X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { registerUser } from "../services/authService"; // Import the service

const SignUpModal = ({ onClose, onLoginClick, onRegisterSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError(""); // Clear error when typing
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for backend (Backend only needs username, email, password)
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUser(dataToSend);

      // Success! Save token and notify App
      console.log("Registration Successful", response);
      localStorage.setItem("token", response.token);
      onRegisterSuccess(e);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try a different username or email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-[#131418] rounded-3xl border border-gray-800/50 w-full max-w-md p-8 relative my-8 animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-white text-xl font-bold tracking-wide">
                RainStream
              </span>
            </div>
            <h2 className="text-gray-400 text-sm">
              Register to enjoy the features
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white text-sm bg-transparent border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-full transition"
          >
            Close
          </button>
        </div>

        {/* Error Message Display (Only shows if there is an error) */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-white text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username" // Added name
              value={formData.username} // Added value
              onChange={handleChange} // Added handler
              placeholder="Username"
              required
              className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-white text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 w-full focus:outline-none focus:border-green-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm-password"
              className="text-white text-sm font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword" // Name matches state key
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 w-full focus:outline-none focus:border-green-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="terms"
              required // Made required
              className="accent-green-500 w-4 h-4"
            />
            <label htmlFor="terms" className="text-gray-400 text-xs">
              I agree to our{" "}
              <span className="text-white font-medium hover:underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="text-white font-medium hover:underline cursor-pointer">
                Term & Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl text-base transition mt-4"
          >
            {isLoading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        {/* Switch to Login Link */}
        <p className="text-gray-400 text-sm text-center mt-8">
          Already have an account?
          <button
            onClick={onLoginClick}
            className="text-white font-medium hover:text-green-400 transition ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
