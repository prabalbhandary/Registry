import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../components/URL";

const SelectPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  const navigate = useNavigate();

  const [primarySurgeon, setPrimarySurgeon] = useState("Dr. Shubham");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/surgeon-detail`, {
        surgeon_name: primarySurgeon,
        hospitals_id: Number(hospitals[0].id),
        assistant_surgeones: assistantSurgeons
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/create-surgery");
        localStorage.setItem("surgeonDetailId", JSON.stringify(res.data.data.id));
      }
      console.log(res)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }

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

        console.log("Fetched hospitals:", hospitalsData);

        const activeHospitals = hospitalsData.filter(
          (hospital) => hospital.is_active
        );

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
        setAssistantSurgeons(surgeons);
        console.log("Assistant surgeons:", surgeons);
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
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h1 className="text-lg font-semibold mb-2 text-gray-700">
          Select Assistant Surgeon
        </h1>
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Assistant Surgeon</option>
          {assistantSurgeons.map((assistantSurgeon) => (
            <option key={assistantSurgeon.id} value={assistantSurgeon.id}>
              {assistantSurgeon.name}
            </option>
          ))}
        </select>
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
