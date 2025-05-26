import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [surgeries, setSurgeries] = useState([]);
  const [femurFracture, setFemurFracture] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPatients(res.data.data || []);
      } catch (error) {
        toast.error("Error fetching patients");
      }
    };

    const fetchSurgeries = async () => {
      try {
        const res = await axios.get(`${URL}/create-surgery`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSurgeries(res.data.data || []);
      } catch (error) {
        toast.error("Error fetching surgeries");
      }
    };

    const fetchFemurFracture = async () => {
      try {
        const res = await axios.get(`${URL}/femur-fracture`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFemurFracture(res.data.data || []);
      } catch (error) {
        toast.error("Error fetching femur fractures");
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchPatients(),
        fetchSurgeries(),
        fetchFemurFracture(),
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  const surgeryMap = new Map();
  surgeries.forEach((s) => {
    surgeryMap.set(String(s.patient_detail_id), s);
  });

  const fractureMap = new Map();
  femurFracture.forEach((f) => {
    fractureMap.set(String(f.patient_detail_id), f);
  });

  return (
    <>
      <title>Surgeries - Trauma Registry</title>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Hospital Number</th>
                  <th className="border px-4 py-2">Contact Number</th>
                  <th className="border px-4 py-2">Mechanism of Injury</th>
                  <th className="border px-4 py-2">Fracture Type</th>
                  <th className="border px-4 py-2">Side</th>
                  <th className="border px-4 py-2">Location</th>
                  <th className="border px-4 py-2">Classification</th>
                  <th className="border px-4 py-2">Plan</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => {
                  const surgery = surgeryMap.get(String(patient.id));
                  const fracture = fractureMap.get(String(patient.id));

                  return (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td
                        onClick={() => {
                          navigate(`/surgery`);
                          localStorage.setItem("patientId", patient.id);
                        }}
                        className="border px-4 py-2 cursor-pointer"
                      >
                        {patient.first_name} {patient.last_name}
                      </td>
                      <td className="border px-4 py-2">{patient.hospital_number}</td>
                      <td className="border px-4 py-2">{patient.phone_number}</td>
                      <td className="border px-4 py-2">{patient.mechanism_of_injury}</td>
                      <td className="border px-4 py-2">{fracture?.fracture_type || "N/A"}</td>
                      <td className="border px-4 py-2">{fracture?.fracture_side || "N/A"}</td>
                      <td className="border px-4 py-2">{fracture?.fracture_location || "N/A"}</td>
                      <td className="border px-4 py-2">{fracture?.fracture_classification || "N/A"}</td>
                      <td className="border px-4 py-2">{fracture?.plan || "N/A"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Patients;
