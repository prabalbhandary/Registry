import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail/${patientDetailId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.data;

        setPatientInfo((prev) => ({
          ...prev,
          name: `${data.first_name} ${data.last_name}`,
          age: data.age,
          sex: data.gender,
        }));
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            err.response?.data?.message || "Failed to fetch patients detail"
          );
        }
      }
    };

    if (patientDetailId) fetchPatientDetail();
  }, [patientDetailId, navigate]);

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
        if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            err.response?.data?.message || "Failed to fetch femur fracture"
          );
        }
      }
    };

    fetchFemurDiagnosis();
  }, [navigate]);

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
      toast.error("Follow-Up Period is required.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/follow-up`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setMessage("Follow-up created successfully!");
        toast.success("Follow-up created successfully!");
        navigate("/patients/follow-up");
      } else {
        setError("Something went wrong.");
        toast.error("Something went wrong.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(
          err.response?.data?.message || "Failed to create follow-up"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Follow-Up Assessment</h1>
              <p className="text-gray-600 text-sm mt-1">Complete comprehensive patient follow-up evaluation</p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700 font-medium">{message}</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Patient Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.name} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.age} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.sex} 
                    readOnly 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Diagnosis</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 font-medium" 
                    value={patientInfo.diagnosis || "No diagnosis"} 
                    readOnly 
                  />
                </div>
              </div>
            </div>

            {/* Follow-Up Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                Follow-Up Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Follow-Up Period <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="follow_up_period"
                    value={formData.follow_up_period}
                    onChange={handleChange}
                    placeholder="e.g., 2 weeks, 1 month, 6 months"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                Chief Complaint
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Complaint Type</label>
                    <input
                      type="text"
                      name="complaint_type"
                      value={formData.complaint_type}
                      onChange={handleChange}
                      placeholder="e.g., Pain, Swelling, Stiffness"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Severity</label>
                    <select
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Severity</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="presence"
                      checked={formData.presence}
                      onChange={handleChange}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">Complaint Currently Present</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pain Level (0-10)</label>
                    <input
                      type="number"
                      name="pain_level"
                      value={formData.pain_level}
                      onChange={handleChange}
                      placeholder="0-10 scale"
                      min="0"
                      max="10"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pain Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Specific area of pain"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Fever Temperature</label>
                  <input
                    type="text"
                    name="fever_last_temp"
                    value={formData.fever_last_temp}
                    onChange={handleChange}
                    placeholder="e.g., 98.6°F or 37°C"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detailed description of complaint..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Wound Assessment */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                Wound Assessment
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Wound Status</label>
                  <select
                    name="wound_status"
                    value={formData.wound_status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Wound Status</option>
                    <option value="Healing">Healing Well</option>
                    <option value="Open">Open</option>
                    <option value="Closed">Fully Closed</option>
                    <option value="Infected">Signs of Infection</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="text-md font-semibold text-gray-800 mb-4">Wound Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                        <input
                          type="text"
                          name="wound_details.size"
                          value={formData.wound_details.size}
                          onChange={handleChange}
                          placeholder="e.g., 2cm x 3cm"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                        <input
                          type="text"
                          name="wound_details.color"
                          value={formData.wound_details.color}
                          onChange={handleChange}
                          placeholder="e.g., Pink, Red, Pale"
                          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="wound_details.infection_signs"
                          checked={formData.wound_details.infection_signs}
                          onChange={handleChange}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">Signs of Infection Present</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fracture Healing Evaluation */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">5</span>
                Fracture Healing Evaluation
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Healing Status</label>
                  <select
                    name="fracture_healing_evaluation_status"
                    value={formData.fracture_healing_evaluation_status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Healing Status</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Delayed">Delayed Union</option>
                    <option value="Non-union">Non-union</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Healing Details</label>
                  <textarea
                    name="fracture_healing_evaluation_details"
                    value={formData.fracture_healing_evaluation_details}
                    onChange={handleChange}
                    placeholder="Detailed evaluation of fracture healing progress..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Functional Outcome */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">6</span>
                Functional Outcome
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Functional Outcome Evaluation</label>
                  <select
                    name="functional_outcome_evaluation"
                    value={formData.functional_outcome_evaluation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Outcome</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Functional Outcome Details</label>
                  <textarea
                    name="functional_outcome_evaluation_details"
                    value={formData.functional_outcome_evaluation_details}
                    onChange={handleChange}
                    placeholder="Detailed assessment of functional recovery..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Activities of Daily Living */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">7</span>
                Activities of Daily Living
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dressing</label>
                    <select
                      name="activity_of_daily_living.dressing"
                      value={formData.activity_of_daily_living.dressing}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="Independent">Independent</option>
                      <option value="Needs Assistance">Needs Assistance</option>
                      <option value="Dependent">Dependent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bathing</label>
                    <select
                      name="activity_of_daily_living.bathing"
                      value={formData.activity_of_daily_living.bathing}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="Independent">Independent</option>
                      <option value="Needs Assistance">Needs Assistance</option>
                      <option value="Dependent">Dependent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Feeding</label>
                    <select
                      name="activity_of_daily_living.feeding"
                      value={formData.activity_of_daily_living.feeding}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="Independent">Independent</option>
                      <option value="Needs Assistance">Needs Assistance</option>
                      <option value="Dependent">Dependent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Return to Work, Mobility, Complications - Continue pattern... */}
            {/* I'll add a few more key sections to show the pattern */}

            {/* Return to Work */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">8</span>
                Return to Work
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <select
                      name="return_to_work.status"
                      value={formData.return_to_work.status}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Status</option>
                      <option value="Returned">Returned to Work</option>
                      <option value="On leave">On Medical Leave</option>
                      <option value="Modified duty">Modified Duty</option>
                      <option value="Not applicable">Not Applicable</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Restrictions</label>
                    <input
                      type="text"
                      name="return_to_work.restrictions"
                      value={formData.return_to_work.restrictions}
                      onChange={handleChange}
                      placeholder="e.g., No heavy lifting, Limited hours"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobility Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">9</span>
                Mobility Status
              </h2>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Mobility Status</label>
                <select
                  name="mobility_status"
                  value={formData.mobility_status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Mobility Status</option>
                  <option value="Walking independently">Walking Independently</option>
                  <option value="Using crutches">Using Crutches</option>
                  <option value="Using walker">Using Walker</option>
                  <option value="Wheelchair">Wheelchair Bound</option>
                  <option value="Bed-bound">Bed-bound</option>
                </select>
              </div>
            </div>

            {/* Complications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">10</span>
                Complications
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="complications.infection"
                        checked={formData.complications.infection}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Infection</span>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="complications.blood_clot"
                        checked={formData.complications.blood_clot}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Blood Clot / DVT</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Unplanned Readmission */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">11</span>
                Unplanned Readmission
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="unplanned_readmission.any"
                        checked={formData.unplanned_readmission.any}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Patient was readmitted to hospital</span>
                    </label>
                  </div>

                  {formData.unplanned_readmission.any && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Readmission Reason</label>
                      <textarea
                        name="unplanned_readmission.reason"
                        value={formData.unplanned_readmission.reason}
                        onChange={handleChange}
                        placeholder="Specify reason for readmission..."
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rehabilitation Services */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">12</span>
                Rehabilitation Services
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rehabilitation_service.physical_therapy"
                        checked={formData.rehabilitation_service.physical_therapy}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Physical Therapy</span>
                    </label>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="rehabilitation_service.occupational_therapy"
                        checked={formData.rehabilitation_service.occupational_therapy}
                        onChange={handleChange}
                        className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">Occupational Therapy</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality of Life */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">13</span>
                Quality of Life
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pain Score (0-10)</label>
                    <input
                      type="number"
                      name="quality_of_life.pain_score"
                      value={formData.quality_of_life.pain_score}
                      onChange={handleChange}
                      placeholder="0-10 scale"
                      min="0"
                      max="10"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Overall Satisfaction</label>
                    <select
                      name="quality_of_life.overall_satisfaction"
                      value={formData.quality_of_life.overall_satisfaction}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Satisfaction</option>
                      <option value="Very Satisfied">Very Satisfied</option>
                      <option value="Satisfied">Satisfied</option>
                      <option value="Neutral">Neutral</option>
                      <option value="Dissatisfied">Dissatisfied</option>
                      <option value="Very Dissatisfied">Very Dissatisfied</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Psychological Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">14</span>
                Psychological Status
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Anxiety Level</label>
                    <select
                      name="psychological_status.anxiety"
                      value={formData.psychological_status.anxiety}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Level</option>
                      <option value="None">None</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Depression Level</label>
                    <select
                      name="psychological_status.depression"
                      value={formData.psychological_status.depression}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select Level</option>
                      <option value="None">None</option>
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Satisfaction & Access */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">15</span>
                Patient Satisfaction & Access
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Satisfaction Rating</label>
                  <select
                    name="patient_satisfaction"
                    value={formData.patient_satisfaction}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Rating</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="financial_impact"
                      checked={formData.financial_impact}
                      onChange={handleChange}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">Financial Impact / Burden Present</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Access to Follow-up Care</label>
                  <select
                    name="access_to_followup_care"
                    value={formData.access_to_followup_care}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Access Level</option>
                    <option value="Good">Good - Easy Access</option>
                    <option value="Moderate">Moderate - Some Difficulties</option>
                    <option value="Limited">Limited Access</option>
                    <option value="Poor">Poor - Significant Barriers</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Cancel
                </span>
              </button>
              <button
                type="submit"
                className="flex-1 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Submit Follow-Up Assessment
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FollowUp;