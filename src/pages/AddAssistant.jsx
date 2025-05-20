import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";

const AddAssistant = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [surgeons, setSurgeons] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospitals_id, setHospitals_id] = useState("");


  const handleReset = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeone`);
        setSurgeons(res.data?.data || res.data);
      } catch (error) {
        console.error("Error fetching assistant surgeons:", error);
        toast.error("Failed to load assistant surgeons.");
      }
    };
    fetchAssistantSurgeons();
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`);
        setHospitals(res.data?.data || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to load hospitals.");
      }
    };
    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !hospitals_id) {
      toast.error("Both name and hospital are required");
      return;
    }

    try {
      const res = await axios.post(`${URL}/assistant-surgeone`, {
        name,
        hospitals_id: Number(hospitals_id),
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setSurgeons((prev) => [...prev, res.data.assistant_surgeon]);
        setName("");
        setHospitals_id("");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add assistant surgeon"
      );
    }
  };

  const toggleActiveStatus = async (surgeonId, currentStatus) => {
    try {
      const res = await axios.get(
        `${URL}/activate-assistant-surgeone/${surgeonId}`,
        {
          is_active: !currentStatus,
        }
      );

      if (res.status === 200) {
        const updated = surgeons.map((s) =>
          s.id === surgeonId ? { ...s, is_active: !currentStatus } : s
        );
        setSurgeons(updated);
        toast.success(
          `Surgeon status updated to ${!currentStatus ? "Active" : "Inactive"}`
        );
      }
    } catch (error) {
      toast.error("Failed to update surgeon status.");
    }
  };

  const filteredSurgeons = surgeons.filter((surgeon) =>
    surgeon.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      {/* Form Section */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Add New Assistant Surgeons
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Enter name and select hospital
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-semibold mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2 text-gray-700">
              Hospital
            </label>
            <select
              value={hospitals_id}
              onChange={(e) => setHospitals_id(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </section>

      {/* List Section */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Assistant Surgeons
        </h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Toggle active/inactive status from here
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-md rounded-lg text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">
                  S.No
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSurgeons.map((surgeon, index) => (
                <tr key={surgeon.id} className="border-b">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{surgeon.name}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        toggleActiveStatus(surgeon.id, surgeon.is_active)
                      }
                      className="flex items-center gap-2"
                    >
                      {surgeon.is_active ? (
                        <>
                          <PiToggleRightFill className="text-green-500 text-3xl cursor-pointer" />
                        </>
                      ) : (
                        <>
                          <PiToggleLeftFill className="text-gray-400 text-3xl cursor-pointer" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSurgeons.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No assistant surgeons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AddAssistant;
