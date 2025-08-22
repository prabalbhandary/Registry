import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../components/URL";

const FollowUp = () => {
  const patientDetailId = localStorage.getItem("patient_detail_id") || "";
  const [formData, setFormData] = useState({
    patient_detail_id: patientDetailId,
    patient_name: "",
    patient_age: "",
    patient_sex: "",

    diagnosis: "",
    follow_up_period: "",

    fracture_healing: {
      evaluated: false,
      status: "",
    },

    functional_outcome: {
      evaluated: false,
      tool: "",
      score: "",
    },

    adl: {
      locomotion: "",
      feeding: "",
    },

    return_to_work: {
      pre_injury: false,
      current_status: "",
      role: "",
    },

    mobility_status: "",
    complications: [],

    readmission: {
      any: false,
      reason: "",
      dates: "",
    },

    rehab_services: {
      received: false,
      duration: "",
      types: [],
    },

    qol: {
      tool: "",
      score: "",
    },

    psychological: {
      ptsd: false,
      description: "",
    },

    satisfaction: "",
    financial_impact: false,
    access_to_care: [],
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const res = await axios.get(
          `${URL}/patient-detail/${patientDetailId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data.data[0];
        setFormData((prev) => ({
          ...prev,
          patient_name: [data.first_name, data.last_name].join(" "),
          patient_age: data.age,
          patient_sex: data.gender,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    if (patientDetailId) fetchPatientDetail();
  }, [patientDetailId]);

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

  const handleCheckboxArrayChange = (section, value) => {
    setFormData((prev) => {
      const arr = prev[section] || []; // Ensure it's always an array
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.diagnosis.trim() || !formData.follow_up_period.trim()) {
      setError("Diagnosis and Follow-Up Period are required.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/follow-up`, formData);
      if (res.data.success) {
        setMessage("Follow-up created successfully!");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to submit follow-up.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Follow-Up Form</h1>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={formData.patient_name}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
          <input
            type="text"
            value={formData.patient_age}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
          <input
            type="text"
            value={formData.patient_sex}
            readOnly
            className="border p-2 w-full bg-gray-100"
          />
        </div>

        {/* Diagnosis */}
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis *"
          className="border p-2 w-full"
        />

        {/* Follow-Up Period */}
        <input
          type="text"
          name="follow_up_period"
          value={formData.follow_up_period}
          onChange={handleChange}
          placeholder="Follow-Up Period *"
          className="border p-2 w-full"
        />

        {/* Fracture Healing */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Fracture Healing</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="fracture_healing.evaluated"
              checked={formData.fracture_healing.evaluated}
              onChange={handleChange}
            />{" "}
            Evaluated
          </label>
          <select
            name="fracture_healing.status"
            value={formData.fracture_healing.status}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          >
            <option value="">Select status</option>
            <option value="uniting">Uniting</option>
            <option value="united">United</option>
            <option value="delayed_union">Delayed Union</option>
            <option value="non_union">Non-union</option>
            <option value="implant_failure">Implant failure</option>
          </select>
        </fieldset>

        {/* Functional Outcome */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Functional Outcome</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="functional_outcome.evaluated"
              checked={formData.functional_outcome.evaluated}
              onChange={handleChange}
            />{" "}
            Evaluated
          </label>
          <select
            name="functional_outcome.tool"
            value={formData.functional_outcome.tool}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          >
            <option value="">Select tool</option>
            <option value="AOFAS">AOFAS</option>
            <option value="Harris Hip Score">Harris Hip Score</option>
            <option value="Oxford Knee">Oxford Knee</option>
            <option value="Constant Shoulder">Constant Shoulder</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="functional_outcome.score"
            value={formData.functional_outcome.score}
            onChange={handleChange}
            placeholder="Score"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* ADL */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Activities of Daily Living</legend>
          <select
            name="adl.locomotion"
            value={formData.adl.locomotion}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          >
            <option value="">Locomotion</option>
            <option value="independent">Independent</option>
            <option value="partial">Partial Assistance</option>
            <option value="dependent">Dependent</option>
          </select>
          <select
            name="adl.feeding"
            value={formData.adl.feeding}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Feeding</option>
            <option value="independent">Independent</option>
            <option value="partial">Partial Assistance</option>
            <option value="dependent">Dependent</option>
          </select>
        </fieldset>

        {/* Return to Work */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Return to Work</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="return_to_work.pre_injury"
              checked={formData.return_to_work.pre_injury}
              onChange={handleChange}
            />{" "}
            Pre-Injury Employment
          </label>
          <select
            name="return_to_work.current_status"
            value={formData.return_to_work.current_status}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          >
            <option value="">Select current status</option>
            <option value="returned">Returned to Work</option>
            <option value="partial">Partial Return</option>
            <option value="not_returned">Not Returned</option>
            <option value="na">Not Applicable</option>
          </select>
          <input
            type="text"
            name="return_to_work.role"
            value={formData.return_to_work.role}
            onChange={handleChange}
            placeholder="If returned, specify role"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* Mobility Status */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Mobility Status</legend>
          <select
            name="mobility_status"
            value={formData.mobility_status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select</option>
            <option value="fully_mobile">Fully Mobile</option>
            <option value="assistive_device">Uses Assistive Device</option>
            <option value="wheelchair">Wheelchair-Bound</option>
            <option value="bedridden">Bedridden</option>
          </select>
        </fieldset>

        {/* Complications */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Complications</legend>
          {["Infection", "Pressure Ulcers", "DVT/PE", "Other"].map((c) => (
            <label key={c} className="mr-4">
              <input
                type="checkbox"
                checked={(formData.complications || []).includes(c)}
                onChange={() => handleCheckboxArrayChange("complications", c)}
              />{" "}
              {c}
            </label>
          ))}
        </fieldset>

        {/* Readmission */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Unplanned Readmissions</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="readmission.any"
              checked={formData.readmission.any}
              onChange={handleChange}
            />{" "}
            Yes
          </label>
          {formData.readmission.any && (
            <>
              <input
                type="text"
                name="readmission.reason"
                value={formData.readmission.reason}
                onChange={handleChange}
                placeholder="Reason"
                className="border p-2 w-full mt-2"
              />
              <input
                type="text"
                name="readmission.dates"
                value={formData.readmission.dates}
                onChange={handleChange}
                placeholder="Date(s)"
                className="border p-2 w-full mt-2"
              />
            </>
          )}
        </fieldset>

        {/* Rehab Services */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Rehabilitation Services</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="rehab_services.received"
              checked={formData.rehab_services.received}
              onChange={handleChange}
            />{" "}
            Received
          </label>
          {formData.rehab_services.received && (
            <>
              <input
                type="text"
                name="rehab_services.duration"
                value={formData.rehab_services.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="border p-2 w-full mt-2"
              />
              {[
                "Physical Therapy",
                "Occupational Therapy",
                "Psychological Support",
                "Other",
              ].map((r) => (
                <label key={r} className="mr-4">
                  <input
                    type="checkbox"
                    checked={(formData.rehab_services.types || []).includes(r)}
                    onChange={() =>
                      handleCheckboxArrayChange("rehab_services.types", r)
                    }
                  />{" "}
                  {r}
                </label>
              ))}
            </>
          )}
        </fieldset>

        {/* QoL */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Quality of Life (QOL)</legend>
          <select
            name="qol.tool"
            value={formData.qol.tool}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select tool</option>
            <option value="SF-36">SF-36</option>
            <option value="EQ-5D">EQ-5D</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="qol.score"
            value={formData.qol.score}
            onChange={handleChange}
            placeholder="Score"
            className="border p-2 w-full mt-2"
          />
        </fieldset>

        {/* Psychological */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Psychological Status</legend>
          <label className="flex gap-2">
            <input
              type="checkbox"
              name="psychological.ptsd"
              checked={formData.psychological.ptsd}
              onChange={handleChange}
            />{" "}
            Post-Traumatic Stress Symptoms
          </label>
          {formData.psychological.ptsd && (
            <textarea
              name="psychological.description"
              value={formData.psychological.description}
              onChange={handleChange}
              placeholder="If yes, describe"
              className="border p-2 w-full mt-2"
            />
          )}
        </fieldset>

        {/* Satisfaction */}
        <div>
          <label className="block font-semibold">
            Satisfaction with Care (1–5)
          </label>
          <input
            type="number"
            name="satisfaction"
            min="1"
            max="5"
            value={formData.satisfaction}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        {/* Financial Impact */}
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="financial_impact"
            checked={formData.financial_impact}
            onChange={handleChange}
          />{" "}
          Significant financial burden
        </label>

        {/* Access to Care */}
        <fieldset className="border p-4">
          <legend className="font-semibold">Access to Follow-Up Care</legend>
          {["Transportation", "Financial", "None", "Other"].map((a) => (
            <label key={a} className="mr-4">
              <input
                type="checkbox"
                checked={(formData.access_to_care || []).includes(a)}
                onChange={() => handleCheckboxArrayChange("access_to_care", a)}
              />{" "}
              {a}
            </label>
          ))}
        </fieldset>

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
