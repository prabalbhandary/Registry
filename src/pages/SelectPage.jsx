import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { URL } from "../components/URL";
import { FaPlus } from "react-icons/fa6";

const SelectPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedAssistants, setSelectedAssistants] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [primarySurgeon] = useState(user?.name || "");

  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [assistantName, setAssistantName] = useState("");
  const [assistantHospitalId, setAssistantHospitalId] = useState("");

  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedHospital) {
      toast.error("Please select a hospital.");
      return;
    }

    if (selectedAssistants.length === 0) {
      toast.error("Please select at least one assistant surgeon.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/surgeon-detail`, {
        surgeon_name: primarySurgeon,
        hospitals_id: selectedHospital.value,
        assistant_surgeones: selectedAssistants.map((s) => s.value),
      });

      if (res.data.success === true) {
        toast.success(res.data.message);
        localStorage.setItem(
          "surgeonDetailId",
          JSON.stringify(res.data.data.id)
        );
        navigate("/create-surgery");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    }
  };

  const addHospital = async (e) => {
    e.preventDefault();
    if (!hospitalName || !hospitalAddress) {
      toast.error("Both name and address are required");
      return;
    }

    try {
      const res = await axios.post(`${URL}/hospital`, {
        name: hospitalName,
        address: hospitalAddress,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prev) => [
          ...prev,
          {
            value: res.data.hospital.id,
            label: res.data.hospital.name,
          },
        ]);
        setHospitalName("");
        setHospitalAddress("");
        setIsHospitalModalOpen(false);
      }
    } catch (error) {
      console.error("Add hospital error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error adding hospital"
      );
    }
  };

  const addAssistantSurgeon = async (e) => {
    e.preventDefault();
    if (!assistantName || !assistantHospitalId) {
      toast.error("Both name and hospital are required");
      return;
    }

    try {
      const res = await axios.post(`${URL}/assistant-surgeone`, {
        name: assistantName,
        hospitals_id: Number(assistantHospitalId),
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/add-assistant");
        setAssistantSurgeons((prev) => [
          ...prev,
          { value: assistantName, label: assistantName },
        ]);
        setAssistantName("");
        setAssistantHospitalId("");
        setIsAssistantModalOpen(false);
      }
    } catch (error) {
      console.error("Add assistant surgeon error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add assistant surgeon"
      );
    }
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`);
        const hospitalsData = Array.isArray(res.data)
          ? res.data
          : res.data?.data;

        if (!Array.isArray(hospitalsData)) {
          throw new Error("Invalid hospitals data structure");
        }

        const activeHospitals = hospitalsData
          .filter((hospital) => hospital.is_active)
          .map((hospital) => ({
            value: hospital.id,
            label: hospital.name,
          }));

        setHospitals(activeHospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        toast.error("Failed to load hospitals.");
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeone`);
        const surgeons = res?.data?.data;

        if (!Array.isArray(surgeons)) {
          throw new Error("Invalid assistant surgeons data");
        }

        const options = surgeons.map((s) => ({
          value: s.name,
          label: s.name,
        }));

        setAssistantSurgeons(options);
        localStorage.setItem("assistantSurgeons", JSON.stringify(surgeons));
      } catch (error) {
        console.error("Error fetching assistant surgeons:", error);
        toast.error("Failed to load assistant surgeons.");
      }
    };

    fetchAssistantSurgeons();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2 text-gray-700">
          Select Hospital
        </h1>
        <div className="flex items-center w-full">
          <div className="relative flex-1">
            <Select
              options={hospitals}
              value={selectedHospital}
              onChange={setSelectedHospital}
              placeholder="Select Hospital"
            />
          </div>
          <button
            onClick={() => setIsHospitalModalOpen(true)}
            className="p-3 bg-blue-500 ml-1 text-white rounded-md hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2 text-gray-700">
          Select Assistant Surgeon(s)
        </h1>
        <div className="flex items-center w-full">
          <div className="relative flex-1">
            <Select
              isMulti
              options={assistantSurgeons}
              value={selectedAssistants}
              onChange={setSelectedAssistants}
              placeholder="Select Assistant Surgeons"
            />
          </div>
          <button
            onClick={() => setIsAssistantModalOpen(true)}
            className="p-3 bg-blue-500 ml-1 text-white rounded-md hover:bg-blue-600"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>

      {/* Hospital Modal */}
      {isHospitalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Hospital</h2>
            <input
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="text"
              placeholder="Address"
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsHospitalModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={addHospital}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assistant Surgeon Modal */}
      {isAssistantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Add Assistant Surgeon
            </h2>
            <input
              type="text"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
              placeholder="Assistant Surgeon Name"
              className="w-full p-2 border rounded mb-4"
            />
            <select
              value={assistantHospitalId}
              onChange={(e) => setAssistantHospitalId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.value} value={hospital.value}>
                  {hospital.label}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAssistantModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={addAssistantSurgeon}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPage;
