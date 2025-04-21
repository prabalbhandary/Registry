import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { URL } from "../components/URL";

const SelectPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedAssistants, setSelectedAssistants] = useState([]);
  const [primarySurgeon, setPrimarySurgeon] = useState("Dr. Shubham");

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
        localStorage.setItem("surgeonDetailId", JSON.stringify(res.data.data.id));
        navigate("/create-surgery");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
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
        <Select
          options={hospitals}
          value={selectedHospital}
          onChange={setSelectedHospital}
          placeholder="Select Hospital"
        />
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2 text-gray-700">
          Select Assistant Surgeon(s)
        </h1>
        <Select
          isMulti
          options={assistantSurgeons}
          value={selectedAssistants}
          onChange={setSelectedAssistants}
          placeholder="Select Assistant Surgeons"
        />
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
    </div>
  );
};

export default SelectPage;
