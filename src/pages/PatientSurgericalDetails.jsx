import React, { useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";
import skeleton from "../assets/skeleton.png";

const PatientSurgicalDetails = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [beightonScore, setBeightonScore] = useState("");
  const [comorbidity, setComorbidity] = useState([]);
  const location = useLocation();
  const [completedIndex, setCompletedIndex] = useState(
    location.state?.completedIndex || 1
  );

  const calculateBmi = () => {
    if (height && weight) {
      const bmiValue = (weight / (height / 100) ** 2).toFixed(2);
      setBmi(bmiValue);
    }
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
      setCompletedIndex(3);
      navigate("/patient-injury-details", { state: { completedIndex: 3 } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <title>Patient Surgical Details - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <section className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Add Patient Surgical Details
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex-1 pl-4">
            <section className="bg-white shadow-md rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="height" className="text-gray-700">
                    Height (in cm)
                  </label>
                  <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    id="height"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Enter height in cm"
                  />
                </div>

                <div>
                  <label htmlFor="weight" className="text-gray-700">
                    Weight (in kg)
                  </label>
                  <input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    id="weight"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label htmlFor="beightonScore" className="text-gray-700">
                    Beighton Score
                  </label>
                  <select
                    value={beightonScore}
                    onChange={(e) => setBeightonScore(e.target.value)}
                    id="beightonScore"
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="normal">4 or less - Normal</option>
                    <option value="laxity">
                      5 or more - Ligamentous laxity
                    </option>
                  </select>
                </div>

                <div>
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
                    ]}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-700">BMI Score</p>
                  <p className="text-xl text-gray-800">{bmi || "0.00"}</p>
                </div>

                <div className="flex justify-between space-x-4">
                  <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={calculateBmi}
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <img src={skeleton} alt="skeleton" />
        </div>
      </section>
    </>
  );
};

export default PatientSurgicalDetails;
