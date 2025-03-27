import React, { useState } from "react";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SecondNavbar from "../components/SecondNavbar";
import skeleton from "../assets/skeleton.png";

const SkeletonOverlay = ({ onPartClick }) => {
  const bodyParts = {
    upperLimb: [
      { name: 'Clavicle', top: '20%', left: '45%', width: '10%', height: '5%' },
      { name: 'Scapula', top: '25%', left: '35%', width: '10%', height: '10%' },
      { name: 'Humerus', top: '35%', left: '30%', width: '10%', height: '20%' },
      { name: 'Elbow', top: '45%', left: '25%', width: '8%', height: '8%' },
      { name: 'Radius & Ulna', top: '50%', left: '20%', width: '10%', height: '20%' },
      { name: 'Hand', top: '70%', left: '15%', width: '10%', height: '10%' }
    ],
    lowerLimb: [
      { name: 'Pelvis', top: '50%', left: '42%', width: '16%', height: '10%' },
      { name: 'Acetabulum', top: '52%', left: '45%', width: '10%', height: '5%' },
      { name: 'Femur', top: '60%', left: '40%', width: '10%', height: '20%' },
      { name: 'Tibia & Fibula', top: '75%', left: '40%', width: '10%', height: '20%' },
      { name: 'Patella', top: '65%', left: '45%', width: '5%', height: '5%' },
      { name: 'Foot', top: '90%', left: '40%', width: '10%', height: '10%' }
    ]
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img 
        src={skeleton} 
        alt="skeleton" 
        className="w-full h-auto opacity-50" 
      />
      <div className="absolute inset-0">
        {Object.entries(bodyParts).map(([limb, parts]) => (
          parts.map((part, index) => (
            <button 
              key={`${limb}-${index}`}
              onClick={() => onPartClick(part.name)}
              className="absolute hover:bg-blue-200/50 focus:outline-none"
              style={{
                top: part.top,
                left: part.left,
                width: part.width,
                height: part.height,
                cursor: 'pointer'
              }}
              title={part.name}
            >
              <span className="text-xs text-white bg-blue-500/50 rounded px-1">
                {part.name}
              </span>
            </button>
          ))
        ))}
      </div>
    </div>
  );
};

const PatientSurgicalDetails = () => {
  const navigate = useNavigate();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [beightonScore, setBeightonScore] = useState("");
  const [comorbidity, setComorbidity] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
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

  const handleBodyPartClick = (part) => {
    setSelectedBodyPart(part);
    toast.info(`Selected body part: ${part}`);
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
        selectedBodyPart,
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
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="height" className="text-gray-700">
                  Height (in cm)
                </label>
                <input
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  type="number"
                  id="height"
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="w-full border border-gray-300 rounded-md p-2"
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
                  className="border border-gray-300 rounded-md"
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

              {selectedBodyPart && (
                <div>
                  <p className="font-semibold text-gray-700">Selected Body Part</p>
                  <p className="text-xl text-gray-800">{selectedBodyPart}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between space-x-4 mt-6">
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
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-center mb-4">
            Click on Body Parts for Details
          </h2>
          <SkeletonOverlay onPartClick={handleBodyPartClick} />
        </div>
      </section>
    </>
  );
};

export default PatientSurgicalDetails;