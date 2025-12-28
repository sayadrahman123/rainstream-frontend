import React, { useState } from "react";
import { X, Eye, EyeOff, AlertCircle } from "lucide-react"; // Added AlertCircle for errors
import { loginUser } from "../services/authService"; // Import the service

const LoginModal = ({ onClose, onSignUpClick, onLoginSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  // 1. Add State for Data, Error, and Loading
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // using 'id' to match state keys
    });
    if (error) setError("");
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      // Success
      console.log("Login Successful", response);
      localStorage.setItem("token", response.token);
      onLoginSubmit(e); // Notify parent to update UI
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#131418] rounded-3xl border border-gray-800/50 w-full max-w-md p-8 relative">
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
            <h2 className="text-gray-400 text-sm">Login to your account</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white text-sm bg-transparent border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-full transition"
          >
            Close
          </button>
        </div>

        {/* Error Message (Only visible on error) */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email} // Bind state
              onChange={handleChange} // Bind handler
              placeholder="Email"
              required
              className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
            />
          </div>

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
                value={formData.password} // Bind state
                onChange={handleChange} // Bind handler
                placeholder="Password"
                required
                className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 pr-12 text-white text-sm placeholder-gray-600 w-full focus:outline-none focus:border-green-500 transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
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

          <a
            href="#"
            className="text-white text-sm text-right hover:text-green-400 transition font-medium"
          >
            Forgot Password
          </a>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl text-base transition mt-4"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-8">
          Don't have an account?{" "}
          <button
            onClick={onSignUpClick}
            className="text-white font-medium hover:text-green-400 transition ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
