import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import { toast } from "react-toastify";

const FollowUp = () => {
  const patientDetailId = localStorage.getItem("patient_detail_id") || "";

  // ---------------- BACKEND MATCHING FIELDS ----------------
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

  // ---------------- PATIENT INFO + DIAGNOSIS ----------------
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    age: "",
    sex: "",
    diagnosis: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ---------------- FETCH PATIENT DETAILS ----------------
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

  // ---------------- FETCH DIAGNOSIS FROM FEMUR API ----------------
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

  // ---------------- HANDLE FORM INPUT ----------------
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

  // ---------------- HANDLE SUBMIT ----------------
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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Follow-Up Form</h1>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ---------------- PATIENT INFO ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input className="border p-2 bg-gray-100" value={patientInfo.name} readOnly />
          <input className="border p-2 bg-gray-100" value={patientInfo.age} readOnly />
          <input className="border p-2 bg-gray-100" value={patientInfo.sex} readOnly />
          <input className="border p-2 bg-gray-100" value={patientInfo.diagnosis ? patientInfo.diagnosis : "No diagnosis"} readOnly />
        </div>

        {/* Follow-Up Period */}
        <input
          type="text"
          name="follow_up_period"
          value={formData.follow_up_period}
          onChange={handleChange}
          placeholder="Follow-Up Period *"
          className="border p-2 w-full"
        />

        {/* Complaint */}
        <input
          type="text"
          name="complaint_type"
          value={formData.complaint_type}
          onChange={handleChange}
          placeholder="Complaint Type"
          className="border p-2 w-full"
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="presence"
            checked={formData.presence}
            onChange={handleChange}
          />
          Complaint Present
        </label>

        <input
          type="text"
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          placeholder="Severity"
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="pain_level"
          value={formData.pain_level}
          onChange={handleChange}
          placeholder="Pain Level"
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Pain Location"
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="fever_last_temp"
          value={formData.fever_last_temp}
          onChange={handleChange}
          placeholder="Last Fever Temperature"
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
        />

        {/* Wound */}
        <fieldset className="border p-4">
          <legend>Wound</legend>
          <input
            type="text"
            name="wound_status"
            value={formData.wound_status}
            onChange={handleChange}
            placeholder="Wound Status"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="wound_details.size"
            value={formData.wound_details.size}
            onChange={handleChange}
            placeholder="Size"
            className="border p-2 w-full mt-2"
          />

          <input
            type="text"
            name="wound_details.color"
            value={formData.wound_details.color}
            onChange={handleChange}
            placeholder="Color"
            className="border p-2 w-full mt-2"
          />

          <label className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="wound_details.infection_signs"
              checked={formData.wound_details.infection_signs}
              onChange={handleChange}
            />
            Infection Signs
          </label>
        </fieldset>

        {/* Fracture Healing */}
        <input
          type="text"
          name="fracture_healing_evaluation_status"
          value={formData.fracture_healing_evaluation_status}
          onChange={handleChange}
          placeholder="Fracture Healing Status"
          className="border p-2 w-full"
        />

        <textarea
          name="fracture_healing_evaluation_details"
          value={formData.fracture_healing_evaluation_details}
          onChange={handleChange}
          placeholder="Fracture Healing Details"
          className="border p-2 w-full"
        />

        {/* Functional Outcome */}
        <input
          type="text"
          name="functional_outcome_evaluation"
          value={formData.functional_outcome_evaluation}
          onChange={handleChange}
          placeholder="Functional Outcome Evaluation"
          className="border p-2 w-full"
        />

        <textarea
          name="functional_outcome_evaluation_details"
          value={formData.functional_outcome_evaluation_details}
          onChange={handleChange}
          placeholder="Functional Outcome Details"
          className="border p-2 w-full"
        />

        {/* ADL */}
        <fieldset className="border p-4">
          <legend>Activities of Daily Living</legend>

          <input
            type="text"
            name="activity_of_daily_living.dressing"
            value={formData.activity_of_daily_living.dressing}
            onChange={handleChange}
            placeholder="Dressing"
            className="border p-2 w-full mb-2"
          />

          <input
            type="text"
            name="activity_of_daily_living.bathing"
            value={formData.activity_of_daily_living.bathing}
            onChange={handleChange}
            placeholder="Bathing"
            className="border p-2 w-full mb-2"
          />

          <input
            type="text"
            name="activity_of_daily_living.feeding"
            value={formData.activity_of_daily_living.feeding}
            onChange={handleChange}
            placeholder="Feeding"
            className="border p-2 w-full"
          />
        </fieldset>

        {/* Return to Work */}
        <fieldset className="border p-4">
          <legend>Return to Work</legend>

          <input
            type="text"
            name="return_to_work.status"
            value={formData.return_to_work.status}
            onChange={handleChange}
            placeholder="Status"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="return_to_work.restrictions"
            value={formData.return_to_work.restrictions}
            onChange={handleChange}
            placeholder="Restrictions"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* Mobility */}
        <input
          type="text"
          name="mobility_status"
          value={formData.mobility_status}
          onChange={handleChange}
          placeholder="Mobility Status"
          className="border p-2 w-full"
        />

        {/* Complications */}
        <fieldset className="border p-4">
          <legend>Complications</legend>

          <label className="flex gap-2">
            <input
              type="checkbox"
              name="complications.infection"
              checked={formData.complications.infection}
              onChange={handleChange}
            />
            Infection
          </label>

          <label className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="complications.blood_clot"
              checked={formData.complications.blood_clot}
              onChange={handleChange}
            />
            Blood Clot
          </label>
        </fieldset>

        {/* Readmission */}
        <fieldset className="border p-4">
          <legend>Unplanned Readmission</legend>

          <label className="flex gap-2">
            <input
              type="checkbox"
              name="unplanned_readmission.any"
              checked={formData.unplanned_readmission.any}
              onChange={handleChange}
            />
            Yes
          </label>

          {formData.unplanned_readmission.any && (
            <input
              type="text"
              name="unplanned_readmission.reason"
              value={formData.unplanned_readmission.reason}
              onChange={handleChange}
              placeholder="Reason"
              className="border p-2 w-full mt-2"
            />
          )}
        </fieldset>

        {/* Rehabilitation */}
        <fieldset className="border p-4">
          <legend>Rehabilitation Services</legend>

          <label className="flex gap-2">
            <input
              type="checkbox"
              name="rehabilitation_service.physical_therapy"
              checked={formData.rehabilitation_service.physical_therapy}
              onChange={handleChange}
            />
            Physical Therapy
          </label>

          <label className="flex gap-2 mt-2">
            <input
              type="checkbox"
              name="rehabilitation_service.occupational_therapy"
              checked={formData.rehabilitation_service.occupational_therapy}
              onChange={handleChange}
            />
            Occupational Therapy
          </label>
        </fieldset>

        {/* QOL */}
        <fieldset className="border p-4">
          <legend>Quality of Life</legend>

          <input
            type="text"
            name="quality_of_life.pain_score"
            value={formData.quality_of_life.pain_score}
            onChange={handleChange}
            placeholder="Pain Score"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="quality_of_life.overall_satisfaction"
            value={formData.quality_of_life.overall_satisfaction}
            onChange={handleChange}
            placeholder="Overall Satisfaction"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* Psychological */}
        <fieldset className="border p-4">
          <legend>Psychological Status</legend>

          <input
            type="text"
            name="psychological_status.anxiety"
            value={formData.psychological_status.anxiety}
            onChange={handleChange}
            placeholder="Anxiety Level"
            className="border p-2 w-full"
          />

          <input
            type="text"
            name="psychological_status.depression"
            value={formData.psychological_status.depression}
            onChange={handleChange}
            placeholder="Depression Level"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* Satisfaction */}
        <input
          type="text"
          name="patient_satisfaction"
          value={formData.patient_satisfaction}
          onChange={handleChange}
          placeholder="Patient Satisfaction"
          className="border p-2 w-full"
        />

        {/* Financial Impact */}
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="financial_impact"
            checked={formData.financial_impact}
            onChange={handleChange}
          />
          Financial Impact
        </label>

        {/* Access to Care */}
        <input
          type="text"
          name="access_to_followup_care"
          value={formData.access_to_followup_care}
          onChange={handleChange}
          placeholder="Access to Follow-up Care"
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FollowUp;
