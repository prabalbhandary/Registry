import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "./URL";
import { toast } from "react-toastify";

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
        setSurgeries(res.data.data);
      } catch (error) {
        console.error("Failed to fetch surgeries:", error);
        toast.error(
          error.response?.data?.message || "Failed to fetch surgeries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSurgeries();
  }, []);

  // Option 1: Display max 5 surgeries (and skip null patient_detail)
  const displayData = (
    surgeries.length > 5 ? surgeries.slice(0, 5) : surgeries
  ).filter((surgery) => surgery.patient_detail !== null);

  return (
    <div className="bg-white rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">
        Recent Surgeries
      </p>
      {loading ? (
        <p className="text-gray-600 px-6 py-4">Loading...</p>
      ) : (
        <div className="overflow-y-auto" style={{ maxHeight: "350px" }}>
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                  Date of Surgery
                </th>
                <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                  Patient Name
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((surgery, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {new Date(surgery.created_at).toISOString().split("T")[0]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">
                    {surgery.patient_detail
                      ? `${surgery.patient_detail.first_name} ${surgery.patient_detail.last_name}`
                      : "Unknown"}
                  </td>
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
