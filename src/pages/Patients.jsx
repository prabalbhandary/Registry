import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Surgeries = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `${URL}/patient-detail?treatment_status=follow_up`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setPatients(res.data?.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching patients"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleClick = (patientId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (patientId) {
      localStorage.setItem("patient_detail_id", patientId);
    }
  };

  /* -------------------- MOBILE CARDS -------------------- */
  const renderCards = () =>
    patients.map((patient) => (
      <div
        key={patient.id}
        onClick={() => handleClick(patient.id)}
        className="cursor-pointer bg-white rounded-xl shadow-md p-5 mb-5 border hover:shadow-lg transition"
      >
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800">
            {patient.first_name} {patient.last_name}
          </h3>
          <span className="text-xs text-gray-500">
            {new Date(patient.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <CardItem label="Age" value={patient.age} />
          <CardItem label="Gender" value={patient.gender} />
          <CardItem label="Hospital No." value={patient.hospital_number} />
          <CardItem
            label="Injury Type"
            value={patient.type_of_injury}
          />
        </div>

        {patient.femur_fracture && (
          <CardText
            label="Femur Fracture Diagnosis"
            value={patient.femur_fracture.diagonis}
          />
        )}
      </div>
    ));

  /* -------------------- DESKTOP TABLE -------------------- */
  const renderTable = () => (
    <div className="overflow-auto rounded-lg border shadow-sm">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-50">
          <tr>
            {[
              "#",
              "Patient Name",
              "Age",
              "Gender",
              "Hospital No.",
              "Injury Type",
              "Follow-up Status",
              "Created At",
            ].map((head, i) => (
              <th key={i} className="px-4 py-3 border-b text-left font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {patients.map((patient, index) => (
            <tr
              key={patient.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 border-b">{index + 1}</td>

              <td className="px-4 py-3 border-b">
                <Link
                  to={`/followup/${patient.id}`}
                  onClick={() => handleClick(patient.id)}
                  className="text-blue-600 hover:underline"
                >
                  {patient.first_name} {patient.last_name}
                </Link>
              </td>

              <td className="px-4 py-3 border-b">{patient.age}</td>
              <td className="px-4 py-3 border-b">{patient.gender}</td>
              <td className="px-4 py-3 border-b">
                {patient.hospital_number}
              </td>
              <td className="px-4 py-3 border-b">
                {patient.type_of_injury}
              </td>
              <td className="px-4 py-3 border-b capitalize">
                {patient.femur_fracture?.treatment_status || "—"}
              </td>
              <td className="px-4 py-3 border-b">
                {new Date(patient.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 min-h-[300px]">
      {loading ? (
        <Loader />
      ) : patients.length === 0 ? (
        <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
          No follow-up patients found.
        </div>
      ) : isSmallScreen ? (
        renderCards()
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default Surgeries;

/* -------------------- UI HELPERS -------------------- */

const CardItem = ({ label, value }) => (
  <div>
    <p className="font-medium text-gray-700">{label}</p>
    <p className="text-gray-600">{value || "—"}</p>
  </div>
);

const CardText = ({ label, value }) => (
  <div className="mt-3">
    <p className="font-medium text-gray-700">{label}</p>
    <p className="text-sm text-gray-600">{value || "—"}</p>
  </div>
);
