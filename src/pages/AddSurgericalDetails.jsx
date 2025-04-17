import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";
import axios from "axios";
import { URL } from "../components/URL";

const AddSurgicalDetails = () => {
  // const navigate = useNavigate();
  // const { id } = useParams();
  // // Milaua baki
  // const [primarySurgeon, setPrimarySurgeon] = useState("Dr. Shubham");
  // const [hospitals, setHospitals] = useState([]); // Store the array of hospitals
  // const [selectedHospital, setSelectedHospital] = useState(null); // Store the selected hospital
  // const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  // const [selectedAssistant, setSelectedAssistant] = useState(null); // Single assistant instead of array
  // const [date, setDate] = useState("");
  // const location = useLocation();
  // const [completedIndex, setCompletedIndex] = useState(location.state?.completedIndex || 1);
  
  // // Parse patientId as an integer
  // const patientId = parseInt(useParams().id, 10); // Now it's an integer

  // useEffect(() => {
  //   const fetchHospitals = async () => {
  //     try {
  //       const res = await axios.get(`${URL}/hospital`);
  //       setHospitals(res.data.data); // Store the array of hospitals
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Something went wrong.");
  //     }
  //   };

  //   fetchHospitals();
  // }, []);

  // useEffect(() => {
  //   const fetchAssistantSurgeons = async () => {
  //     try {
  //       const res = await axios.get(`${URL}/assistant-surgeone`);
  //       setAssistantSurgeons(res.data.data);
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Something went wrong.");
  //     }
  //   };

  //   fetchAssistantSurgeons();
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Validate input
  //   if (!selectedHospital) {
  //     toast.error("Please select a hospital.");
  //     return;
  //   }
  //   if (!patientId) {
  //     toast.error("Patient ID is missing.");
  //     return;
  //   }
  //   if (!date) {
  //     toast.error("Please provide the date of surgery.");
  //     return;
  //   }
  //   if (!selectedAssistant) {
  //     toast.error("Please select an assistant surgeon.");
  //     return;
  //   }
  
  //   // Prepare payload for API based on the required structure
  //   const payload = {
  //     patient_details_id: patientId, // patientId is now mapped to patient_details_id
  //     surgeon_name: primarySurgeon, // primarySurgeon mapped to surgeon_name
  //     hospitals_id: selectedHospital.id, // selectedHospital.id mapped to hospitals_id
  //     assistant_surgeones_id: selectedAssistant, // selectedAssistant mapped to assistant_surgeones_id (single value)
  //     surgery_date: date, // date mapped to surgery_date
  //   };

  //   console.log("Payload to be sent:", payload);

  //   try {
  //     const res = await axios.post(`${URL}/surgical-detail`, payload);
  //     toast.success("Surgical details added successfully.");
  //     setCompletedIndex(2);
  //     navigate(`/patient/${id}/patient-surgical-details`, { state: { completedIndex: 2 } });
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || "Something went wrong.");
  //   }
  // };

  return (
    <>
      <title>Create Surgical Details - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      {/* <section className="py-6 px-4">
        <h1 className="text-3xl font-bold mb-4">Add Surgical Details</h1>
      </section>
      <section className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="primarySurgeon" className="block text-sm font-medium text-gray-700">
              Primary Surgeon
            </label>
            <input
              id="primarySurgeon"
              value={primarySurgeon}
              readOnly
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
              Hospital
            </label>
            <select
              id="hospital"
              value={selectedHospital ? selectedHospital.name : ""}
              onChange={(e) => {
                const selected = hospitals.find(h => h.name === e.target.value);
                setSelectedHospital(selected);
              }}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospitalItem) => (
                <option key={hospitalItem.id} value={hospitalItem.name}>
                  {hospitalItem.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="assistantSurgeons" className="block text-sm font-medium text-gray-700">
              Assistant Surgeons
            </label>
            {assistantSurgeons.length > 0 ? (
              <Select
                id="assistantSurgeons"
                onChange={(selected) => setSelectedAssistant(selected ? selected.value : null)} // Single value selection
                options={assistantSurgeons.map((assistantSurgeon) => ({
                  value: assistantSurgeon.id,
                  label: assistantSurgeon.name,
                }))}
                isClearable // Allows for clearing selection
                className="mt-2"
              />
            ) : (
              <p>No assistant surgeons available.</p>
            )}
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date of Surgery (AD)
            </label>
            <input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </form>
      </section> */}
      <h1>Add Surgical Details</h1>
    </>
  );
};

export default AddSurgicalDetails;
