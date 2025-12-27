import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { URL } from "../components/URL";

const AddHospital = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ===================== RESET SEARCH =====================
  const handleReset = () => {
    setSearchTerm("");
  };

  // ===================== FETCH HOSPITALS =====================
  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/hospital?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(res.data?.data || []);
      setLastPage(res.data?.meta?.last_page || 1);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to fetch hospitals");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [page]);

  // ===================== ADD HOSPITAL =====================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error("Both name and address are required");
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/hospital`,
        { name, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prev) => [res.data.hospital, ...prev]);
        setName("");
        setAddress("");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to add hospital");
      }
    }
  };

  // ===================== TOGGLE ACTIVE STATUS =====================
  const toggleActiveStatus = async (hospitalId, currentStatus) => {
    try {
      const res = await axios.get(
        `${URL}/activate-hospital/${hospitalId}?is_active=${!currentStatus}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setHospitals((prev) =>
          prev.map((h) =>
            h.id === hospitalId ? { ...h, is_active: !currentStatus } : h
          )
        );
        toast.success(
          `Hospital marked as ${!currentStatus ? "Active" : "Inactive"}`
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to update status");
      }
    }
  };

  // ===================== FILTER HOSPITALS =====================
  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Your Hospitals - Trauma Registry</title>

      {/* ===================== ADD HOSPITAL FORM ===================== */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Add Hospital
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700">
              Save Hospital
            </button>
          </form>
        </div>
      </section>

      {/* ===================== HOSPITAL LIST ===================== */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            All Hospitals
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder="Search by name or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white py-2 px-4 rounded-md"
              >
                Reset
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-6">Loading hospitals...</p>
          ) : filteredHospitals.length === 0 ? (
            <p className="text-center py-6 text-gray-500">
              No hospitals found.
            </p>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto mt-6">
                <table className="min-w-full text-sm sm:text-base border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">S.No</th>
                      <th className="px-4 py-3 text-left font-medium">Name</th>
                      <th className="px-4 py-3 text-left font-medium">Address</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHospitals.map((hospital, index) => (
                      <tr key={hospital.id} className="border-t">
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{hospital.name}</td>
                        <td className="px-4 py-3">{hospital.address}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              toggleActiveStatus(hospital.id, hospital.is_active)
                            }
                          >
                            {hospital.is_active ? (
                              <PiToggleRightFill className="text-green-500 text-3xl cursor-pointer" />
                            ) : (
                              <PiToggleLeftFill className="text-gray-400 text-3xl cursor-pointer" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4 mt-6">
                {filteredHospitals.map((hospital, index) => (
                  <div
                    key={hospital.id}
                    className="bg-white rounded-lg border shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {hospital.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {hospital.address}
                        </p>
                      </div>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded ml-2">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t">
                      <span className="text-sm text-gray-600 font-medium">
                        Status:
                      </span>
                      <button
                        onClick={() =>
                          toggleActiveStatus(hospital.id, hospital.is_active)
                        }
                        className="flex items-center gap-2"
                      >
                        {hospital.is_active ? (
                          <>
                            <PiToggleRightFill className="text-green-500 text-3xl cursor-pointer" />
                            <span className="text-sm font-medium text-green-600">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <PiToggleLeftFill className="text-gray-400 text-3xl cursor-pointer" />
                            <span className="text-sm font-medium text-gray-500">
                              Inactive
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">
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

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AddHospital;
