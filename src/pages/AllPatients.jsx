import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // (No modal/assistant state needed — navigate to pages directly)

  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPatients(res.data?.data || []);
      setLastPage(res.data?.meta?.last_page || 1);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch patients"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  // no assistant fetch — surgery selection handled on Surgery page

  const handleSaveToFollowUp = (patient) => {
    // Save patient id for FollowUp page and navigate
    localStorage.setItem("patient_detail_id", patient.id);
    navigate(`/followup/${patient.id}`);
  };

  const handleSaveToSurgery = (patient) => {
    // Save patient id for Surgery page and navigate
    localStorage.setItem("patientId", patient.id);
    navigate(`/surgery`);
  };

  // surgery confirmation handled in Surgery page

  // Client-side search (current page only)
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.type_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <Loader />;

  return (
    <>
      <title>Trauma Registry - All Patients</title>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2 tracking-tight">
            Patient Registry
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Comprehensive trauma patient records and management
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Patients
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {patients.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Current Page
            </div>
            <div className="text-3xl font-bold text-slate-900">{page}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Filtered Results
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {filteredPatients.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out_0.4s_backwards]">
          {/* Search Section */}
          <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b-2 border-slate-200">
            <div className="relative max-w-md ml-auto">
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
                placeholder="Search by name, hospital number, phone..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Content */}
          {filteredPatients.length === 0 ? (
            // Empty State
            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Patients Found
              </h3>
              <p className="text-slate-500 text-lg">
                Try adjusting your search criteria or browse all patients
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Hospital No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Injury Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Arrival Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((patient, index) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-200 hover:scale-[1.002]"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-bold text-blue-700 font-mono">
                            {patient.hospital_number}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-semibold text-slate-800">
                            {patient.name}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.age}
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.gender}
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.phone_number}
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-lg text-sm font-semibold border border-blue-300">
                            {patient.type_of_injury}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {new Date(patient.arrival_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveToFollowUp(patient)}
                              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-all duration-200 hover:shadow-lg"
                            >
                              FollowUp
                            </button>
                            <button
                              onClick={() => handleSaveToSurgery(patient)}
                              className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all duration-200 hover:shadow-lg"
                            >
                              Surgery
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {filteredPatients.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 shadow-lg border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-slate-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <p className="text-sm font-bold text-blue-600 font-mono">
                          {patient.hospital_number}
                        </p>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg text-xs font-bold shadow-lg">
                        #{(page - 1) * 10 + index + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Age
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.age}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Gender
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.gender}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Phone
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.phone_number}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Injury Type
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.type_of_injury}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Arrival Date
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {new Date(patient.arrival_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-3 border-t-2 border-slate-200">
                        <button
                          onClick={() => handleSaveToFollowUp(patient)}
                          className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-all duration-200 hover:shadow-lg"
                        >
                          FollowUp
                        </button>
                        <button
                          onClick={() => handleSaveToSurgery(patient)}
                          className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all duration-200 hover:shadow-lg"
                        >
                          Surgery
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 py-5 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* (No assistant modal — Surgery handled on Surgery page) */}

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

export default AllPatients;