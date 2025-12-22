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
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setSurgeries(res.data.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch surgeries");
      }
      setLoading(false);
    };

    fetchSurgeries();
  }, []);

  // Only show max 5 and avoid null patient_detail
  const displayData = surgeries
    .filter((s) => s.patient_detail)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg">
      {loading ? (
        <Loader />
      ) : displayData.length === 0 ? (
        <div className="text-gray-500 text-center py-6">No recent surgeries found.</div>
      ) : (
        <div className="overflow-y-auto max-h-[350px] border rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-50 sticky top-0 z-10">
              <tr>
                <TableHead>Date of Surgery</TableHead>
                <TableHead>Patient Name</TableHead>
              </tr>
            </thead>

            <tbody>
              {displayData.map((surgery, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  <TableCell>
                    {new Date(surgery.created_at).toISOString().split("T")[0]}
                  </TableCell>

                  <TableCell>
                    {`${surgery.patient_detail.first_name} ${surgery.patient_detail.last_name}`}
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

// Reusable table components
const TableHead = ({ children }) => (
  <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-6 py-3 text-gray-700 border-b">{children}</td>
);
