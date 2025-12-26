import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { URL } from "../components/URL";
import { FaPlus } from "react-icons/fa6";

const selectStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

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

  const handleSubmit = async () => {
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

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem(
          "surgeonDetailId",
          JSON.stringify(res.data.data.id)
        );
        navigate("/create-surgery");
      }
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
            error.response?.data?.message || "Failed to fetch surgeon detail"
          );
        }
    }
  };

  useEffect(() => {
    try {
    axios.get(`${URL}/hospital`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
      const data = res?.data?.data || [];
      setHospitals(
        data
          .filter((h) => h.is_active)
          .map((h) => ({ value: h.id, label: h.name }))
      );
    });
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
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`${URL}/assistant-surgeone`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }).then((res) => {
      const data = res?.data?.data || [];
      setAssistantSurgeons(
        data.map((s) => ({ value: s.name, label: s.name }))
      );
    });
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
    }
  }, []);

  return (
    <>
      <title>Select Page - Trauma Registry</title>
      <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg relative z-10">
      {/* Hospital */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2">Select Hospital</h1>
        <div className="flex">
          <Select
            styles={selectStyles}
            menuPortalTarget={document.body}
            options={hospitals}
            value={selectedHospital}
            onChange={setSelectedHospital}
            className="flex-1"
            placeholder="Select Hospital"
          />
          <button
            onClick={() => setIsHospitalModalOpen(true)}
            className="ml-2 p-3 bg-blue-500 text-white rounded"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Assistants */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2">
          Select Assistant Surgeon(s)
        </h1>
        <div className="flex">
          <Select
            isMulti
            styles={selectStyles}
            menuPortalTarget={document.body}
            options={assistantSurgeons}
            value={selectedAssistants}
            onChange={setSelectedAssistants}
            className="flex-1"
            placeholder="Select Assistants"
          />
          <button
            onClick={() => setIsAssistantModalOpen(true)}
            className="ml-2 p-3 bg-blue-500 text-white rounded"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between relative z-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {/* Hospital Modal */}
      {isHospitalModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Hospital</h2>
            <input
              className="w-full p-2 border mb-3"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
            />
            <input
              className="w-full p-2 border mb-3"
              placeholder="Address"
              value={hospitalAddress}
              onChange={(e) => setHospitalAddress(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsHospitalModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assistant Modal */}
      {isAssistantModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Assistant</h2>
            <input
              className="w-full p-2 border mb-3"
              placeholder="Assistant Name"
              value={assistantName}
              onChange={(e) => setAssistantName(e.target.value)}
            />
            <select
              className="w-full p-2 border mb-3"
              value={assistantHospitalId}
              onChange={(e) => setAssistantHospitalId(e.target.value)}
            >
              <option value="">Select Hospital</option>
              {hospitals.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAssistantModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default SelectPage;
