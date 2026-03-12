import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash, FaLock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email] = useState(localStorage.getItem("otpEmail"));
  const navigate = useNavigate();

  // Password strength checker
  const getPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.length >= 12) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "text-red-600 bg-red-100" };
    if (strength <= 3) return { strength, label: "Medium", color: "text-yellow-600 bg-yellow-100" };
    return { strength, label: "Strong", color: "text-green-600 bg-green-100" };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${URL}/reset-password`, {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.removeItem("otpEmail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Reset Password - Trauma Registry</title>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-teal-700 via-cyan-600 to-blue-700 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
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
                Create New Password
              </h2>
              <p className="text-cyan-100 text-lg">
                Set a strong, secure password for your account
              </p>
            </div>

            {/* Password Requirements */}
            <div className="space-y-6 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FaLock />
                  Password Requirements
                </h3>
                <ul className="space-y-3 text-cyan-100">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Minimum 8 characters long</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Mix of uppercase and lowercase letters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">At least one number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">At least one special character (!@#$%^&*)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-lg mb-2">Almost There!</h3>
                <p className="text-cyan-100 text-sm">
                  You're one step away from securing your account. Choose a strong password that you haven't used elsewhere.
                </p>
              </div>
            </div>

            {/* Security Tips */}
            <div className="pt-8 border-t border-white/20">
              <h3 className="text-lg font-bold mb-4">Security Tips</h3>
              <ul className="space-y-2 text-cyan-100 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-200 rounded-full"></span>
                  Use a unique password for this account
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-200 rounded-full"></span>
                  Avoid using personal information
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-200 rounded-full"></span>
                  Consider using a password manager
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
              {/* Back Link */}
              <Link
                to="/otp"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-cyan-600 font-semibold mb-6 transition-colors group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back
              </Link>

              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mb-4">
                  <FaLock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Reset Your Password
                </h2>
                <p className="text-slate-600">
                  Create a strong new password
                </p>
              </div>

              {/* Email Display */}
              {email && (
                <div className="mb-6 p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <p className="text-sm text-cyan-700 text-center">
                    Resetting password for: <span className="font-bold">{email}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full pl-4 pr-12 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-slate-700"
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

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-600">
                          Password Strength:
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${passwordStrength.strength <= 2
                            ? "bg-red-500"
                            : passwordStrength.strength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            }`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full pl-4 pr-12 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-slate-700"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-xl" />
                      ) : (
                        <FaEye className="text-xl" />
                      )}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="mt-3">
                      {passwordsMatch ? (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <FaCheckCircle />
                          <span className="font-semibold">Passwords match!</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 text-sm">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">Passwords do not match</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !passwordsMatch || password.length < 8}
                  className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LiaSpinnerSolid className="animate-spin w-5 h-5" />
                      Resetting Password...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600 text-sm">
                    Remembered your password?{" "}
                    <Link
                      to="/login"
                      className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline"
                    >
                      Sign In
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

export default ResetPassword;