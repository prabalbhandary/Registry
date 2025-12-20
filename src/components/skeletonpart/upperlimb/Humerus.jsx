import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../URL";

const Humerus = () => {
  const patientId = localStorage.getItem("patientId");
  const navigate = useNavigate();
  const [fractureType, setFractureType] = useState("");
  const [side, setSide] = useState("");
  const [location, setLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState("");
  const [classification, setClassification] = useState("");
  const [subClassification, setSubClassification] = useState("");
  const [plan, setPlan] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentStatus, setTreatmentStatus] = useState("");

  const fractureOptions = ["Closed", "Open"];
  const sideOptions = ["Right", "Left"];
  const locationOptions = ["Proximal", "Midshaft", "Distal", "Other"];

  const closedMainClassifications = ["31A", "31B"];
  const closedSubClassifications = {
    "31A": [
      "31A1 - Simple pertrochanteric",
      "31A2 - Multifragmentary pertrochanteric, lateral wall incompetent (≤ 20.5 mm)",
      "31A3 - Intertrochanteric (reverse obliquity)",
    ],
    "31B": ["31B1 - Subcapital", "31B2 - Transcervical", "31B3 - Basicervical"],
  };

  const openClassifications = [
    "GA I",
    "GA II",
    "GA IIIA",
    "GA IIIB",
    "GA IIIC",
  ];
  const subclassifications = {
    "GA I": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA II": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIA": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIB": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIC": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${URL}/humerus-fracture`, {
        patient_detail_id: patientId,
        fracture_type: fractureType,
        fracture_side: side,
        fracture_location: location === "Other" ? otherLocation : location,
        fracture_classification: classification,
        fracture_sub_classification: subClassification,
        plan,
        treatment_status: treatmentStatus,
      });
      toast.success(res.data.message);
      navigate(treatmentStatus === "followup" ? "/patients/followup" : "/patients/surgeries");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAnother = () => {
    // setTreatmentStatus(treatmentStatus)
    handleSave();
  };

  const resetForm = (field) => {
    if (field === "fractureType") {
      setSide("");
      setLocation("");
      setOtherLocation("");
      setClassification("");
      setSubClassification("");
    } else if (field === "side") {
      setLocation("");
      setOtherLocation("");
      setClassification("");
      setSubClassification("");
    } else if (field === "location") {
      setOtherLocation("");
      setClassification("");
      setSubClassification("");
    } else if (field === "classification") {
      setSubClassification("");
    }
    setSavedMessage("");
  };

  const renderSelect = (
    value,
    setter,
    options,
    placeholder,
    dependencyField
  ) => (
    <div className="w-full">
      <select
        className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        value={value}
        onChange={(e) => {
          setter(e.target.value);
          if (dependencyField) resetForm(dependencyField);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const showSummary =
    fractureType &&
    side &&
    location &&
    (fractureType === "Closed"
      ? classification && subClassification
      : classification) &&
    (location !== "Other" || (location === "Other" && otherLocation));

  const formValid = showSummary;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Humerus Fracture Assessment
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Fracture Type */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fracture Type
          </label>
          {renderSelect(
            fractureType,
            setFractureType,
            fractureOptions,
            "Select Fracture Type",
            "fractureType"
          )}
        </div>

        {/* Side */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Side
          </label>
          {fractureType ? (
            renderSelect(side, setSide, sideOptions, "Select Side", "side")
          ) : (
            <select
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              disabled
            >
              <option>Select Fracture Type First</option>
            </select>
          )}
        </div>

        {/* Location */}
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          {side ? (
            renderSelect(
              location,
              setLocation,
              locationOptions,
              "Select Location",
              "location"
            )
          ) : (
            <select
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              disabled
            >
              <option>Select Side First</option>
            </select>
          )}
        </div>

        {/* Other Location */}
        {location === "Other" && (
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specify Location
            </label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter specific location"
              value={otherLocation}
              onChange={(e) => {
                setOtherLocation(e.target.value);
                resetForm("otherLocation");
              }}
            />
          </div>
        )}

        {/* Classification */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Classification
          </label>
          {location && (location !== "Other" || otherLocation) ? (
            fractureType === "Closed" ? (
              <div className="space-y-4">
                {closedMainClassifications.map((mainType) => (
                  <div
                    key={mainType}
                    className="border p-3 rounded-lg bg-gray-50"
                  >
                    <label className="block font-semibold text-gray-800 mb-2">
                      <input
                        type="radio"
                        name="mainClassification"
                        value={mainType}
                        checked={classification === mainType}
                        onChange={() => {
                          setClassification(mainType);
                          setSubClassification("");
                        }}
                        className="mr-2"
                      />
                      {mainType}
                    </label>

                    {classification === mainType && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {closedSubClassifications[mainType].map((sub) => {
                          const code = sub.split(" ")[0];
                          const isSelected = subClassification === sub;

                          return (
                            <div
                              key={sub}
                              onClick={() => setSubClassification(sub)}
                              className={`cursor-pointer border-2 rounded-lg p-2 transition-all duration-200 ${isSelected
                                  ? "border-blue-600"
                                  : "border-gray-300"
                                }`}
                            >
                              <img
                                src={`/images/classification/${code}.png`}
                                alt={sub}
                                className="w-full h-auto object-contain"
                              />
                              <p className="mt-2 text-sm text-center font-medium text-gray-700">
                                {sub}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              renderSelect(
                classification,
                setClassification,
                openClassifications,
                "Select Classification",
                "classification"
              )
            )
          ) : (
            <select
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
              disabled
            >
              <option>Complete Location First</option>
            </select>
          )}
        </div>

        {/* SubClassification for Open */}
        {fractureType === "Open" && classification && (
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub-Classification
            </label>
            {renderSelect(
              subClassification,
              setSubClassification,
              subclassifications[classification] || [],
              "Select Sub-Classification"
            )}
          </div>
        )}
      </div>

      {/* Diagnosis */}
      {formValid && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diagnosis
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
            placeholder="Enter your diagnosis..."
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
      )}

      {/* Treatment Plan */}
      {formValid && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Treatment Plan
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
            placeholder="Describe your treatment plan here..."
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
        </div>
      )}

      {/* Summary Section */}
      {formValid && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Humerus Fracture Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Fracture Type:</span> {fractureType}
            </div>
            <div>
              <span className="font-medium">Side:</span> {side}
            </div>
            <div>
              <span className="font-medium">Location:</span>{" "}
              {location === "Other" ? otherLocation : location}
            </div>
            <div>
              <span className="font-medium">Classification:</span>{" "}
              {fractureType === "Closed"
                ? `${classification} - ${subClassification}`
                : classification}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {formValid && (
        <>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="treatment_status"
                id="followup"
                value="followup"
                onChange={(e) => setTreatmentStatus(e.target.value)}
              />
              <label htmlFor="followup">
                Save to Follow Up
              </label>
            </div>

            <div className="flex gap-3 items-center">
              <input
                type="radio"
                name="treatment_status"
                id="surgery_radio"
                value="surgery"
                onChange={(e) => setTreatmentStatus(e.target.value)}
              />
              <label
                htmlFor="surgery_radio"
              >
                Proceed to Surgery
              </label>
            </div>

          </div>
          <button
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm"
            onClick={handleSaveAnother}
            disabled={isLoading}
          >
            Add Another Fracture
          </button>
          <button
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm"
            onClick={() => handleSave()}
            disabled={isLoading}
          >
            Submit
          </button>
        </>
      )}

      {/* Save message */}
      {savedMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg font-medium text-center">
          {savedMessage}
        </div>
      )}
    </div>
  );
};

export default Humerus;
