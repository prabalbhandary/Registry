import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "./URL";
import { toast } from "react-toastify";
import Loader from "./Loader";

const RecentSurgeries = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const res = await axios.get(`${URL}/create-surgery`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setSurgeries(res.data?.data || []);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch surgeries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSurgeries();
  }, []);

  // Filter valid data, sort by id descending, limit to 5
  const displayData = surgeries
    .filter((s) => s)
    .sort((a, b) => (b.id || 0) - (a.id || 0)) // newest first
    .slice(0, 5);

  const getPatientName = (patientDetail) => {
    if (!patientDetail) return "Unknown";
    const first = patientDetail.first_name || patientDetail.name || patientDetail.full_name || patientDetail.patient_name || "";
    const last = patientDetail.last_name || patientDetail.surname || "";
    const combined = `${first} ${last}`.trim();
    return combined || "Unknown";
  };

  const formatDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getSurgeryDate = (surgery) => {
    if (!surgery) return "N/A";

    const candidates = [
      surgery.date_of_surgery,
      surgery.surgery_date,
      surgery.surgery_datetime,
      surgery.operation_date,
      surgery.operation_datetime,
      surgery.date,
      surgery.created_at,
      surgery.updated_at,
      surgery.surgery_at,
      surgery.surgeryDate,
      surgery.patient_detail && surgery.patient_detail.surgery_date,
      surgery.patient_detail && surgery.patient_detail.arrival_date,
      surgery.patient_detail && surgery.patient_detail.incident_date,
    ];

    for (const c of candidates) {
      const formatted = formatDate(c);
      if (formatted) return formatted;
    }

    // If no date found, log the raw surgery item for debugging (dev only)
    // eslint-disable-next-line no-console
    console.debug("RecentSurgeries: missing date for item:", surgery);
    return "N/A";
  };

  return (
    <div className="bg-white rounded-lg">
      {loading ? (
        <Loader />
      ) : displayData.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          No recent surgeries found.
        </div>
      ) : (
        <div className="overflow-y-auto max-h-[350px] border rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-50 sticky top-0 z-10">
              <tr>
                <TableHead>Date of Surgery</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Description</TableHead>
              </tr>
            </thead>

            <tbody>
              {displayData.map((surgery, index) => (
                <tr
                  key={surgery.id || index}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <TableCell>{getSurgeryDate(surgery)}</TableCell>
                  <TableCell>
                    {surgery.patient_detail && typeof surgery.patient_detail === 'object'
                      ? getPatientName(surgery.patient_detail)
                      : (surgery.patient_detail_name || surgery.patient_name || "Unknown")}
                  </TableCell>
                  <TableCell>{surgery.combined_surgery_description || surgery.description || "N/A"}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentSurgeries;

/* ======================
   Reusable Table Components
   ====================== */

const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-3 text-gray-700 border-b">{children}</td>
);
