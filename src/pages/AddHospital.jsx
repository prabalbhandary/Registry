import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";

const AddHospital = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`);
        setHospitals(res.data.data);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
        toast.error("Failed to load hospitals.");
      }
    };
    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error("Both name and address are required");
      return;
    }

    try {
      const res = await axios.post(`${URL}/hospital`, { name, address });
      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prev) => [...prev, res.data.hospital]);
        setName("");
        setAddress("");
      }
    } catch (err) {
      console.error("Add hospital error:", err);
      toast.error(err?.response?.data?.message || "Error adding hospital");
      setError(err.response?.data?.error);
    }
  };

  const toggleActiveStatus = async (hospitalId, currentStatus) => {
    try {
      const res = await axios.get(`${URL}/activate-hospital/${hospitalId}`, {
        is_active: !currentStatus,
      });

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
      console.error("Toggle status error:", err);
      toast.error(err.message || "Failed to update hospital status.");
    }
  };

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Your Hospitals - Trauma Registry</title>

      {/* Add Hospital Form */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            Add Hospital
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="hospital_name"
                className="block font-semibold text-gray-700 mb-2"
              >
                Hospital Name
              </label>
              <input
                type="text"
                id="hospital_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Hospital
            </button>
          </form>
        </div>
      </section>

      {/* Hospital List with Toggle */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
            All Hospitals
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder="Search Hospitals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto mt-6">
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
                  <tr key={hospital.id} className="border-b">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{hospital.name}</td>
                    <td className="px-4 py-3">{hospital.address}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          toggleActiveStatus(hospital.id, hospital.is_active)
                        }
                        className="text-xl"
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
