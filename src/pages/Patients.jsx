import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Surgeries = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  /* ---------- SCREEN SIZE ---------- */
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- FETCH PATIENTS ---------- */
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?treatment_status=follow_up&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPatients(res.data?.data || []);
      setLastPage(res.data?.meta?.last_page || 1);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch patients detail"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  /* ---------- SEARCH (CURRENT PAGE ONLY) ---------- */
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.type_of_injury?.toLowerCase().includes(searchLower) ||
      patient.femur_fracture?.diagnosis
        ?.toLowerCase()
        .includes(searchLower)
    );
  });

  const handleClick = (patientId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (patientId) {
      localStorage.setItem("patient_detail_id", patientId);
    }
  };

  /* -------------------- MOBILE CARDS -------------------- */
  const renderCards = () =>
    filteredPatients.map((patient, index) => (
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
            #{(page - 1) * 10 + index + 1}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <CardItem label="Age" value={patient.age} />
          <CardItem label="Gender" value={patient.gender} />
          <CardItem label="Hospital No." value={patient.hospital_number} />
          <CardItem label="Injury Type" value={patient.type_of_injury} />
        </div>

        {patient.femur_fracture && (
          <CardText
            label="Femur Fracture Diagnosis"
            value={patient.femur_fracture.diagnosis}
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
              <th
                key={i}
                className="px-4 py-3 border-b text-left font-medium"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={patient.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3 border-b">
                {(page - 1) * 10 + index + 1}
              </td>

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
                {patient.treatment_status_label || "—"}
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
    <>
      <title>Trauma Registry - Follow Up</title>

      <div className="p-6 min-h-[300px]">
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Search */}
            <div className="mb-6 flex items-center justify-end">
              <input
                type="text"
                placeholder="Search by name, hospital no, injury type..."
                className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Results */}
            {filteredPatients.length === 0 ? (
              <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
                No matching patients found.
              </div>
            ) : isSmallScreen ? (
              renderCards()
            ) : (
              renderTable()
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {lastPage}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                disabled={page === lastPage}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
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
