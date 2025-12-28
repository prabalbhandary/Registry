import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const AddAssistant = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [surgeons, setSurgeons] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospitals_id, setHospitals_id] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ===================== FETCH ASSISTANT SURGEONS (PAGINATED) ===================== */
  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${URL}/assistant-surgeone?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSurgeons(res.data?.data || []);
        setLastPage(res.data?.meta?.last_page || 1);
      } catch (error) {
        handleAuthError(error, "Failed to fetch assistant surgeons");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistantSurgeons();
  }, [page, token]);

  /* ===================== FETCH HOSPITALS ===================== */
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHospitals(res.data?.data || []);
      } catch (error) {
        handleAuthError(error, "Failed to fetch hospitals");
      }
    };

    fetchHospitals();
  }, [token]);

  /* ===================== ADD ASSISTANT SURGEON ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !hospitals_id) {
      toast.error("Both name and hospital are required");
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/assistant-surgeone`,
        {
          name,
          hospitals_id: Number(hospitals_id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Assistant surgeon added");
      setName("");
      setHospitals_id("");

      // refresh current page
      setPage(1);
    } catch (error) {
      handleAuthError(error, "Failed to add assistant surgeon");
    }
  };

  /* ===================== TOGGLE ACTIVE STATUS ===================== */
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `${URL}/activate-assistant-surgeone/${id}`,
        { is_active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");

      setSurgeons((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, is_active: !currentStatus } : s
        )
      );
    } catch (error) {
      handleAuthError(error, "Failed to update status");
    }
  };

  /* ===================== AUTH ERROR HANDLER ===================== */
  const handleAuthError = (error, fallbackMessage) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.", {
        onClose: () => {
          localStorage.clear();
          navigate("/login");
        },
      });
    } else {
      toast.error(error.response?.data?.message || fallbackMessage);
    }
  };

  /* ===================== SEARCH (CURRENT PAGE ONLY) ===================== */
  const filteredSurgeons = surgeons.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-700 to-pink-500 bg-clip-text text-transparent mb-2 tracking-tight">
            Assistant Surgeons
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Manage assistant surgeon profiles and assignments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Surgeons
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {surgeons.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Active Surgeons
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {surgeons.filter((s) => s.is_active).length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Active Hospitals
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {hospitals.filter((h) => h.is_active).length}
            </div>
          </div>
        </div>

        {/* Add Assistant Surgeon Form */}
        <div className="max-w-7xl mx-auto mb-8 animate-[fadeIn_0.8s_ease-out_0.3s_backwards]">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-rose-100 to-pink-50 p-6 border-b-2 border-rose-200">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg">
                  +
                </span>
                Add New Assistant Surgeon
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                  Surgeon Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter assistant surgeon name"
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                  Assign to Hospital
                </label>
                <select
                  value={hospitals_id}
                  onChange={(e) => setHospitals_id(e.target.value)}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-slate-700 bg-white"
                >
                  <option value="">Select Hospital</option>
                  {hospitals
                    .filter((h) => h.is_active)
                    .map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-rose-700 hover:to-pink-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Save Assistant Surgeon
              </button>
            </form>
          </div>
        </div>

        {/* Surgeons List */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out_0.4s_backwards]">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-rose-50 to-white p-6 border-b-2 border-rose-200">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="m21 21-4.35-4.35" strokeWidth="2" />
              </svg>
              <input
                type="text"
                placeholder="Search by surgeon name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="py-20 px-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Loading surgeons...</p>
            </div>
          ) : filteredSurgeons.length === 0 ? (
            // Empty State
            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">👨‍⚕️</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Assistant Surgeons Found
              </h3>
              <p className="text-slate-500 text-lg">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Add your first assistant surgeon to get started"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-rose-100 to-pink-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSurgeons.map((surgeon, index) => (
                      <tr
                        key={surgeon.id}
                        className="hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-semibold text-slate-800">
                            {surgeon.name}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              toggleActiveStatus(surgeon.id, surgeon.is_active)
                            }
                            className="transition-transform hover:scale-110"
                          >
                            {surgeon.is_active ? (
                              <PiToggleRightFill className="text-green-500 text-4xl cursor-pointer" />
                            ) : (
                              <PiToggleLeftFill className="text-slate-300 text-4xl cursor-pointer hover:text-slate-400" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {filteredSurgeons.map((surgeon, index) => (
                  <div
                    key={surgeon.id}
                    className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-5 shadow-lg border border-rose-200"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-rose-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl">
                          👨‍⚕️
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">
                            {surgeon.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Assistant Surgeon
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-lg text-xs font-bold shadow-lg">
                        #{(page - 1) * 10 + index + 1}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-semibold text-slate-500 block">
                          Status
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            surgeon.is_active
                              ? "text-green-600"
                              : "text-slate-500"
                          }`}
                        >
                          {surgeon.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          toggleActiveStatus(surgeon.id, surgeon.is_active)
                        }
                        className="transition-transform hover:scale-110"
                      >
                        {surgeon.is_active ? (
                          <PiToggleRightFill className="text-green-500 text-5xl" />
                        ) : (
                          <PiToggleLeftFill className="text-slate-300 text-5xl" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-rose-50 to-white px-6 py-5 border-t-2 border-rose-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-rose-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-rose-600 hover:to-pink-500 hover:text-white hover:border-rose-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
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

export default AddAssistant;