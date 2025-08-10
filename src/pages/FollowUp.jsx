import React from "react";

const FollowUp = () => {
  return (
    <>
      <title>Follow-up - Trauma Registry</title>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Follow-up Evaluation - Trauma Registry
        </h1>

        <form className="bg-white shadow-md rounded-lg p-6 border border-gray-200 overflow-auto max-h-[85vh]">
          <fieldset className="space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Sex
                </label>
                <select className="w-full border border-gray-300 p-2 rounded">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Diagnosis and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Diagnosis
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-1">
                  Follow-up Period
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            {/* Complaints */}
            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-1">
                Complaints
              </label>
              <textarea
                rows="2"
                className="w-full border border-gray-300 p-2 rounded"
              ></textarea>
            </div>

            {/* Pain */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-gray-700">Pain</label>
                <div className="flex gap-4 mt-1">
                  <label>
                    <input type="checkbox" /> Yes
                  </label>
                  <label>
                    <input type="checkbox" /> No
                  </label>
                </div>
                <div className="mt-2">
                  <label>Severity:</label>
                  <select className="w-full border border-gray-300 p-2 rounded mt-1">
                    <option value="">Select</option>
                    <option>Mild</option>
                    <option>Moderate</option>
                    <option>Severe</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label>Pain Level (0–10):</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  />
                </div>
                <div className="mt-2">
                  <label>Location:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                  />
                </div>
              </div>

              {/* Fever / Swelling / Deformity / Joint Stiffness */}
              <div className="space-y-4">
                {[
                  {
                    label: "Fever",
                    input: (
                      <input
                        type="text"
                        placeholder="Last Temp"
                        className="ml-2 border p-1 rounded"
                      />
                    ),
                  },
                  {
                    label: "Swelling",
                    input: (
                      <input
                        type="text"
                        placeholder="Location"
                        className="ml-2 border p-1 rounded"
                      />
                    ),
                  },
                  {
                    label: "Deformity",
                    input: (
                      <input
                        type="text"
                        placeholder="Location"
                        className="ml-2 border p-1 rounded"
                      />
                    ),
                  },
                  {
                    label: "Joint Stiffness",
                    input: (
                      <input
                        type="text"
                        placeholder="Describe"
                        className="ml-2 border p-1 rounded"
                      />
                    ),
                  },
                ].map((item, i) => (
                  <div key={i}>
                    <label className="font-semibold text-gray-700">
                      {item.label}:
                    </label>
                    <div className="flex items-center gap-4 mt-1">
                      <label>
                        <input type="checkbox" /> Yes
                      </label>
                      <label>
                        <input type="checkbox" /> No
                      </label>
                      {item.input}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wound Status */}
            <div>
              <label className="font-semibold text-gray-700">
                Wound Status
              </label>
              <div className="flex gap-6 mt-1">
                <label>
                  <input type="radio" name="wound" /> Healed
                </label>
                <label>
                  <input type="radio" name="wound" /> Complication
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 ml-4">
                {[
                  "Surgical site infection",
                  "Dehiscence",
                  "Marginal necrosis",
                  "Hypertrophic scar",
                  "Keloid",
                ].map((label, i) => (
                  <label key={i}>
                    <input type="checkbox" /> {label}
                  </label>
                ))}
                <label>
                  <input type="checkbox" /> Other:{" "}
                  <input type="text" className="ml-1 border p-1 rounded" />
                </label>
              </div>
            </div>

            {/* Fracture Healing Status */}
            <div>
              <label className="font-semibold text-gray-700">
                Fracture Healing Status
              </label>
              <div className="mt-1">
                <label>
                  <input type="checkbox" /> Evaluated
                </label>
                <div className="flex flex-wrap gap-4 mt-2 ml-4">
                  {[
                    "Uniting",
                    "United",
                    "Delayed Union",
                    "Non-union",
                    "Implant failure",
                  ].map((status, i) => (
                    <label key={i}>
                      <input type="radio" name="healing" /> {status}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Functional Outcome */}
            <div>
              <label className="font-semibold text-gray-700">
                Functional Outcome
              </label>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <label>
                  <input type="checkbox" /> Evaluated
                </label>
                <select className="border p-2 rounded">
                  <option>AOFAS</option>
                  <option>Harris Hip Score</option>
                  <option>Oxford Knee</option>
                  <option>Constant Shoulder</option>
                  <option>Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Score"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* ADL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Locomotion", "Feeding"].map((label, i) => (
                <div key={i}>
                  <label className="block font-semibold text-gray-700">
                    {label}
                  </label>
                  <select className="w-full border p-2 rounded mt-1">
                    <option>Independent</option>
                    <option>Partial Assistance</option>
                    <option>Dependent</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Return to Work */}
            <div>
              <label className="font-semibold text-gray-700">
                Return to Work
              </label>
              <div className="flex gap-4 mt-1">
                <label>
                  <input type="checkbox" /> Pre-Injury Employment
                </label>
              </div>
              <div className="mt-2 flex flex-col md:flex-row gap-4">
                <select className="border p-2 rounded">
                  <option>Returned to Work</option>
                  <option>Partial Return</option>
                  <option>Not Returned</option>
                  <option>Not Applicable</option>
                </select>
                <input
                  type="text"
                  placeholder="Specify role"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Mobility */}
            <div>
              <label className="block font-semibold text-gray-700">
                Mobility Status
              </label>
              <select className="w-full border p-2 rounded mt-1">
                <option>Fully Mobile</option>
                <option>Uses Assistive Device</option>
                <option>Wheelchair-Bound</option>
                <option>Bedridden</option>
              </select>
            </div>

            {/* Complications */}
            <div>
              <label className="block font-semibold text-gray-700">
                Complications
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Infection", "Pressure Ulcers", "DVT/PE"].map((label, i) => (
                  <label key={i}>
                    <input type="checkbox" /> {label}
                  </label>
                ))}
                <label>
                  <input type="checkbox" /> Other:{" "}
                  <input type="text" className="ml-1 border p-1 rounded" />
                </label>
              </div>
            </div>

            {/* Readmissions */}
            <div>
              <label className="block font-semibold text-gray-700">
                Unplanned Readmissions
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                <label>
                  <input type="checkbox" /> Yes
                </label>
                <label>
                  <input type="checkbox" /> No
                </label>
                <input
                  type="text"
                  placeholder="Reason"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Date(s)"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Rehab */}
            <div>
              <label className="block font-semibold text-gray-700">
                Rehabilitation Services
              </label>
              <div className="flex gap-4 mt-2">
                <label>
                  <input type="checkbox" /> Received
                </label>
                <label>
                  <input type="checkbox" /> Not Received
                </label>
                <input
                  type="text"
                  placeholder="Duration"
                  className="border p-2 rounded"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-4">
                {[
                  "Physical Therapy",
                  "Occupational Therapy",
                  "Psychological Support",
                ].map((type, i) => (
                  <label key={i}>
                    <input type="checkbox" /> {type}
                  </label>
                ))}
                <label>
                  <input type="checkbox" /> Other:{" "}
                  <input type="text" className="ml-1 border p-1 rounded" />
                </label>
              </div>
            </div>

            {/* QOL */}
            <div>
              <label className="block font-semibold text-gray-700">
                Quality of Life
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                <select className="border p-2 rounded">
                  <option>SF-36</option>
                  <option>EQ-5D</option>
                  <option>Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Score"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Psychological Status */}
            <div>
              <label className="block font-semibold text-gray-700">
                Post-Traumatic Stress Symptoms
              </label>
              <div className="flex gap-4 mt-2">
                <label>
                  <input type="checkbox" /> Yes
                </label>
                <label>
                  <input type="checkbox" /> No
                </label>
                <input
                  type="text"
                  placeholder="Describe"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Satisfaction */}
            <div>
              <label className="block font-semibold text-gray-700">
                Patient Satisfaction (1–5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="border p-2 rounded mt-1"
              />
            </div>

            {/* Financial Impact */}
            <div>
              <label className="block font-semibold text-gray-700">
                Significant Financial Burden?
              </label>
              <div className="flex gap-4 mt-1">
                <label>
                  <input type="checkbox" /> Yes
                </label>
                <label>
                  <input type="checkbox" /> No
                </label>
              </div>
            </div>

            {/* Follow-up Access */}
            <div>
              <label className="block font-semibold text-gray-700">
                Access to Follow-Up Care - Barriers
              </label>
              <div className="flex flex-wrap gap-4 mt-1">
                {["Transportation", "Financial", "None"].map((item, i) => (
                  <label key={i}>
                    <input type="checkbox" /> {item}
                  </label>
                ))}
                <label>
                  <input type="checkbox" /> Other:{" "}
                  <input type="text" className="ml-1 border p-1 rounded" />
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default FollowUp;
