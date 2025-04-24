import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";

const AddAssistant = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSurgeons, setActiveSurgeons] = useState([]);
  const [inactiveSurgeons, setInactiveSurgeons] = useState([]);
  const [error, setError] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [hospitals_id, setHospitals_id] = useState("");

  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeone`);
        const assistantData = res.data?.data || res.data;
        const activeList = assistantData.filter((surgeon) => surgeon.is_active);
        const inactiveList = assistantData.filter(
          (surgeon) => !surgeon.is_active
        );
        setActiveSurgeons(activeList);
        setInactiveSurgeons(inactiveList);
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
        setActiveSurgeons((prev) => [...prev, res.data.assistant_surgeon]);
        setName("");
        setHospitals_id("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error response:", error.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to add assistant surgeon"
      );
      setError(error.response?.data?.error || "");
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
        const surgeonToUpdate =
          activeSurgeons.find((s) => s.id === surgeonId) ||
          inactiveSurgeons.find((s) => s.id === surgeonId);

        if (!surgeonToUpdate) throw new Error("Surgeon not found");

        const updatedSurgeon = {
          ...surgeonToUpdate,
          is_active: !currentStatus,
        };

        if (!currentStatus) {
          setActiveSurgeons((prev) => [...prev, updatedSurgeon]);
          setInactiveSurgeons((prev) => prev.filter((s) => s.id !== surgeonId));
        } else {
          setInactiveSurgeons((prev) => [...prev, updatedSurgeon]);
          setActiveSurgeons((prev) => prev.filter((s) => s.id !== surgeonId));
        }

        toast.success(
          `Surgeon status updated to ${!currentStatus ? "Active" : "Inactive"}`
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.message || "Failed to update surgeon status.");
    }
  };

  const unlinkSurgeon = async (surgeonId) => {
    try {
      const res = await axios.get(
        `${URL}/activate-assistant-surgeone/${surgeonId}`,
        {
          is_active: 0,
        }
      );

      if (res.status === 200) {
        const surgeonToUnlink = activeSurgeons.find((s) => s.id === surgeonId);
        if (!surgeonToUnlink)
          throw new Error("Surgeon not found in active list");

        setActiveSurgeons((prev) => prev.filter((s) => s.id !== surgeonId));
        setInactiveSurgeons((prev) => [...prev, surgeonToUnlink]);

        toast.success("Surgeon has been unlinked and marked as inactive.");
      }
    } catch (error) {
      console.error("Error unlinking surgeon:", error);
      toast.error(error.message || "Failed to unlink surgeon.");
      setError(error.response?.data?.error || "");
    }
  };

  const resetSearch = () => setSearchTerm("");

  const filteredInactiveSurgeons = inactiveSurgeons.filter((surgeon) =>
    surgeon.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      {/* Search and Activate Existing Assistant Surgeons */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Add Existing Assistant Surgeons
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Search Assistant Surgeons and add them
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search Assistant Surgeons"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={resetSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset
          </button>
        </div>

        <div className="mt-6">
          {filteredInactiveSurgeons.map((surgeon) => (
            <div
              key={surgeon.id}
              className="mb-4 p-4 border rounded-md flex justify-between items-center"
            >
              <p className="text-lg font-semibold text-gray-800">
                {surgeon.name}
              </p>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() =>
                  toggleActiveStatus(surgeon.id, surgeon.is_active)
                }
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Add New Assistant Surgeon */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Add New Assistant Surgeons
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Enter name and select hospital
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base md:text-lg text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="hospital"
              className="block text-base md:text-lg text-gray-700 font-semibold mb-2"
            >
              Hospital
            </label>
            <select
              id="hospital"
              value={hospitals_id}
              onChange={(e) => setHospitals_id(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </form>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Active Assistant Surgeons List */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Active Assistant Surgeons
        </h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          List of Active Assistant Surgeons
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-md rounded-lg text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 md:px-6 py-3 text-left text-gray-700 font-medium">
                  S.No
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-gray-700 font-medium">
                  Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-gray-700 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {activeSurgeons.map((surgeon, index) => (
                <tr key={surgeon.id} className="border-b">
                  <td className="px-4 md:px-6 py-3">{index + 1}</td>
                  <td className="px-4 md:px-6 py-3">{surgeon.name}</td>
                  <td className="px-4 md:px-6 py-3">
                    <button
                      onClick={() => unlinkSurgeon(surgeon.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Unlink
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </section>
    </>
  );
};

export default AddAssistant;
