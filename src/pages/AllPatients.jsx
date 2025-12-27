import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${URL}/patient-detail?page=${page}`,
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

  // Client-side search (current page only)
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.type_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <Loader />;

  return (
    <>
      <title>Trauma Registry - All Patients</title>

      <div className="p-6">
        {/* Search */}
        <div className="flex items-center justify-end mb-4">
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

        {/* Empty States */}
        {filteredPatients.length === 0 ? (
          <p className="text-gray-500 text-center">
            No matching patients found
          </p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Hospital No</th>
                    <th className="px-4 py-3 text-left">Patient Name</th>
                    <th className="px-4 py-3 text-left">Age</th>
                    <th className="px-4 py-3 text-left">Gender</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">Injury Type</th>
                    <th className="px-4 py-3 text-left">Arrival Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient, index) => (
                    <tr
                      key={patient.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">
                        {(page - 1) * 10 + index + 1}
                      </td>
                      <td className="px-4 py-2 font-medium">
                        {patient.hospital_number}
                      </td>
                      <td className="px-4 py-2">
                        {patient.first_name} {patient.last_name}
                      </td>
                      <td className="px-4 py-2">{patient.age}</td>
                      <td className="px-4 py-2">{patient.gender}</td>
                      <td className="px-4 py-2">{patient.phone_number}</td>
                      <td className="px-4 py-2">{patient.type_of_injury}</td>
                      <td className="px-4 py-2">
                        {new Date(
                          patient.arrival_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredPatients.map((patient, index) => (
                <div
                  key={patient.id}
                  className="bg-white rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {patient.first_name} {patient.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        #{patient.hospital_number}
                      </p>
                    </div>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {(page - 1) * 10 + index + 1}
                    </span>
                  </div>

                  <div className="text-sm space-y-1">
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Phone:</strong> {patient.phone_number}</p>
                    <p><strong>Injury:</strong> {patient.type_of_injury}</p>
                    <p>
                      <strong>Arrival:</strong>{" "}
                      {new Date(
                        patient.arrival_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
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

export default AllPatients;
