import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";


const Patients = () => {
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

  return (
    <>
      <title>Patients - Trauma Registry</title>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Patients</h1>
        {loading ? (
          <p>Loading...</p>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Age</th>
                  <th className="border px-4 py-2">Gender</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{patient.first_name} {patient.last_name}</td>
                    <td className="border px-4 py-2">{patient.age}</td>
                    <td className="border px-4 py-2">{patient.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Patients;
