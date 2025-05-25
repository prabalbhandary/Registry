import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL } from "../../URL";

const Femur = () => {
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

  const fractureOptions = ["Closed", "Open"];
  const sideOptions = ["Right", "Left"];
  const locationOptions = ["Proximal", "Midshaft", "Distal", "Other"];

  const closedClassifications = [
    "AO32A (Simple)",
    "AO32B (Wedge)",
    "AO32C (Complex)",
  ];
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

  const handleSave = async (type) => {
    try {
      setIsLoading(true);
      setSavedMessage("✅ Saved to Follow Up!");
      const res = await axios.post(`${URL}/femur-fracture`, {
        patient_detail_id: patientId,
        fracture_type: fractureType,
        fracture_side: side,
        fracture_location: location === "Other" ? otherLocation : location,
        fracture_classification: classification,
        fracture_sub_classification: subClassification,
        plan,
        treatment_status: "followup",
      });
      toast.success(res.data.message);
      navigate("/patients");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = (field) => {
    // Reset all dependent fields
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
    classification &&
    (location !== "Other" || (location === "Other" && otherLocation));

  const formValid = showSummary;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Femur Fracture Assessment
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
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Classification
          </label>
          {location && (location !== "Other" || otherLocation) ? (
            renderSelect(
              classification,
              setClassification,
              fractureType === "Closed"
                ? closedClassifications
                : openClassifications,
              "Select Classification",
              "classification"
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

        {/* SubClassification (only for Open fractures) */}
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

      {/* Plan textarea - full width */}
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
            Femur Fracture Summary
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
              {classification}
            </div>
            {subClassification && (
              <div>
                <span className="font-medium">Sub-Classification:</span>{" "}
                {subClassification}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {formValid && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-col xs:flex-row gap-3">
            <button
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } transition-colors shadow-sm`}
              onClick={() => handleSave("followup")}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save to Follow Up"}
            </button>
          </div>

          <div className="flex flex-col xs:flex-row gap-3">
            <button
              className={`px-4 py-2 rounded-lg font-medium text-white ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } transition-colors shadow-sm`}
              onClick={() => {
                handleSave("surgery");
                navigate("/surgeries");
              }}
              disabled={isLoading}
            >
              {isLoading ? "Proceeding..." : "Proceed to Surgery"}
            </button>
          </div>

          <button
            className="px-4 py-2 rounded-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-sm"
            onClick={() => navigate("/add-surgerical-details")}
            disabled={isLoading}
          >
            Add Another Injury
          </button>
        </div>
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

export default Femur;
