import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import logo from "../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("otpEmail"));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${URL}/reset-password`, {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.removeItem("otpEmail");
        setEmail("");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <title>Reset Password - Trauma Registry</title>

      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-36 h-36" />
            </Link>
          </div>

          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Reset Your Password
          </h2>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                New Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-4 text-lg pr-12"
                placeholder="Enter your new password"
              />

              <span
                className="absolute right-4 top-[55px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-4 text-lg pr-12"
                placeholder="Confirm your new password"
              />

              <span
                className="absolute right-4 top-[55px] cursor-pointer text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={22} />
                ) : (
                  <FiEye size={22} />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 text-lg"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
