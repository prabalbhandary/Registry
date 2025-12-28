import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Surgery = () => {
  const navigate = useNavigate();

  const [surgeryType, setSurgeryType] = useState("");
  const [externalType, setExternalType] = useState("");
  const [internalType, setInternalType] = useState("");
  const [extramedullaryType, setExtramedullaryType] = useState("");
  const [extramedullaryOther, setExtramedullaryOther] = useState("");
  const [extramedullarySize, setExtramedullarySize] = useState("");
  const [extramedullaryScrews, setExtramedullaryScrews] = useState("");
  const [extramedullaryElaboration, setExtramedullaryElaboration] =
    useState("");
  const [intramedullaryType, setIntramedullaryType] = useState("");
  const [antigradeType, setAntigradeType] = useState("");
  const [antigradeSize, setAntigradeSize] = useState("");
  const [antigradeDiameter, setAntigradeDiameter] = useState("");
  const [antigradeElaboration, setAntigradeElaboration] = useState("");
  const [retrogradeType, setRetrogradeType] = useState("");
  const [retrogradeSize, setRetrogradeSize] = useState("");
  const [retrogradeDiameter, setRetrogradeDiameter] = useState("");
  const [retrogradeElaboration, setRetrogradeElaboration] = useState("");
  const [materialUsed, setMaterialUsed] = useState("");
  const [description, setDescription] = useState("");
  const [combinedText, setCombinedText] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [otherFixtureType, setOtherFixtureType] = useState("");
  const [errors, setErrors] = useState({});
  const [internalTypeOther, setInternalTypeOther] = useState("");
  const [extramedullaryThickness, setExtramedullaryThickness] = useState("");
  const [antigradeThickness, setAntigradeThickness] = useState("");
  const [retrogradeThickness, setRetrogradeThickness] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSurgeryChange = (e) => {
    const selectedType = e.target.value;
    setSurgeryType(selectedType);
    setExternalType("");
    setInternalType("");
    setInternalTypeOther("");
    setExtramedullaryType("");
    setExtramedullaryOther("");
    setIntramedullaryType("");
    setAntigradeType("");
    setRetrogradeType("");
    setCombinedText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (
      surgeryType === "external" &&
      externalType === "other" &&
      !otherFixtureType.trim()
    ) {
      newErrors.otherFixtureType = "Please enter external fixation type.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setErrors({});
    setLoading(true);

    const formData = {
      patient_detail_id: localStorage.getItem("patientId"),
      fixture:
        surgeryType === "combined"
          ? "Combined"
          : surgeryType === "internal"
          ? "Internal"
          : "External",
      fixture_type:
        surgeryType === "internal"
          ? internalType === "other"
            ? otherFixtureType
            : internalType === "extramedullary"
            ? extramedullaryType === "other"
              ? extramedullaryOther
              : extramedullaryType
            : intramedullaryType
          : surgeryType === "external"
          ? externalType === "other"
            ? otherFixtureType
            : externalType
          : "",
      fixture_sub_type:
        antigradeType || retrogradeType || extramedullaryType || "",
      otherFixtureType:
        (surgeryType === "internal" && internalType === "other") ||
        (surgeryType === "external" && externalType === "other")
          ? otherFixtureType
          : "",
      size_of_plate:
        extramedullarySize || antigradeSize || retrogradeSize || "",
      number_of_screws: extramedullaryScrews || "",
      elaboration:
        extramedullaryElaboration ||
        antigradeElaboration ||
        retrogradeElaboration ||
        "",
      material_used: materialUsed,
      description: surgeryType !== "combined" ? description : null,
      combined_surgery_description:
        surgeryType === "combined" ? combinedText : null,
    };

    try {
      const res = await axios.post(`${URL}/create-surgery`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res?.data?.message || "Surgery form submitted successfully!");
      navigate("/patients/surgeries");
      setSubmittedData(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to submit form"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const showPlateFields = [
    "dcp",
    "recomplate",
    "abps",
    "lcps",
    "pflcps",
    "dflcps",
  ].includes(extramedullaryType);

  const showNailFieldsAntigrade = ["solid-nail", "hollow-nail", "pfn"].includes(
    antigradeType
  );

  const showNailFieldsRetrograde = [
    "solid-nail",
    "hollow-nail",
    "dfn",
  ].includes(retrogradeType);

  const getTotalSteps = () => {
    if (!surgeryType) return 3;
    if (surgeryType === "combined") return 3;
    if (surgeryType === "external") return 3;
    if (surgeryType === "internal") {
      if (!internalType) return 4;
      if (internalType === "other") return 3;
      if (internalType === "extramedullary") return showPlateFields ? 4 : 4;
      if (internalType === "intramedullary") return 5;
    }
    return 3;
  };

  const canProceedToNextStep = () => {
    if (currentStep === 1) return surgeryType !== "";
    if (currentStep === 2) {
      if (surgeryType === "external") return externalType !== "";
      if (surgeryType === "internal") return internalType !== "";
      if (surgeryType === "combined") return true;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 animate-[fadeIn_0.6s_ease-out]">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white rounded-xl hover:bg-slate-50 transition-colors border border-slate-200 hover:shadow-lg"
          >
            <FaArrowLeft className="text-slate-600" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent tracking-tight">
              Surgery Details
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Record surgical procedure information
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      step < currentStep
                        ? "bg-green-500 text-white"
                        : step === currentStep
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step < currentStep ? <FaCheckCircle /> : step}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-slate-700">
                      Step {step}
                    </div>
                    <div className="text-xs text-slate-500">
                      {step === 1
                        ? "Surgery Type"
                        : step === 2
                        ? "Details"
                        : "Finalize"}
                    </div>
                  </div>
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                      step < currentStep
                        ? "bg-green-500"
                        : "bg-slate-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Form Content */}
          <div className="p-8 min-h-[500px]">
            {/* Step 1: Surgery Type */}
            {currentStep === 1 && (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Select Surgery Type
                </h2>
                <p className="text-slate-600 mb-8">
                  Choose the type of surgical procedure performed
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      value: "internal",
                      label: "Internal Fixation",
                      icon: "🔧",
                      desc: "Internal surgical fixation"
                    },
                    {
                      value: "external",
                      label: "External Fixation",
                      icon: "⚙️",
                      desc: "External frame fixation"
                    },
                    {
                      value: "combined",
                      label: "Combined",
                      icon: "🔗",
                      desc: "Multiple fixation methods"
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer group`}
                    >
                      <input
                        type="radio"
                        name="surgeryType"
                        value={option.value}
                        checked={surgeryType === option.value}
                        onChange={handleSurgeryChange}
                        className="sr-only"
                      />
                      <div
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                          surgeryType === option.value
                            ? "border-violet-500 bg-violet-50 shadow-lg scale-105"
                            : "border-slate-200 hover:border-violet-300 hover:shadow-md"
                        }`}
                      >
                        <div className="text-4xl mb-3">{option.icon}</div>
                        <div className="font-bold text-lg text-slate-800 mb-1">
                          {option.label}
                        </div>
                        <div className="text-sm text-slate-500">
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Surgery Details */}
            {currentStep === 2 && (
              <div className="animate-[fadeIn_0.5s_ease-out] space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Surgery Details
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Provide specific information about the procedure
                  </p>
                </div>

                {/* External Fixation */}
                {surgeryType === "external" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                        External Fixation Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { value: "conventional", label: "Conventional" },
                          { value: "rail-fixator", label: "Rail Fixator" },
                          { value: "illizarov", label: "Illizarov" },
                          { value: "other", label: "Other" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="externalType"
                              value={option.value}
                              checked={externalType === option.value}
                              onChange={(e) => setExternalType(e.target.value)}
                              className="sr-only"
                            />
                            <div
                              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center font-semibold ${
                                externalType === option.value
                                  ? "border-violet-500 bg-violet-50 text-violet-700"
                                  : "border-slate-200 hover:border-violet-300"
                              }`}
                            >
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {externalType === "other" && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                          Specify External Type
                        </label>
                        <input
                          type="text"
                          value={otherFixtureType}
                          onChange={(e) => setOtherFixtureType(e.target.value)}
                          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300"
                          placeholder="Enter external fixation type"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Internal Fixation */}
                {surgeryType === "internal" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                        Internal Fixation Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { value: "extramedullary", label: "Extramedullary" },
                          { value: "intramedullary", label: "Intramedullary" },
                          { value: "other", label: "Other" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="internalType"
                              value={option.value}
                              checked={internalType === option.value}
                              onChange={(e) => {
                                setInternalType(e.target.value);
                                setInternalTypeOther("");
                                setExtramedullaryType("");
                                setIntramedullaryType("");
                              }}
                              className="sr-only"
                            />
                            <div
                              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center font-semibold ${
                                internalType === option.value
                                  ? "border-violet-500 bg-violet-50 text-violet-700"
                                  : "border-slate-200 hover:border-violet-300"
                              }`}
                            >
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {internalType === "other" && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                          Specify Internal Type
                        </label>
                        <input
                          type="text"
                          value={otherFixtureType}
                          onChange={(e) => setOtherFixtureType(e.target.value)}
                          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300"
                          placeholder="Enter internal fixation type"
                        />
                      </div>
                    )}

                    {/* Extramedullary Options */}
                    {internalType === "extramedullary" && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                          Extramedullary Type
                        </label>
                        <select
                          value={extramedullaryType}
                          onChange={(e) => setExtramedullaryType(e.target.value)}
                          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white"
                        >
                          <option value="">--Select Type--</option>
                          <option value="dcp">DCP</option>
                          <option value="recomplate">Recomplate</option>
                          <option value="abps">ABPs</option>
                          <option value="dhs">DHS</option>
                          <option value="dcs">DCS</option>
                          <option value="lcps">LCPs</option>
                          <option value="pflcps">PFLCPs</option>
                          <option value="dflcps">DFLCPs</option>
                          <option value="other">Other</option>
                        </select>

                        {showPlateFields && (
                          <div className="mt-6 space-y-4 p-6 bg-violet-50 rounded-xl border border-violet-200">
                            <h3 className="font-bold text-slate-800 mb-4">Plate Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Plate Size (holes)
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={extramedullarySize}
                                    onChange={(e) => setExtramedullarySize(e.target.value)}
                                    className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Size"
                                  />
                                  <span className="text-slate-600 font-semibold">holes</span>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Thickness
                                </label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={extramedullaryThickness}
                                    onChange={(e) => setExtramedullaryThickness(e.target.value)}
                                    className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Thickness"
                                  />
                                  <span className="text-slate-600 font-semibold">mm</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Additional Details
                              </label>
                              <input
                                type="text"
                                value={extramedullaryElaboration}
                                onChange={(e) => setExtramedullaryElaboration(e.target.value)}
                                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                placeholder="Enter any additional details"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Intramedullary Options */}
                    {internalType === "intramedullary" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                            Intramedullary Approach
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { value: "antigrade", label: "Antigrade" },
                              { value: "retrograde", label: "Retrograde" },
                            ].map((option) => (
                              <label
                                key={option.value}
                                className="cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="intramedullaryType"
                                  value={option.value}
                                  checked={intramedullaryType === option.value}
                                  onChange={(e) => {
                                    setIntramedullaryType(e.target.value);
                                    setAntigradeType("");
                                    setRetrogradeType("");
                                  }}
                                  className="sr-only"
                                />
                                <div
                                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center font-semibold ${
                                    intramedullaryType === option.value
                                      ? "border-violet-500 bg-violet-50 text-violet-700"
                                      : "border-slate-200 hover:border-violet-300"
                                  }`}
                                >
                                  {option.label}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Antigrade */}
                        {intramedullaryType === "antigrade" && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                              Antigrade Nail Type
                            </label>
                            <select
                              value={antigradeType}
                              onChange={(e) => setAntigradeType(e.target.value)}
                              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white"
                            >
                              <option value="">--Select Type--</option>
                              <option value="solid-nail">Solid Nail</option>
                              <option value="hollow-nail">Hollow Nail</option>
                              <option value="pfn">PFN</option>
                              <option value="other">Other</option>
                            </select>

                            {showNailFieldsAntigrade && (
                              <div className="mt-6 space-y-4 p-6 bg-violet-50 rounded-xl border border-violet-200">
                                <h3 className="font-bold text-slate-800 mb-4">Nail Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Nail Length
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        value={antigradeSize}
                                        onChange={(e) => setAntigradeSize(e.target.value)}
                                        className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Length"
                                      />
                                      <span className="text-slate-600 font-semibold">mm</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Thickness
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        value={antigradeThickness}
                                        onChange={(e) => setAntigradeThickness(e.target.value)}
                                        className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Thickness"
                                      />
                                      <span className="text-slate-600 font-semibold">mm</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Additional Details
                                  </label>
                                  <input
                                    type="text"
                                    value={antigradeElaboration}
                                    onChange={(e) => setAntigradeElaboration(e.target.value)}
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Enter any additional details"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Retrograde */}
                        {intramedullaryType === "retrograde" && (
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                              Retrograde Nail Type
                            </label>
                            <select
                              value={retrogradeType}
                              onChange={(e) => setRetrogradeType(e.target.value)}
                              className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300 bg-white"
                            >
                              <option value="">--Select Type--</option>
                              <option value="solid-nail">Solid Nail</option>
                              <option value="hollow-nail">Hollow Nail</option>
                              <option value="dfn">DFN</option>
                              <option value="other">Other</option>
                            </select>

                            {showNailFieldsRetrograde && (
                              <div className="mt-6 space-y-4 p-6 bg-violet-50 rounded-xl border border-violet-200">
                                <h3 className="font-bold text-slate-800 mb-4">Nail Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Thickness
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        value={retrogradeThickness}
                                        onChange={(e) => setRetrogradeThickness(e.target.value)}
                                        className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Thickness"
                                      />
                                      <span className="text-slate-600 font-semibold">mm</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                      Nail Length
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        value={retrogradeSize}
                                        onChange={(e) => setRetrogradeSize(e.target.value)}
                                        className="flex-1 p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                        placeholder="Length"
                                      />
                                      <span className="text-slate-600 font-semibold">mm</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Additional Details
                                  </label>
                                  <input
                                    type="text"
                                    value={retrogradeElaboration}
                                    onChange={(e) => setRetrogradeElaboration(e.target.value)}
                                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    placeholder="Enter any additional details"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Combined Surgery */}
                {surgeryType === "combined" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                      Combined Surgery Description
                    </label>
                    <textarea
                      value={combinedText}
                      onChange={(e) => setCombinedText(e.target.value)}
                      rows="4"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300"
                      placeholder="Describe the combined surgical procedures..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Material & Description */}
            {currentStep === 3 && (
              <div className="animate-[fadeIn_0.5s_ease-out] space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Additional Information
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Final details about materials and procedure
                  </p>
                </div>

                {/* Material Used */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
                    Material Used
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "stainless-steel", label: "Stainless Steel", icon: "⚙️" },
                      { value: "titanium", label: "Titanium", icon: "✨" },
                    ].map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="materialUsed"
                          value={option.value}
                          checked={materialUsed === option.value}
                          onChange={(e) => setMaterialUsed(e.target.value)}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                            materialUsed === option.value
                              ? "border-violet-500 bg-violet-50 text-violet-700"
                              : "border-slate-200 hover:border-violet-300"
                          }`}
                        >
                          <div className="text-3xl mb-2">{option.icon}</div>
                          <div className="font-bold text-lg">{option.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                {surgeryType !== "combined" && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 uppercase tracking-wider">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="w-full p-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all duration-300"
                      placeholder="Enter any additional notes or observations..."
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gradient-to-r from-slate-50 to-white px-8 py-6 border-t-2 border-slate-200 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              <FaArrowLeft />
              Previous
            </button>

            <div className="text-sm text-slate-600 font-semibold">
              Step {currentStep} of 3
            </div>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNextStep()}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                Next
                <FaArrowRight />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading || !materialUsed}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Submit Surgery
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Surgery;