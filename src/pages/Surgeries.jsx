import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  /* ---------------- FETCH PATIENTS ---------------- */
  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?treatment_status=surgery&page=${page}`,
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
          error.response?.data?.message || "Failed to fetch patients"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [page]);

  /* ---------------- SEARCH (CLIENT SIDE, CURRENT PAGE) ---------------- */
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.mechanism_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  const handlePatientClick = (patientId) => {
    localStorage.setItem("patientId", patientId);
    navigate("/surgery");
  };

  if (loading) return <Loader />;

  return (
    <>
      <title>Surgeries - Trauma Registry</title>

      <div className="p-6 min-h-[300px]">
        {/* Search */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search by name, hospital no, phone..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-1/2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Empty State */}
        {filteredPatients.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center text-gray-500">
            No surgery patients found.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Hospital No</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Mechanism</TableHead>
                    <TableHead>Incident Date</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient, index) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <TableCell>
                        {(page - 1) * 10 + index + 1}
                      </TableCell>

                      <td
                        className="px-4 py-3 border-b text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handlePatientClick(patient.id)}
                      >
                        {patient.first_name} {patient.last_name}
                      </td>

                      <TableCell>{patient.hospital_number}</TableCell>
                      <TableCell>{patient.phone_number}</TableCell>
                      <TableCell>{patient.mechanism_of_injury}</TableCell>
                      <TableCell>{patient.incident_date}</TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

export default Patients;

/* ---------------- UI HELPERS ---------------- */

const TableHead = ({ children }) => (
  <th className="px-4 py-3 border-b text-left font-semibold">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="px-4 py-3 border-b">{children}</td>
);
