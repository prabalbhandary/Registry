import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserShield, FaUser, FaEnvelope, FaCalendar, FaCheckCircle, FaClock } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { data } = res.data;
        if (data) {
          setProfile(data);
        } else {
          throw new Error("No user data found");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          setError(err.response?.data?.message || "Failed to fetch user profile");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    } else {
      setError("User ID not found");
      setLoading(false);
    }
  }, [id, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <title>Profile - Trauma Registry</title>

      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent mb-2 tracking-tight">
            My Profile
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            View and manage your account information
          </p>
        </div>

        {error ? (
          // Error State
          <div className="max-w-4xl mx-auto animate-[fadeIn_0.8s_ease-out]">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-200">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 border-b-2 border-red-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-900">
                      Error Loading Profile
                    </h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header Section with Avatar */}
              <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-12 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative flex flex-col items-center">
                  {/* Avatar */}
                  <div className="w-32 h-32 rounded-3xl bg-white flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                    {user?.is_admin ? (
                      <FaUserShield className="text-6xl text-violet-600" />
                    ) : (
                      <FaUser className="text-6xl text-violet-600" />
                    )}
                  </div>
                  
                  {/* Name */}
                  <h2 className="mt-6 text-3xl font-bold text-white">
                    {user?.name}
                  </h2>
                  
                  {/* Role Badge */}
                  <div className="mt-4 flex gap-3">
                    {user?.is_admin ? (
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
                        <FaUserShield />
                        Administrator
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
                        <FaUser />
                        User
                      </span>
                    )}
                    
                    {user?.is_approved ? (
                      <span className="px-4 py-2 bg-green-500/90 backdrop-blur-sm border border-green-400/50 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
                        <FaCheckCircle />
                        Approved
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-amber-500/90 backdrop-blur-sm border border-amber-400/50 rounded-xl text-white font-semibold text-sm flex items-center gap-2">
                        <FaClock />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                    ℹ️
                  </span>
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaEnvelope className="text-white text-lg" />
                      </div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        Email Address
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 ml-13 break-all">
                      {user?.email}
                    </p>
                  </div>

                  {/* Account Status */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        {user?.is_approved ? (
                          <FaCheckCircle className="text-white text-lg" />
                        ) : (
                          <FaClock className="text-white text-lg" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        Account Status
                      </span>
                    </div>
                    <div className="ml-13">
                      {user?.is_approved ? (
                        <span className="inline-flex px-4 py-2 bg-green-100 border border-green-300 rounded-xl text-green-800 font-bold text-sm">
                          ✓ Approved & Active
                        </span>
                      ) : (
                        <span className="inline-flex px-4 py-2 bg-amber-100 border border-amber-300 rounded-xl text-amber-800 font-bold text-sm">
                          ⏳ Pending Approval
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User Role */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        {user?.is_admin ? (
                          <FaUserShield className="text-white text-lg" />
                        ) : (
                          <FaUser className="text-white text-lg" />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        User Role
                      </span>
                    </div>
                    <div className="ml-13">
                      {user?.is_admin ? (
                        <span className="inline-flex px-4 py-2 bg-purple-100 border border-purple-300 rounded-xl text-purple-800 font-bold text-sm">
                          👑 Administrator
                        </span>
                      ) : (
                        <span className="inline-flex px-4 py-2 bg-blue-100 border border-blue-300 rounded-xl text-blue-800 font-bold text-sm">
                          👤 Standard User
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaCalendar className="text-white text-lg" />
                      </div>
                      <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                        Member Since
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 ml-13">
                      {new Date(user?.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        Account Security
                      </h4>
                      <p className="text-sm text-slate-600">
                        Your account is secured with password authentication. Contact your administrator if you need to update your account details or reset your password.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Profile;