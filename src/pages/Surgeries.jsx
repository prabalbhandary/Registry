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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${URL}/patient-detail?treatment_status=surgery`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPatients(res.data.data); // store all surgery patients
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

    fetchPatients();
  }, [navigate]);

  // 🔍 Filter based on search term
  const searchedPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.mechanism_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  // 📅 Filter recent surgeries (last 7 days)
  const today = new Date();
  const recentSurgeries = searchedPatients.filter((patient) => {
    const incidentDate = new Date(patient.incident_date);
    const diffTime = today - incidentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24); // ms → days
    return diffDays <= 7 && patient.treatment_status_label === "Surgery";
  });

  const handlePatientClick = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/surgery");
  };

  return (
    <>
      <title>Recent Surgeries - Trauma Registry</title>

      <div className="p-6 min-h-[300px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6 flex items-center justify-end">
              <input
                type="text"
                placeholder="Search by name, hospital no, phone..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* No recent surgeries fallback */}
            {recentSurgeries.length === 0 ? (
              <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                {patients.length === 0
                  ? "No surgeries found."
                  : "No recent surgeries found."}
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-auto rounded-lg shadow-sm border border-gray-200">
                  <table className="min-w-full text-sm text-gray-800">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Hospital Number</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Mechanism of Injury</TableHead>
                        <TableHead>Incident Date</TableHead>
                      </tr>
                    </thead>

                    <tbody>
                      {recentSurgeries.map((patient, index) => (
                        <tr
                          key={patient.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell>{index + 1}</TableCell>

                          <td
                            className="px-4 py-3 border-b text-blue-600 font-medium cursor-pointer hover:underline"
                            onClick={() => handlePatientClick(patient.id)}
                          >
                            {patient.first_name} {patient.last_name}
                          </td>

                          <TableCell>{patient.hospital_number}</TableCell>
                          <TableCell>{patient.phone_number}</TableCell>
                          <TableCell>
                            {patient.mechanism_of_injury}
                          </TableCell>
                          <TableCell>{patient.incident_date}</TableCell>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {recentSurgeries.map((patient, index) => (
                    <div
                      key={patient.id}
                      className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handlePatientClick(patient.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-blue-600">
                            {patient.first_name} {patient.last_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            #{patient.hospital_number}
                          </p>
                        </div>

                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contact:</span>
                          <span className="font-medium">
                            {patient.phone_number}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Mechanism of Injury:
                          </span>
                          <span className="font-medium text-right ml-2">
                            {patient.mechanism_of_injury}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-600">Incident Date:</span>
                          <span className="font-medium">{patient.incident_date}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t text-center">
                        <span className="text-blue-600 text-sm font-medium">
                          Tap to view details →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Patients;

/* ---------------- Reusable UI Components ---------------- */

const TableHead = ({ children }) => (
  <th className="px-4 py-3 border-b font-semibold text-left">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-4 py-3 border-b">{children}</td>
);
