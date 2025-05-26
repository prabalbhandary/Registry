import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "./URL";

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

        // Ensure it's always an array
        const data = Array.isArray(res.data.data)
          ? res.data.data
          : res.data.patients || [];

        setPatients(data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const displayData = patients.length > 5 ? patients.slice(0, 5) : patients;

  return (
    <div className="rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">
        Recent Patients
      </p>

      <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                Name
              </th>
              <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                Hospital Number
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((patient, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {patient.first_name} {patient.last_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {patient.hospital_number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
