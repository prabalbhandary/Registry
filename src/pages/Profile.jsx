import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

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
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch user profile"
          );
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
  }, [id]);

  return (
    <>
      <title>Profile - Trauma Registry</title>
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              User Profile
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View and manage your account information
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="bg-blue-500 px-4 py-5 sm:px-6 flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <svg
                    className="h-16 w-16 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <h2 className="mt-4 text-xl font-bold text-white">
                  {user.name}
                </h2>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.is_approved ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.is_admin ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          Administrator
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          User
                        </span>
                      )}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Joined
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
