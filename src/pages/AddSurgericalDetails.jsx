import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";

const AddSurgicalDetails = () => {
  const navigate = useNavigate();
  const [primarySurgeon, setPrimarySurgeon] = useState("Dr. Shubham"); // This can be dynamic
  const [hospital, setHospital] = useState("");
  const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  const [date, setDate] = useState("");
  const location = useLocation();
  const [completedIndex, setCompletedIndex] = useState(location.state?.completedIndex || 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        primarySurgeon,
        hospital,
        assistantSurgeons,
        date,
      });
      setCompletedIndex(2);
      navigate("/patient-surgical-details", { state: { completedIndex: 2 } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <title>Create Surgical Details - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <section className="py-6 px-4">
        <h1 className="text-3xl font-bold mb-4">Add Surgical Details</h1>
      </section>
      <section className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="primarySurgeon"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="hospital"
              className="block text-sm font-medium text-gray-700"
            >
              Hospital
            </label>
            <select
              id="hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Hospital</option>
              <option value="B&B Hospital">B&B Hospital</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="assistantSurgeons"
              className="block text-sm font-medium text-gray-700"
            >
              Assistant Surgeons
            </label>
            <Select
              id="assistantSurgeons"
              onChange={(e) =>
                setAssistantSurgeons(e.map((option) => option.value))
              }
              options={[
                { value: "Dr. Shubham", label: "Dr. Shubham" },
                { value: "Dr. Suman", label: "Dr. Suman" },
              ]}
              isMulti
              className="mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
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
      </section>
    </>
  );
};

export default AddSurgicalDetails;
