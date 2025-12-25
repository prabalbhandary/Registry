import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import { toast } from "react-toastify";

const FollowUp = () => {
  const patientDetailId = localStorage.getItem("patient_detail_id") || "";

  const [formData, setFormData] = useState({
    patient_detail_id: patientDetailId,
    follow_up_period: "",
    complaint_type: "",
    presence: false,
    severity: "",
    pain_level: "",
    location: "",
    fever_last_temp: "",
    description: "",

    wound_status: "",
    wound_details: {
      size: "",
      color: "",
      infection_signs: false,
    },

    fracture_healing_evaluation_status: "",
    fracture_healing_evaluation_details: "",

    functional_outcome_evaluation: "",
    functional_outcome_evaluation_details: "",

    activity_of_daily_living: {
      dressing: "",
      bathing: "",
      feeding: "",
    },

    return_to_work: {
      status: "",
      restrictions: "",
    },

    mobility_status: "",

    complications: {
      infection: false,
      blood_clot: false,
    },

    unplanned_readmission: {
      any: false,
      reason: "",
    },

    rehabilitation_service: {
      physical_therapy: false,
      occupational_therapy: false,
    },

    quality_of_life: {
      pain_score: "",
      overall_satisfaction: "",
    },

    psychological_status: {
      anxiety: "",
      depression: "",
    },

    patient_satisfaction: "",
    financial_impact: false,
    access_to_followup_care: "",
  });

  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    sex: "",
    diagnosis: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail/${patientDetailId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.data[0];

        setPatientInfo((prev) => ({
          ...prev,
          name: `${data.first_name} ${data.last_name}`,
          age: data.age,
          sex: data.gender,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    if (patientDetailId) fetchPatientDetail();
  }, [patientDetailId]);

  useEffect(() => {
    const fetchFemurDiagnosis = async () => {
      try {
        const res = await axios.get(`${URL}/femur-fracture`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.data && res.data.data.length > 0) {
          const diagnosis = res.data.data[0].diagonis || "";
          setPatientInfo((prev) => ({ ...prev, diagnosis }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFemurDiagnosis();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.follow_up_period.trim()) {
      setError("Follow-Up Period is required.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/follow-up`, formData);

      if (res.data.success) {
        setMessage("Follow-up created successfully!");
        toast.success("Follow-up created successfully!");
      } else {
        setError("Something went wrong.");
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit follow-up.");
      toast.error("Failed to submit follow-up.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="border-b border-gray-200 pb-6 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Follow-Up Assessment</h1>
            <p className="text-gray-600">Complete patient follow-up evaluation form</p>
          </div>

          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
              <p className="text-green-700 font-medium">{message}</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.name} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.age} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.sex} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.diagnosis || "No diagnosis"} 
                    readOnly 
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                Follow-Up Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-Up Period <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="follow_up_period"
                    value={formData.follow_up_period}
                    onChange={handleChange}
                    placeholder="e.g., 2 weeks, 1 month"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                Chief Complaint
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Type</label>
                    <input
                      type="text"
                      name="complaint_type"
                      value={formData.complaint_type}
                      onChange={handleChange}
                      placeholder="e.g., Pain, Swelling"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                    <input
                      type="text"
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      placeholder="e.g., Mild, Moderate, Severe"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="presence"
                      checked={formData.presence}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">Complaint Currently Present</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pain Level</label>
                    <input
                      type="text"
                      name="pain_level"
                      value={formData.pain_level}
                      onChange={handleChange}
                      placeholder="Scale 0-10"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pain Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Specific area"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Fever Temperature</label>
                  <input
                    type="text"
                    name="fever_last_temp"
                    value={formData.fever_last_temp}
                    onChange={handleChange}
                    placeholder="e.g., 98.6°F"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of complaint"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
                Wound Assessment
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wound Status</label>
                  <input
                    type="text"
                    name="wound_status"
                    value={formData.wound_status}
                    onChange={handleChange}
                    placeholder="e.g., Healing, Open, Closed"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                  <h3 className="text-md font-semibold text-gray-800 mb-4">Wound Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                        <input
                          type="text"
                          name="wound_details.size"
                          value={formData.wound_details.size}
                          onChange={handleChange}
                          placeholder="e.g., 2cm x 3cm"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                        <input
                          type="text"
                          name="wound_details.color"
                          value={formData.wound_details.color}
                          onChange={handleChange}
                          placeholder="e.g., Pink, Red"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white"
                        />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="wound_details.infection_signs"
                          checked={formData.wound_details.infection_signs}
                          onChange={handleChange}
                          className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">Signs of Infection Present</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">5</span>
                Fracture Healing Evaluation
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Healing Status</label>
                  <input
                    type="text"
                    name="fracture_healing_evaluation_status"
                    value={formData.fracture_healing_evaluation_status}
                    onChange={handleChange}
                    placeholder="e.g., Good, Delayed, Non-union"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Healing Details</label>
                  <textarea
                    name="fracture_healing_evaluation_details"
                    value={formData.fracture_healing_evaluation_details}
                    onChange={handleChange}
                    placeholder="Detailed evaluation of fracture healing progress"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">6</span>
                Functional Outcome
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Functional Outcome Evaluation</label>
                  <input
                    type="text"
                    name="functional_outcome_evaluation"
                    value={formData.functional_outcome_evaluation}
                    onChange={handleChange}
                    placeholder="e.g., Excellent, Good, Fair, Poor"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Functional Outcome Details</label>
                  <textarea
                    name="functional_outcome_evaluation_details"
                    value={formData.functional_outcome_evaluation_details}
                    onChange={handleChange}
                    placeholder="Detailed assessment of functional recovery"
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">7</span>
                Activities of Daily Living
              </h2>
              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dressing</label>
                    <input
                      type="text"
                      name="activity_of_daily_living.dressing"
                      value={formData.activity_of_daily_living.dressing}
                      onChange={handleChange}
                      placeholder="e.g., Independent, Needs assistance"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bathing</label>
                    <input
                      type="text"
                      name="activity_of_daily_living.bathing"
                      value={formData.activity_of_daily_living.bathing}
                      onChange={handleChange}
                      placeholder="e.g., Independent, Needs assistance"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Feeding</label>
                    <input
                      type="text"
                      name="activity_of_daily_living.feeding"
                      value={formData.activity_of_daily_living.feeding}
                      onChange={handleChange}
                      placeholder="e.g., Independent, Needs assistance"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-cyan-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">8</span>
                Return to Work
              </h2>
              <div className="bg-cyan-50 rounded-lg p-5 border border-cyan-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <input
                      type="text"
                      name="return_to_work.status"
                      value={formData.return_to_work.status}
                      onChange={handleChange}
                      placeholder="e.g., Returned, On leave, Modified duty"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Restrictions</label>
                    <input
                      type="text"
                      name="return_to_work.restrictions"
                      value={formData.return_to_work.restrictions}
                      onChange={handleChange}
                      placeholder="e.g., No heavy lifting, Limited hours"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">9</span>
                Mobility Status
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobility Status</label>
                <input
                  type="text"
                  name="mobility_status"
                  value={formData.mobility_status}
                  onChange={handleChange}
                  placeholder="e.g., Walking independently, Using walker, Wheelchair"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">10</span>
                Complications
              </h2>
              <div className="bg-red-50 rounded-lg p-5 border border-red-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="complications.infection"
                        checked={formData.complications.infection}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Infection</span>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-red-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="complications.blood_clot"
                        checked={formData.complications.blood_clot}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Blood Clot</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">11</span>
                Unplanned Readmission
              </h2>
              <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="unplanned_readmission.any"
                        checked={formData.unplanned_readmission.any}
                        onChange={handleChange}
                        className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Patient was readmitted</span>
                    </label>
                  </div>

                  {formData.unplanned_readmission.any && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Readmission Reason</label>
                      <input
                        type="text"
                        name="unplanned_readmission.reason"
                        value={formData.unplanned_readmission.reason}
                        onChange={handleChange}
                        placeholder="Specify reason for readmission"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">12</span>
                Rehabilitation Services
              </h2>
              <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rehabilitation_service.physical_therapy"
                        checked={formData.rehabilitation_service.physical_therapy}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Physical Therapy</span>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rehabilitation_service.occupational_therapy"
                        checked={formData.rehabilitation_service.occupational_therapy}
                        onChange={handleChange}
                        className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Occupational Therapy</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-violet-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">13</span>
                Quality of Life
              </h2>
              <div className="bg-violet-50 rounded-lg p-5 border border-violet-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pain Score</label>
                    <input
                      type="text"
                      name="quality_of_life.pain_score"
                      value={formData.quality_of_life.pain_score}
                      onChange={handleChange}
                      placeholder="Scale 0-10"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overall Satisfaction</label>
                    <input
                      type="text"
                      name="quality_of_life.overall_satisfaction"
                      value={formData.quality_of_life.overall_satisfaction}
                      onChange={handleChange}
                      placeholder="e.g., Satisfied, Neutral, Dissatisfied"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-fuchsia-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">14</span>
                Psychological Status
              </h2>
              <div className="bg-fuchsia-50 rounded-lg p-5 border border-fuchsia-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Anxiety Level</label>
                    <input
                      type="text"
                      name="psychological_status.anxiety"
                      value={formData.psychological_status.anxiety}
                      onChange={handleChange}
                      placeholder="e.g., None, Mild, Moderate, Severe"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Depression Level</label>
                    <input
                      type="text"
                      name="psychological_status.depression"
                      value={formData.psychological_status.depression}
                      onChange={handleChange}
                      placeholder="e.g., None, Mild, Moderate, Severe"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">15</span>
                Patient Satisfaction & Access
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Satisfaction</label>
                  <input
                    type="text"
                    name="patient_satisfaction"
                    value={formData.patient_satisfaction}
                    onChange={handleChange}
                    placeholder="Overall satisfaction rating"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="financial_impact"
                      checked={formData.financial_impact}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">Financial Impact Present</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access to Follow-up Care</label>
                  <input
                    type="text"
                    name="access_to_followup_care"
                    value={formData.access_to_followup_care}
                    onChange={handleChange}
                    placeholder="e.g., Good, Limited, Poor"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Submit Follow-Up Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;