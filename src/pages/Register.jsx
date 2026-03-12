import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { FaEye, FaEyeSlash, FaUserPlus, FaCheckCircle, FaClock } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { TiUserAdd } from "react-icons/ti";
import { LiaSpinnerSolid } from "react-icons/lia";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${URL}/register`, {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
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
      <title>Register - Trauma Registry</title>
      
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-700 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
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
                Join Our Registry System
              </h2>
              <p className="text-emerald-100 text-lg">
                Create your account to start managing trauma patient records
              </p>
            </div>

            {/* Registration Benefits */}
            <div className="space-y-6 pt-8">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Quick Approval</h3>
                  <p className="text-emerald-100 text-sm">
                    Your account will be reviewed and approved by our admin team
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaUserPlus className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Full Access</h3>
                  <p className="text-emerald-100 text-sm">
                    Access patient records, surgical data, and follow-up tracking
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">24/7 Availability</h3>
                  <p className="text-emerald-100 text-sm">
                    Access your data anytime, anywhere with secure cloud storage
                  </p>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="pt-8 border-t border-white/20">
              <h3 className="text-lg font-bold mb-4">Getting Started</h3>
              <ol className="space-y-3 text-emerald-100">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Create your account with valid credentials
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  Wait for admin approval (usually within 24 hours)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  Login and start managing patient records
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="w-full max-w-md animate-[slideUp_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-slate-200">
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
                  <TiUserAdd className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">
                  Create Account
                </h2>
                <p className="text-slate-600">
                  Join the trauma registry system
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700"
                    required
                  />
                </div>

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
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700"
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
                      className="w-full p-4 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700"
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

                {/* Confirm Password Input */}
                <div>
                  <label 
                    htmlFor="confirm_password" 
                    className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      id="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••••"
                      className="w-full p-4 pr-12 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700"
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
                </div>

                {/* Terms & Conditions */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-800">
                      I hereby agree to the Terms & Conditions of Nepal Orthopedic Association for using the Trauma Registry system.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <LiaSpinnerSolid className="animate-spin h-5 w-5" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Your Account"
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
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

export default Register;