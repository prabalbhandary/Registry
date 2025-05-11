import React, { useState } from "react";

const Surgery = () => {
  const [surgeryType, setSurgeryType] = useState("");
  const [externalType, setExternalType] = useState("");
  const [internalType, setInternalType] = useState("");
  const [internalTypeOther, setInternalTypeOther] = useState("");
  const [extramedullaryType, setExtramedullaryType] = useState("");
  const [extramedullaryOther, setExtramedullaryOther] = useState("");
  const [extramedullarySize, setExtramedullarySize] = useState("");
  const [extramedullaryScrews, setExtramedullaryScrews] = useState("");
  const [extramedullaryElaboration, setExtramedullaryElaboration] = useState("");
  const [intramedullaryType, setIntramedullaryType] = useState("");
  const [antigradeType, setAntigradeType] = useState("");
  const [antigradeOther, setAntigradeOther] = useState("");
  const [antigradeSize, setAntigradeSize] = useState("");
  const [antigradeDiameter, setAntigradeDiameter] = useState("");
  const [antigradeElaboration, setAntigradeElaboration] = useState("");
  const [retrogradeType, setRetrogradeType] = useState("");
  const [retrogradeOther, setRetrogradeOther] = useState("");
  const [retrogradeSize, setRetrogradeSize] = useState("");
  const [retrogradeDiameter, setRetrogradeDiameter] = useState("");
  const [retrogradeElaboration, setRetrogradeElaboration] = useState("");
  const [materialUsed, setMaterialUsed] = useState("");
  const [description, setDescription] = useState("");
  const [combinedText, setCombinedText] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

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
    setAntigradeOther("");
    setRetrogradeType("");
    setRetrogradeOther("");
    setCombinedText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      surgeryType,
      externalType,
      internalType,
      internalTypeOther,
      extramedullaryType,
      extramedullaryOther,
      extramedullarySize,
      extramedullaryScrews,
      extramedullaryElaboration,
      intramedullaryType,
      antigradeType,
      antigradeOther,
      antigradeSize,
      antigradeDiameter,
      antigradeElaboration,
      retrogradeType,
      retrogradeOther,
      retrogradeSize,
      retrogradeDiameter,
      retrogradeElaboration,
      materialUsed,
      description,
      combinedText,
    };

    console.log("Submitted form data:", formData);
    setSubmittedData(formData);
  };

  const showPlateFields = ["dcp", "recomplate", "abps", "lcps", "pflcps", "dflcps"].includes(extramedullaryType);
  const showNailFieldsAntigrade = ["solid-nail", "hollow-nail", "pfn"].includes(antigradeType);
  const showNailFieldsRetrograde = ["solid-nail", "hollow-nail", "dfn"].includes(retrogradeType);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Surgery Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Surgery Type */}
        <label htmlFor="surgery-select" className="block mb-2">Select Surgery Type:</label>
        <select
          id="surgery-select"
          value={surgeryType}
          onChange={handleSurgeryChange}
          className="w-full mb-4 border px-4 py-2 rounded"
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="internal">Internal fixtures</option>
          <option value="external">External fixtures</option>
          <option value="combined">Combined</option>
        </select>

        {/* External Type */}
        {surgeryType === "external" && (
          <>
            <label className="block mb-2">Select External Fixture Type:</label>
            <select
              value={externalType}
              onChange={(e) => setExternalType(e.target.value)}
              className="w-full mb-4 border px-4 py-2 rounded"
            >
              <option value="">--Select External Type--</option>
              <option value="conventional">Conventional</option>
              <option value="rail-fixator">Rail Fixator</option>
              <option value="illizarov">Illizarov</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        {/* Internal Fixture */}
        {surgeryType === "internal" && (
          <>
            <label className="block mb-2">Select Internal Fixture Type:</label>
            <select
              value={internalType}
              onChange={(e) => {
                setInternalType(e.target.value);
                setInternalTypeOther("");
                setExtramedullaryType("");
                setIntramedullaryType("");
              }}
              className="w-full mb-4 border px-4 py-2 rounded"
            >
              <option value="">--Select Internal Type--</option>
              <option value="extramedullary">Extramedullary</option>
              <option value="intramedullary">Intramedullary</option>
              <option value="other">Other</option>
            </select>

            {internalType === "other" && (
              <input
                type="text"
                value={internalTypeOther}
                onChange={(e) => setInternalTypeOther(e.target.value)}
                className="w-full mb-4 border px-4 py-2 rounded"
                placeholder="Enter internal type"
              />
            )}

            {/* Extramedullary */}
            {internalType === "extramedullary" && (
              <>
                <label className="block mb-2">Select Extramedullary Type:</label>
                <select
                  value={extramedullaryType}
                  onChange={(e) => setExtramedullaryType(e.target.value)}
                  className="w-full mb-4 border px-4 py-2 rounded"
                >
                  <option value="">--Select Option--</option>
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
                  <>
                    <input
                      type="text"
                      value={extramedullarySize}
                      onChange={(e) => setExtramedullarySize(e.target.value)}
                      placeholder="Size of the Plate (holes)"
                      className="w-full mb-2 border px-4 py-2 rounded"
                    />
                    <input
                      type="text"
                      value={extramedullaryScrews}
                      onChange={(e) => setExtramedullaryScrews(e.target.value)}
                      placeholder="Number of Screws"
                      className="w-full mb-2 border px-4 py-2 rounded"
                    />
                    <input
                      type="text"
                      value={extramedullaryElaboration}
                      onChange={(e) => setExtramedullaryElaboration(e.target.value)}
                      placeholder="Elaboration"
                      className="w-full mb-4 border px-4 py-2 rounded"
                    />
                  </>
                )}
              </>
            )}

            {/* Intramedullary */}
            {internalType === "intramedullary" && (
              <>
                <label className="block mb-2">Select Intramedullary Type:</label>
                <select
                  value={intramedullaryType}
                  onChange={(e) => {
                    setIntramedullaryType(e.target.value);
                    setAntigradeType("");
                    setRetrogradeType("");
                  }}
                  className="w-full mb-4 border px-4 py-2 rounded"
                >
                  <option value="">--Select--</option>
                  <option value="antigrade">Antigrade</option>
                  <option value="retrograde">Retrograde</option>
                </select>

                {intramedullaryType === "antigrade" && (
                  <>
                    <label className="block mb-2">Antigrade Type:</label>
                    <select
                      value={antigradeType}
                      onChange={(e) => setAntigradeType(e.target.value)}
                      className="w-full mb-4 border px-4 py-2 rounded"
                    >
                      <option value="">--Select--</option>
                      <option value="solid-nail">Solid Nail</option>
                      <option value="hollow-nail">Hollow Nail</option>
                      <option value="pfn">PFN</option>
                      <option value="other">Other</option>
                    </select>

                    {showNailFieldsAntigrade && (
                      <>
                        <input
                          type="text"
                          value={antigradeSize}
                          onChange={(e) => setAntigradeSize(e.target.value)}
                          placeholder="Nail Length"
                          className="w-full mb-2 border px-4 py-2 rounded"
                        />
                        <input
                          type="text"
                          value={antigradeDiameter}
                          onChange={(e) => setAntigradeDiameter(e.target.value)}
                          placeholder="Nail Diameter"
                          className="w-full mb-2 border px-4 py-2 rounded"
                        />
                        <input
                          type="text"
                          value={antigradeElaboration}
                          onChange={(e) => setAntigradeElaboration(e.target.value)}
                          placeholder="Elaboration"
                          className="w-full mb-4 border px-4 py-2 rounded"
                        />
                      </>
                    )}
                  </>
                )}

                {intramedullaryType === "retrograde" && (
                  <>
                    <label className="block mb-2">Retrograde Type:</label>
                    <select
                      value={retrogradeType}
                      onChange={(e) => setRetrogradeType(e.target.value)}
                      className="w-full mb-4 border px-4 py-2 rounded"
                    >
                      <option value="">--Select--</option>
                      <option value="solid-nail">Solid Nail</option>
                      <option value="hollow-nail">Hollow Nail</option>
                      <option value="dfn">DFN</option>
                      <option value="other">Other</option>
                    </select>

                    {showNailFieldsRetrograde && (
                      <>
                        <input
                          type="text"
                          value={retrogradeSize}
                          onChange={(e) => setRetrogradeSize(e.target.value)}
                          placeholder="Nail Length"
                          className="w-full mb-2 border px-4 py-2 rounded"
                        />
                        <input
                          type="text"
                          value={retrogradeDiameter}
                          onChange={(e) => setRetrogradeDiameter(e.target.value)}
                          placeholder="Nail Diameter"
                          className="w-full mb-2 border px-4 py-2 rounded"
                        />
                        <input
                          type="text"
                          value={retrogradeElaboration}
                          onChange={(e) => setRetrogradeElaboration(e.target.value)}
                          placeholder="Elaboration"
                          className="w-full mb-4 border px-4 py-2 rounded"
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        {/* Combined */}
        {surgeryType === "combined" && (
          <>
            <label className="block mb-2">Describe Combined Surgery:</label>
            <input
              type="text"
              value={combinedText}
              onChange={(e) => setCombinedText(e.target.value)}
              className="w-full mb-4 border px-4 py-2 rounded"
              placeholder="Enter combined surgery details..."
            />
          </>
        )}

        {/* Material Used */}
        <label className="block mb-2">Material Used:</label>
        <select
          value={materialUsed}
          onChange={(e) => setMaterialUsed(e.target.value)}
          className="w-full mb-4 border px-4 py-2 rounded"
          required
        >
          <option value="">--Select Material--</option>
          <option value="stainless-steel">Stainless Steel</option>
          <option value="titanium">Titanium</option>
        </select>

        {/* Description */}
        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full mb-4 border px-4 py-2 rounded"
          placeholder="Any additional notes..."
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Surgery;
