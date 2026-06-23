import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "./URL";
import Loader from "./Loader";

const RecentPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = Array.isArray(res.data?.data)
          ? res.data.data
          : res.data?.patients || [];

        setPatients(data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Error fetching patients");
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  // Only show max 5 patients
  const displayData = patients.slice(0, 5);

  const getPatientDisplayName = (patient) => {
    if (!patient) return "Unknown";
    const first = patient.first_name || patient.name || patient.full_name || patient.patient_name || "";
    const last = patient.last_name || patient.surname || "";
    const combined = `${first} ${last}`.trim();
    return combined || "Unknown";
  };

  return (
    <div className="bg-white rounded-lg">
      {loading ? (
        <Loader />
      ) : displayData.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          <span className="block text-4xl mb-2">🧑‍⚕️</span>
          No recent patients found.
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[350px] border rounded-md">
          <table className="min-w-full text-sm table-auto border-separate border-spacing-0">
            <thead className="bg-indigo-100 sticky top-0 z-10">
              <tr>
                <TableHead>Name</TableHead>
                <TableHead>Hospital Number</TableHead>
              </tr>
            </thead>
            <tbody>
              {displayData.map((patient, index) => (
                <tr
                  key={patient.id || index}
                  className={`hover:bg-gray-50 cursor-pointer transition-all duration-150 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <TableCell>{getPatientDisplayName(patient)}</TableCell>
                  <TableCell>{patient.hospital_number || patient.hospital_no || patient.hospitalNumber || "-"}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentPatients;

// Reusable table components
const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-3 text-gray-700 border-b">{children}</td>
);
