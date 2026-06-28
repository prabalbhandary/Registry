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

  const handleSave = async (buttonType) => {
    if (!treatmentStatus) {
      toast.error("Please select a treatment status");
      return;
    }

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
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);
      if(buttonType === "save"){
        navigate(treatmentStatus === "followup" ? "/patients/follow-up" : "/patients/surgeries");
      } else{
        navigate("/add-surgerical-details")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
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
        className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Humerus Fracture Assessment</h1>
              <p className="text-gray-600 text-sm mt-1">Complete the fracture evaluation form</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Basic Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fracture Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fracture Type <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Side <span className="text-red-500">*</span>
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
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
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specify Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter specific location"
                    value={otherLocation}
                    onChange={(e) => {
                      setOtherLocation(e.target.value);
                      resetForm("otherLocation");
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Classification Section */}
          {location && (location !== "Other" || otherLocation) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Classification
              </h2>

              {fractureType === "Closed" ? (
                <div className="space-y-6">
                  {closedMainClassifications.map((mainType) => (
                    <div
                      key={mainType}
                      className={`border-2 rounded-xl transition-all ${
                        classification === mainType
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <label className="flex items-center p-4 cursor-pointer">
                        <input
                          type="radio"
                          name="mainClassification"
                          value={mainType}
                          checked={classification === mainType}
                          onChange={() => {
                            setClassification(mainType);
                            setSubClassification("");
                          }}
                          className="w-5 h-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-lg font-bold text-gray-800">{mainType}</span>
                      </label>

                      {classification === mainType && (
                        <div className="px-4 pb-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {closedSubClassifications[mainType].map((sub) => {
                              const code = sub.split(" ")[0];
                              const isSelected = subClassification === sub;

                              return (
                                <div
                                  key={sub}
                                  onClick={() => setSubClassification(sub)}
                                  className={`cursor-pointer border-2 rounded-xl p-3 transition-all duration-200 hover:shadow-lg ${
                                    isSelected
                                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                                      : "border-gray-300 bg-white hover:border-indigo-300"
                                  }`}
                                >
                                  <div className="relative">
                                    <img
                                      src={`/images/classification/humerus/${code}.png`}
                                      alt={sub}
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = `/images/classification/${code}.png`;
                                      }}
                                      className="w-full h-32 object-contain rounded-lg bg-white"
                                    />
                                    {isSelected && (
                                      <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                  <p className="mt-3 text-sm text-center font-medium text-gray-700 leading-snug">
                                    {sub}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Classification <span className="text-red-500">*</span>
                    </label>
                    {renderSelect(
                      classification,
                      setClassification,
                      openClassifications,
                      "Select Classification",
                      "classification"
                    )}
                  </div>

                  {classification && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Sub-Classification <span className="text-red-500">*</span>
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
              )}
            </div>
          )}

          {/* Clinical Assessment Section */}
          {formValid && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Clinical Assessment
              </h2>

              <div className="space-y-6">
                {/* Diagnosis */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Diagnosis
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[100px]"
                    placeholder="Enter your diagnosis..."
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </div>

                {/* Treatment Plan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Treatment Plan
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[120px]"
                    placeholder="Describe your treatment plan here..."
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Summary Section */}
          {formValid && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Fracture Summary</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-indigo-100">
                    <span className="text-sm text-gray-600 font-medium">Fracture Type</span>
                    <p className="text-lg font-bold text-gray-900 mt-1">{fractureType}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-indigo-100">
                    <span className="text-sm text-gray-600 font-medium">Side</span>
                    <p className="text-lg font-bold text-gray-900 mt-1">{side}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-indigo-100">
                    <span className="text-sm text-gray-600 font-medium">Location</span>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {location === "Other" ? otherLocation : location}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-indigo-100">
                    <span className="text-sm text-gray-600 font-medium">Classification</span>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {fractureType === "Closed"
                        ? `${classification} - ${subClassification.split(" - ")[0]}`
                        : `${classification} - ${subClassification}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Treatment Status Section */}
          {formValid && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Treatment Status
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    treatmentStatus === "followup"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300 bg-white hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="treatment_status"
                    value="followup"
                    checked={treatmentStatus === "followup"}
                    onChange={(e) => setTreatmentStatus(e.target.value)}
                    className="w-5 h-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <span className="block text-base font-semibold text-gray-900">Save to Follow Up</span>
                    <span className="text-sm text-gray-600">Schedule for future monitoring</span>
                  </div>
                  {treatmentStatus === "followup" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>

                <label
                  className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    treatmentStatus === "surgery"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-300 bg-white hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="treatment_status"
                    value="surgery"
                    checked={treatmentStatus === "surgery"}
                    onChange={(e) => setTreatmentStatus(e.target.value)}
                    className="w-5 h-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="ml-3">
                    <span className="block text-base font-semibold text-gray-900">Proceed to Surgery</span>
                    <span className="text-sm text-gray-600">Continue with surgical planning</span>
                  </div>
                  {treatmentStatus === "surgery" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {formValid && (
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                className="flex-1 px-6 py-3.5 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSave("saveAnother")}
                disabled={isLoading || !treatmentStatus}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Another Fracture
                </span>
              </button>
              <button
                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSave("save")}
                disabled={isLoading || !treatmentStatus}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Assessment
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Save message */}
        {savedMessage && (
          <div className="mt-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-green-800">Success</h3>
              <p className="text-sm text-green-700 mt-1">{savedMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Humerus;