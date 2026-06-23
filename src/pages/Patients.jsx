import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Surgeries = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  /* ---------- FETCH PATIENTS ---------- */
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?treatment_status=follow_up&page=${page}`,
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
          error.response?.data?.message || "Failed to fetch patients detail"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  /* ---------- SEARCH (CURRENT PAGE ONLY) ---------- */
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.type_of_injury?.toLowerCase().includes(searchLower) ||
      patient.femur_fracture?.diagnosis?.toLowerCase().includes(searchLower)
    );
  });

  const handleClick = (patientId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (patientId) {
      localStorage.setItem("patient_detail_id", patientId);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <title>Trauma Registry - Follow Up</title>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 p-4 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent mb-2 tracking-tight">
            Follow-Up Patients
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Manage and track patient follow-up appointments
          </p>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-[fadeIn_0.8s_ease-out_0.2s_backwards]">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Total Follow-Ups
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {patients.length}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Current Page
            </div>
            <div className="text-3xl font-bold text-slate-900">{page}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
          <div className="bg-gradient-to-r from-emerald-50 to-white p-6 border-b-2 border-emerald-200">
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
                placeholder="Search by name, hospital no, injury type..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-slate-700 placeholder:text-slate-400"
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
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No Follow-Up Patients Found
              </h3>
              <p className="text-slate-500 text-lg">
                Try adjusting your search criteria or check back later
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-emerald-100 to-teal-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        #
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
                        Hospital No.
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Injury Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Follow-up Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Arrived At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((patient, index) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 hover:scale-[1.002]"
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-semibold text-slate-500">
                            {(page - 1) * 10 + index + 1}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <Link
                            to={`/followup/${patient.id}`}
                            onClick={() => handleClick(patient.id)}
                            className="font-semibold text-emerald-700 hover:text-emerald-600 hover:underline transition-colors"
                          >
                            {patient.name}
                          </Link>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.age}
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.gender}
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-bold text-emerald-700 font-mono">
                            {patient.hospital_number}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-teal-100 to-emerald-200 text-emerald-800 rounded-lg text-sm font-semibold border border-emerald-300">
                            {patient.type_of_injury}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-lg text-sm font-semibold border border-amber-300 capitalize">
                            {patient.treatment_status_label || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-700">
                          {patient.arrival_date} - {patient.arrival_time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden p-4 space-y-4">
                {filteredPatients.map((patient, index) => (
                  <Link
                    key={patient.id}
                    to={`/followup/${patient.id}`}
                    onClick={() => handleClick(patient.id)}
                    className="block bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-5 shadow-lg border border-emerald-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-emerald-200">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                          {patient.name}
                        </h3>
                        <p className="text-sm font-bold text-emerald-600 font-mono">
                          {patient.hospital_number}
                        </p>
                      </div>
                      <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-xs font-bold shadow-lg">
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
                          Injury Type
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.type_of_injury}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-500">
                          Status
                        </span>
                        <span className="inline-block px-2.5 py-1 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-lg text-xs font-semibold border border-amber-300 capitalize">
                          {patient.treatment_status_label || "—"}
                        </span>
                      </div>
                      {patient.femur_fracture?.diagnosis && (
                        <div className="pt-3 mt-3 border-t border-emerald-200">
                          <span className="text-sm font-semibold text-slate-500 block mb-1">
                            Femur Fracture Diagnosis
                          </span>
                          <span className="text-sm text-slate-700">
                            {patient.femur_fracture.diagnosis}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-semibold text-slate-500">
                          Arrived At
                        </span>
                        <span className="text-base font-medium text-slate-800">
                          {patient.arrival_date} - {patient.arrival_time}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="bg-gradient-to-r from-emerald-50 to-white px-6 py-5 border-t-2 border-emerald-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:text-white hover:border-emerald-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
                >
                  ← Previous
                </button>

                <span className="text-base font-semibold text-slate-600">
                  Page {page} of {lastPage}
                </span>

                <button
                  onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                  disabled={page === lastPage}
                  className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:text-white hover:border-emerald-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-300 transition-all duration-300"
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

export default Surgeries;