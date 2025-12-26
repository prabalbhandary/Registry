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

        console.log("API Response:", res.data); // Debug

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
    .filter((s) => s.patient_detail)
    .sort((a, b) => b.id - a.id) // newest first
    .slice(0, 5);

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
                  <TableCell>
                    {`${surgery.patient_detail.first_name} ${surgery.patient_detail.last_name}`}
                  </TableCell>
                  <TableCell>
                    {surgery.combined_surgery_description || "N/A"}
                  </TableCell>
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
