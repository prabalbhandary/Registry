import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import { FaEnvelope, FaArrowLeft, FaLock } from "react-icons/fa";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${URL}/send-otp`, { email });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("otpEmail", email);
        navigate("/otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Forget Password - Trauma Registry</title>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-amber-700 via-orange-600 to-red-700 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
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
                    Nepal Orthopedic
                    <br />
                    Association
                  </h1>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Password Recovery
              </h2>
              <p className="text-orange-100 text-lg">
                Reset your password securely and regain access to your account
              </p>
            </div>

            {/* Recovery Steps */}
            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Enter Your Email</h3>
                  <p className="text-orange-100 text-sm">
                    Provide the email address associated with your account
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Receive OTP Code</h3>
                  <p className="text-orange-100 text-sm">
                    We'll send a one-time password to your email address
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Reset Password</h3>
                  <p className="text-orange-100 text-sm">
                    Verify the OTP and create a new secure password
                  </p>
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex items-start gap-3">
                <FaLock className="text-orange-100 w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">Secure Process</h4>
                  <p className="text-orange-100 text-sm">
                    Your password reset request is protected with secure OTP
                    verification to ensure account safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Recovery Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
              {/* Back to Login Link */}
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-600 font-semibold mb-6 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Sign In
              </Link>

              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Reset Password
                </h2>
                <p className="text-slate-600">
                  Enter your email to receive an OTP code
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-blue-700">
                    We'll send a one-time password (OTP) to your registered
                    email address. Please check your inbox and spam folder.
                  </p>
                </div>
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
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <FaEnvelope className="text-lg" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-slate-700"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
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
                      Sending OTP...
                    </span>
                  ) : (
                    "Send Password Reset OTP"
                  )}
                </button>

                {/* Additional Links */}
                <div className="text-center pt-4 border-t border-slate-200 space-y-2">
                  <p className="text-slate-600 text-sm">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
                    >
                      Sign In
                    </Link>
                  </p>
                  <p className="text-slate-600 text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-orange-600 hover:text-orange-700 font-bold hover:underline"
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

export default ForgetPassword;