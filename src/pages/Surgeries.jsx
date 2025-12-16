import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

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

        const filteredPatients = res.data.data.filter(
          (patient) =>
            patient.femur_fracture?.treatment_status === "surgery"
        );

        setPatients(filteredPatients);
      } catch (error) {
        toast.error("Error fetching patients");
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return (
    <>
      <title>Surgeries - Trauma Registry</title>

      <div className="p-6 min-h-[300px]">
        {loading ? (
          <Loader />
        ) : patients.length === 0 ? (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            No patients found.
          </div>
        ) : (
          <div className="overflow-auto rounded-lg shadow-sm border border-gray-200">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Hospital Number</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Mechanism of Injury</TableHead>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{index + 1}</TableCell>

                    <td
                      className="px-4 py-3 border-b text-blue-600 font-medium cursor-pointer hover:underline"
                      onClick={() => {
                        localStorage.setItem("patientId", patient.id);
                        navigate("/surgery");
                      }}
                    >
                      {patient.first_name} {patient.last_name}
                    </td>

                    <TableCell>{patient.hospital_number}</TableCell>
                    <TableCell>{patient.phone_number}</TableCell>
                    <TableCell>{patient.mechanism_of_injury}</TableCell>
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

// Reusable UI components
const TableHead = ({ children }) => (
  <th className="px-4 py-3 border-b font-semibold text-left">{children}</th>
);

const TableCell = ({ children }) => (
  <td className="px-4 py-3 border-b">{children}</td>
);
