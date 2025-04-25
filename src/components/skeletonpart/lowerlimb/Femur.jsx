import React, { useState } from "react";

const Femur = () => {
  const [fractureType, setFractureType] = useState("");
  const [side, setSide] = useState("");
  const [location, setLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState("");
  const [classification, setClassification] = useState("");
  const [subClassification, setSubClassification] = useState("");
  const [plan, setPlan] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const fractureOptions = ["Closed", "Open"];
  const sideOptions = ["Right", "Left"];
  const locationOptions = ["Proximal", "Midshaft", "Distal", "Other"];

  const closedClassifications = ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"];
  const openClassifications = ["GA I", "GA II", "GA IIIA", "GA IIIB", "GA IIIC"];

  const subclassifications = {
    "GA I": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA II": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIA": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIB": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
    "GA IIIC": ["AO32A (Simple)", "AO32B (Wedge)", "AO32C (Complex)"],
  };

  const handleSave = (type) => {
    if (type === "followup") {
      setSavedMessage("✅ Saved to Follow Up!");
    } else {
      setSavedMessage("✅ Saved to Surgery!");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Fracture Type */}
      <select
        className="p-2 border rounded"
        value={fractureType}
        onChange={(e) => {
          setFractureType(e.target.value);
          setSide("");
          setLocation("");
          setOtherLocation("");
          setClassification("");
          setSubClassification("");
          setSavedMessage("");
        }}
      >
        <option value="">Select Fracture Type</option>
        {fractureOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Side */}
      {fractureType && (
        <select
          className="p-2 border rounded"
          value={side}
          onChange={(e) => {
            setSide(e.target.value);
            setLocation("");
            setOtherLocation("");
            setClassification("");
            setSubClassification("");
            setSavedMessage("");
          }}
        >
          <option value="">Select Side</option>
          {sideOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      {/* Location */}
      {side && (
        <>
          <select
            className="p-2 border rounded"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setOtherLocation("");
              setClassification("");
              setSubClassification("");
              setSavedMessage("");
            }}
          >
            <option value="">Select Location</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* If Location is Other, show Text Input */}
          {location === "Other" && (
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Specify Other Location"
              value={otherLocation}
              onChange={(e) => setOtherLocation(e.target.value)}
            />
          )}
        </>
      )}

      {/* Classification */}
      {(location && (location !== "Other" || (location === "Other" && otherLocation))) && (
        <select
          className="p-2 border rounded"
          value={classification}
          onChange={(e) => {
            setClassification(e.target.value);
            setSubClassification("");
            setSavedMessage("");
          }}
        >
          <option value="">Select Classification</option>
          {(fractureType === "Closed" ? closedClassifications : openClassifications).map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      )}

      {/* SubClassification (only for Open fractures) */}
      {classification && fractureType === "Open" && subclassifications[classification] && (
        <select
          className="p-2 border rounded"
          value={subClassification}
          onChange={(e) => {
            setSubClassification(e.target.value);
            setSavedMessage("");
          }}
        >
          <option value="">Select Sub Classification</option>
          {subclassifications[classification].map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      {/* Final Output */}
      {(fractureType && side && location && classification && (location !== "Other" || (location === "Other" && otherLocation))) && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <p>Fracture Type: {fractureType}</p>
            <p>Side: {side}</p>
            <p>Location: {location === "Other" ? otherLocation : location}</p>
            <p>Classification: {classification}</p>
            {subClassification && <p>Sub-Classification: {subClassification}</p>}
          </div>

          {/* Plan Section */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Plan:</label>
            <textarea
              className="p-2 border rounded min-h-[100px]"
              placeholder="Enter your plan here..."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            />
          </div>

          {/* Save Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => handleSave("followup")}
            >
              Save to Follow Up
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => handleSave("surgery")}
            >
              Save to Surgery
            </button>
          </div>

          {/* Save message */}
          {savedMessage && (
            <div className="text-lg font-semibold text-blue-600">{savedMessage}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Femur;
