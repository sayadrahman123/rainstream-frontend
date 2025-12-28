import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
// FIX 1: Import correct function
import { registerUser } from "../services/authService";

const Register = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // FIX 2: Send 'username' instead of 'firstname' to match your Backend/Modal logic
      const dataToSend = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await registerUser(dataToSend);

      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email or Username might be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] flex items-center justify-center p-4">
      <div className="bg-[#131418] rounded-3xl border border-gray-800/50 w-full max-w-md p-8 relative shadow-2xl">
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
          <Link
            to="/"
            className="text-gray-400 hover:text-white text-sm transition"
          >
            Back to Home
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-3 flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="bg-[#0b0c0f] border border-gray-800 rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-green-500 transition"
            />
          </div>

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
                name="confirmPassword"
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

          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              id="terms"
              required
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

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-gray-100 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl text-base transition mt-4"
          >
            {isLoading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-medium hover:text-green-400 transition ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
