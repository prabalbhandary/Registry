import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../components/URL";
import axios from "axios";
import { FaShieldAlt, FaArrowLeft, FaEnvelope, FaClock } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email] = useState(localStorage.getItem("otpEmail"));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;
    const newOtp = pasted.split("");
    setOtp(newOtp);
    document.getElementById("otp-5")?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${URL}/verify-otp`, {
        otp: otpValue,
        email,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(`${URL}/send-otp`, { email });
      if (res.status === 200) {
        toast.success("OTP sent successfully!");
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <>
      <title>Verify your OTP - Trauma Registry</title>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mt-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full -mr-40 -mb-40"></div>

          <div className="relative z-10 text-white space-y-8 animate-[fadeIn_0.8s_ease-out]">
            {/* Logo and Title */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <img
                  onClick={() => navigate("/")}
                  src={logo}
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
                Verify Your Identity
              </h2>
              <p className="text-purple-100 text-lg">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Verification Info */}
            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Secure Verification</h3>
                  <p className="text-purple-100 text-sm">
                    We've sent a one-time password to your registered email address for secure verification
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Check Your Email</h3>
                  <p className="text-purple-100 text-sm">
                    The OTP has been sent to {email ? <span className="font-semibold">{email}</span> : "your email"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Limited Time</h3>
                  <p className="text-purple-100 text-sm">
                    This code will expire in 10 minutes. Request a new one if needed
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="pt-8 border-t border-white/20">
              <h3 className="text-lg font-bold mb-4">Tips</h3>
              <ul className="space-y-2 text-purple-100 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  Check your spam or junk folder if you don't see the email
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  Make sure you entered the correct email address
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  Wait a few minutes before requesting a new code
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - OTP Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
              {/* Back Link */}
              <Link
                to="/forget-password"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 font-semibold mb-6 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back
              </Link>

              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4">
                  <FaEnvelope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Enter OTP Code
                </h2>
                <p className="text-slate-600">
                  We've sent a 6-digit code to your email
                </p>
              </div>

              {/* Email Display */}
              {email && (
                <div className="mb-8 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-purple-700 text-center">
                    Code sent to: <span className="font-bold">{email}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* OTP Input Fields */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 text-center uppercase tracking-wider">
                    Enter 6-Digit Code
                  </label>
                  <div className="flex justify-between gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        maxLength={1}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-slate-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700"
                        autoFocus={index === 0}
                        placeholder="•"
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LiaSpinnerSolid className="animate-spin h-5 w-5" />
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP Code"
                  )}
                </button>

                {/* Resend Link */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-purple-600 hover:text-purple-700 font-bold hover:underline transition-colors"
                  >
                    Resend OTP Code
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200">
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
                <p className="text-sm text-slate-600">
                  For security reasons, this code will expire in 10 minutes. If
                  you need a new code, use the "Resend OTP Code" button above.
                </p>
              </div>
            </div>

            <p className="text-center text-slate-500 text-sm mt-6">
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

export default OTP;