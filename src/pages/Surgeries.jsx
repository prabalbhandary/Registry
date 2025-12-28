import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  /* ---------------- FETCH PATIENTS ---------------- */
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?treatment_status=surgery&page=${page}`,
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

  /* ---------------- SEARCH (CLIENT SIDE, CURRENT PAGE) ---------------- */
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.mechanism_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  const handlePatientClick = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/surgery");
  };

  if (loading) return <Loader />;

  return (
    <>
      <title>Surgeries - Trauma Registry</title>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight">
            Surgery Patients
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Manage surgical cases and treatment records
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Surgery Cases
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {patients.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Current Page
            </div>
            <div className="text-3xl font-bold text-slate-900">{page}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
          <div className="bg-gradient-to-r from-purple-50 to-white p-6 border-b-2 border-purple-200">
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
                placeholder="Search by name, hospital no, phone..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
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
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-indigo-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Surgery Patients Found
              </h3>
              <p className="text-slate-500 text-lg">
                Try adjusting your search criteria or check back later
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-indigo-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Hospital No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Mechanism
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Incident Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((patient, index) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 hover:scale-[1.002]"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td
                          className="px-6 py-5 cursor-pointer"
                          onClick={() => handlePatientClick(patient.id)}
                        >
                          <span className="font-semibold text-purple-700 hover:text-purple-600 hover:underline transition-colors">
                            {patient.first_name} {patient.last_name}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-bold text-purple-700 font-mono">
                            {patient.hospital_number}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.phone_number}
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-200 text-purple-800 rounded-lg text-sm font-semibold border border-purple-300">
                            {patient.mechanism_of_injury}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.incident_date
                            ? new Date(patient.incident_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "—"}
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
                    onClick={() => handlePatientClick(patient.id)}
                    className="cursor-pointer bg-gradient-to-br from-white to-purple-50 rounded-2xl p-5 shadow-lg border border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-purple-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <p className="text-sm font-bold text-purple-600 font-mono">
                          {patient.hospital_number}
                        </p>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg text-xs font-bold shadow-lg">
                        #{(page - 1) * 10 + index + 1}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Contact
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.phone_number}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Mechanism
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.mechanism_of_injury}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Incident Date
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.incident_date
                            ? new Date(patient.incident_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-5 border-t-2 border-purple-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 hover:text-white hover:border-purple-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 hover:text-white hover:border-purple-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
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

export default Patients;