import React, { useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PatientSurgicalDetails = () => {
  const [completedIndex, setCompletedIndex] = useState(2);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [beightonScore, setBeightonScore] = useState("");
  const [comorbidity, setComorbidity] = useState([]);

  const navigate = useNavigate();

  const calculateBmi = () => {
    if (height && weight) {
      const bmi = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(bmi);
    }
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    calculateBmi();
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    calculateBmi();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        height,
        weight,
        bmi,
        beightonScore,
        comorbidity,
      });
      setCompletedIndex((prevIndex) =>
        prevIndex === null ? 3 : prevIndex + 1
      );
      navigate("/patient-injury-details");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <title>Patient Surgical Details - Nepal Ligament Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <section className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Add Patient Surgical Details
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Fill in the details below for the patient's surgical profile.
        </p>
      </section>

      <section className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="height" className="text-gray-700">
              Height (in cm)
            </label>
            <input
              value={height}
              onChange={handleHeightChange}
              type="number"
              id="height"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter height in cm"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="weight" className="text-gray-700">
              Weight (in kg)
            </label>
            <input
              value={weight}
              onChange={handleWeightChange}
              type="number"
              id="weight"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter weight in kg"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="beightonScore" className="text-gray-700">
              Beighton Score
            </label>
            <select
              value={beightonScore}
              onChange={(e) => setBeightonScore(e.target.value)}
              id="beightonScore"
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">4 or less - Normal</option>
              <option value="">5 or more - Ligamentous laxity</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="comorbidity" className="text-gray-700">
              Comorbidity
            </label>
            <Select
              value={comorbidity}
              onChange={(e) => setComorbidity(e)}
              id="comorbidity"
              isMulti
              className="border border-gray-300 rounded-md p-2"
              options={[
                { value: "Normal", label: "Normal" },
                { value: "Hypertension", label: "Hypertension" },
                { value: "Diabetes", label: "Diabetes" },
                { value: "Cardiac", label: "Cardiac" },
                { value: "Hypothyroidism", label: "Hypothyroidism" },
                { value: "COPD", label: "COPD" },
                { value: "Tuberculosis", label: "Tuberculosis" },
                { value: "Liver diseases", label: "Liver diseases" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-gray-700">BMI Score</p>
            <p className="text-xl text-gray-800">{bmi || "0.00"}</p>
          </div>

          <div className="flex justify-between space-x-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PatientSurgicalDetails;
