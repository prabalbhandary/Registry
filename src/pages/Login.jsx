import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { FaEye, FaEyeSlash, FaUserMd, FaShieldAlt, FaHospital, FaLock } from "react-icons/fa";
import Logo from "../assets/logo.png";

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${URL}/login`, { email, password });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      const response = error.response?.data;

      if (response?.errors) {
        // Loop through each field's error messages
        Object.values(response.errors).forEach((fieldErrors) => {
          fieldErrors.forEach((msg) => toast.error(msg));
        });
      } else {
        toast.error(response?.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Log in - Trauma Registry</title>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mt-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full -mr-40 -mb-40"></div>

          <div className="relative z-10 text-white space-y-8 animate-[fadeIn_0.8s_ease-out]">
            {/* Logo and Title */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <img
                  onClick={() => navigate("/")}
                  src={Logo}
                  alt="Nepal Orthopedic Association"
                  className="w-20 h-20 lg:w-24 lg:h-24 object-contain bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
                />
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Nepal Orthopedic<br />Association
                  </h1>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Trauma Registry System
              </h2>
              <p className="text-blue-100 text-lg">
                Comprehensive patient care management and surgical tracking
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaUserMd className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Patient Management</h3>
                  <p className="text-blue-100 text-sm">
                    Track and manage trauma patient records with ease
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Secure & Reliable</h3>
                  <p className="text-blue-100 text-sm">
                    Enterprise-grade security for sensitive medical data
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaHospital className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Multi-Hospital Support</h3>
                  <p className="text-blue-100 text-sm">
                    Manage multiple facilities from a single platform
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={500} />+
                </div>
                <div className="text-white font-medium">Patients</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  <Counter end={50} />+
                </div>
                <div className="text-white font-medium">Surgeons</div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <Counter end={10} />+
                </div>
                <div className="text-white font-medium">Hospitals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
                  <FaLock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-600">
                  Sign in to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-slate-700"
                    required
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••"
                      className="w-full p-4 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-slate-700"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-xl" />
                      ) : (
                        <FaEye className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-slate-600 group-hover:text-slate-800">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forget-password"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In to Your Account"
                  )}
                </button>

                {/* Register Link */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <p className="text-center text-slate-500 text-sm mt-8">
              © 2024 Nepal Orthopedic Association. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Login;