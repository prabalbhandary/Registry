import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPatients(res.data.data || []);
      } catch (error) {
        toast.error("Error fetching patients");
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
    <>
      <title>Patients - Trauma Registry</title>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Hospital Number</th>
                <th className="border px-4 py-2">Contact Number</th>
                <th className="border px-4 py-2">Mechanism of Injury</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td
                    className="border px-4 py-2 cursor-pointer text-blue-600 underline"
                    onClick={() => {
                      localStorage.setItem("patientId", patient.id);
                      navigate("/surgery");
                    }}
                  >
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td className="border px-4 py-2">
                    {patient.hospital_number}
                  </td>
                  <td className="border px-4 py-2">{patient.phone_number}</td>
                  <td className="border px-4 py-2">
                    {patient.mechanism_of_injury}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Patients;
