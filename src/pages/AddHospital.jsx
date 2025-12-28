import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { URL } from "../components/URL";

const AddHospital = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ===================== RESET SEARCH =====================
  const handleReset = () => {
    setSearchTerm("");
  };

  // ===================== FETCH HOSPITALS =====================
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/hospital?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(res.data?.data || []);
      setLastPage(res.data?.meta?.last_page || 1);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to fetch hospitals");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [page]);

  // ===================== ADD HOSPITAL =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error("Both name and address are required");
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/hospital`,
        { name, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prev) => [res.data.hospital, ...prev]);
        setName("");
        setAddress("");
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
        toast.error(err.response?.data?.message || "Failed to add hospital");
      }
    }
  };

  // ===================== TOGGLE ACTIVE STATUS =====================
  const toggleActiveStatus = async (hospitalId, currentStatus) => {
    try {
      const res = await axios.get(
        `${URL}/activate-hospital/${hospitalId}?is_active=${!currentStatus}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setHospitals((prev) =>
          prev.map((h) =>
            h.id === hospitalId ? { ...h, is_active: !currentStatus } : h
          )
        );
        toast.success(
          `Hospital marked as ${!currentStatus ? "Active" : "Inactive"}`
        );
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
        toast.error(err.response?.data?.message || "Failed to update status");
      }
    }
  };

  // ===================== FILTER HOSPITALS =====================
  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Your Hospitals - Trauma Registry</title>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-700 to-amber-500 bg-clip-text text-transparent mb-2 tracking-tight">
            Hospital Management
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Add and manage hospital facilities in the registry
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Hospitals
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {hospitals.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Active Hospitals
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {hospitals.filter((h) => h.is_active).length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Current Page
            </div>
            <div className="text-3xl font-bold text-slate-900">{page}</div>
          </div>
        </div>

        {/* Add Hospital Form */}
        <div className="max-w-7xl mx-auto mb-8 animate-[fadeIn_0.8s_ease-out_0.3s_backwards]">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-100 to-amber-50 p-6 border-b-2 border-orange-200">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-lg">
                  +
                </span>
                Add New Hospital
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                  Hospital Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter hospital name"
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter hospital address"
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-slate-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-amber-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Save Hospital
              </button>
            </form>
          </div>
        </div>

        {/* Hospital List */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out_0.4s_backwards]">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-orange-50 to-white p-6 border-b-2 border-orange-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
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
                  placeholder="Search by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 hover:text-white hover:border-orange-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="py-20 px-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-medium">Loading hospitals...</p>
            </div>
          ) : filteredHospitals.length === 0 ? (
            // Empty State
            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-100 to-amber-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Hospitals Found
              </h3>
              <p className="text-slate-500 text-lg">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Add your first hospital to get started"}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-100 to-amber-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredHospitals.map((hospital, index) => (
                      <tr
                        key={hospital.id}
                        className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-semibold text-slate-800">
                            {hospital.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {hospital.address}
                        </td>
                        <td className="px-6 py-5">
                          <button
                            onClick={() =>
                              toggleActiveStatus(hospital.id, hospital.is_active)
                            }
                            className="transition-transform hover:scale-110"
                          >
                            {hospital.is_active ? (
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
                {filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-5 shadow-lg border border-orange-200"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-orange-200">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          {hospital.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {hospital.address}
                        </p>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg text-xs font-bold shadow-lg">
                        #{(page - 1) * 10 + index + 1}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-semibold text-slate-500 block">
                          Hospital Status
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            hospital.is_active
                              ? "text-green-600"
                              : "text-slate-500"
                          }`}
                        >
                          {hospital.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          toggleActiveStatus(hospital.id, hospital.is_active)
                        }
                        className="transition-transform hover:scale-110"
                      >
                        {hospital.is_active ? (
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
              <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-5 border-t-2 border-orange-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 hover:text-white hover:border-orange-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-orange-600 hover:to-amber-500 hover:text-white hover:border-orange-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="mx-6 mb-6 bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3">
              <svg
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
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

export default AddHospital;