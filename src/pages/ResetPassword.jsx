import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("otpEmail"));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${URL}/reset-password`, {email, password });
      if (res.status === 200) {
        toast.success(res.data.message);
        setEmail(localStorage.removeItem("otpEmail"));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
            {/* <input type="email" defaultValue={localStorage.getItem("otpEmail")} /> */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-4 text-lg"
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-4 text-lg"
                placeholder="Confirm your new password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 text-lg"
            >
              Reset Password
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Remembered your password?
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
