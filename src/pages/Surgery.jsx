import React, { useState } from "react";

const Surgery = () => {
  const [surgeryType, setSurgeryType] = useState("");
  const [externalType, setExternalType] = useState("");
  const [internalType, setInternalType] = useState("");
  const [internalTypeOther, setInternalTypeOther] = useState("");
  const [extramedullaryType, setExtramedullaryType] = useState("");
  const [extramedullaryOther, setExtramedullaryOther] = useState("");
  const [intramedullaryType, setIntramedullaryType] = useState("");
  const [antigradeType, setAntigradeType] = useState("");
  const [antigradeOther, setAntigradeOther] = useState("");
  const [retrogradeType, setRetrogradeType] = useState("");
  const [retrogradeOther, setRetrogradeOther] = useState("");
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
      intramedullaryType,
      antigradeType,
      antigradeOther,
      retrogradeType,
      retrogradeOther,
      materialUsed,
      combinedText,
      description,
    };

    console.log("Submitted form data:", formData);
    setSubmittedData(formData);
  };

  const showPlateFields = [
    "dcp",
    "recomplate",
    "abps",
    "lcps",
    "pflcps",
    "dflcps",
    "other",
  ].includes(extramedullaryType);
  const showNailFieldsAntigrade = [
    "solid-nail",
    "hollow-nail",
    "pfn",
    "other",
  ].includes(antigradeType);
  const showNailFieldsRetrograde = [
    "solid-nail",
    "hollow-nail",
    "dfn",
    "other",
  ].includes(retrogradeType);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Surgery Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Surgery Type */}
        <label
          htmlFor="surgery-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Surgery Type:
        </label>
        <select
          id="surgery-select"
          value={surgeryType}
          onChange={handleSurgeryChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="internal">Internal fixtures</option>
          <option value="external">External fixtures</option>
          <option value="combined">Combined</option>
        </select>

        {/* External Options */}
        {surgeryType === "external" && (
          <div>
            <label
              htmlFor="external-type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Select External Fixture Type:
            </label>
            <select
              id="external-type"
              value={externalType}
              onChange={(e) => setExternalType(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            >
              <option value="">--Select External Type--</option>
              <option value="conventional">Conventional</option>
              <option value="rail-fixator">Rail Fixator</option>
              <option value="illizarov">Illizarov</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {/* Internal Options */}
        {surgeryType === "internal" && (
          <div>
            <label
              htmlFor="internal-type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Internal Fixture Type:
            </label>
            <select
              id="internal-type"
              value={internalType}
              onChange={(e) => {
                setInternalType(e.target.value);
                setInternalTypeOther("");
                setExtramedullaryType("");
                setExtramedullaryOther("");
                setIntramedullaryType("");
                setAntigradeType("");
                setAntigradeOther("");
                setRetrogradeType("");
                setRetrogradeOther("");
              }}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
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
                placeholder="Enter other internal type"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
            )}

            {/* Extramedullary Options */}
            {internalType === "extramedullary" && (
              <div>
                <label
                  htmlFor="extramedullary-type"
                  className="block mb-2 text-sm text-gray-700"
                >
                  Select Extramedullary Type:
                </label>
                <select
                  id="extramedullary-type"
                  value={extramedullaryType}
                  onChange={(e) => setExtramedullaryType(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                >
                  <option value="">--Select Option--</option>
                  <option value="dcp">DCP: Dynamic Compression Plate</option>
                  <option value="recomplate">Recomplate</option>
                  <option value="abps">ABPs: Angular Blade Plates</option>
                  <option value="dhs">DHS: Dynamic Hip Screw</option>
                  <option value="dcs">DCS: Dynamic Condylar Screw</option>
                  <option value="lcps">LCPs: Locking Compression Plate</option>
                  <option value="pflcps">PFLCPs: Proximal Femoral LCPs</option>
                  <option value="dflcps">DFLCPs: Distal Femoral LCPs</option>
                  <option value="other">Other</option>
                </select>

                {showPlateFields && (
                  <>
                    <input
                      type="text"
                      value={extramedullaryOther}
                      onChange={(e) => setExtramedullaryOther(e.target.value)}
                      placeholder="Enter plate name"
                      className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Enter plate length"
                      className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Enter screw count"
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    />
                  </>
                )}
              </div>
            )}

            {/* Intramedullary Options */}
            {internalType === "intramedullary" && (
              <div>
                <label
                  htmlFor="intramedullary-type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Intramedullary Type:
                </label>
                <select
                  id="intramedullary-type"
                  value={intramedullaryType}
                  onChange={(e) => {
                    setIntramedullaryType(e.target.value);
                    setAntigradeType("");
                    setAntigradeOther("");
                    setRetrogradeType("");
                    setRetrogradeOther("");
                  }}
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                >
                  <option value="">--Select Option--</option>
                  <option value="antigrade">Antigrade</option>
                  <option value="retrograde">Retrograde</option>
                </select>

                {/* Antigrade */}
                {intramedullaryType === "antigrade" && (
                  <div>
                    <label
                      htmlFor="antigrade-type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Select Antigrade Type:
                    </label>
                    <select
                      id="antigrade-type"
                      value={antigradeType}
                      onChange={(e) => setAntigradeType(e.target.value)}
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">--Select Option--</option>
                      <option value="solid-nail">Solid Nail</option>
                      <option value="hollow-nail">Hollow Nail</option>
                      <option value="pfn">PFN: Proximal Femoral Nail</option>
                      <option value="other">Other</option>
                    </select>

                    {showNailFieldsAntigrade && (
                      <>
                        <input
                          type="text"
                          value={antigradeOther}
                          onChange={(e) => setAntigradeOther(e.target.value)}
                          placeholder="Enter nail name"
                          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Enter nail length"
                          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Enter nail diameter"
                          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        />
                      </>
                    )}
                  </div>
                )}

                {/* Retrograde */}
                {intramedullaryType === "retrograde" && (
                  <div>
                    <label
                      htmlFor="retrograde-type"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Select Retrograde Type:
                    </label>
                    <select
                      id="retrograde-type"
                      value={retrogradeType}
                      onChange={(e) => setRetrogradeType(e.target.value)}
                      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">--Select Option--</option>
                      <option value="solid-nail">Solid Nail</option>
                      <option value="hollow-nail">Hollow Nail</option>
                      <option value="dfn">DFN: Distal Femoral Nail</option>
                      <option value="other">Other</option>
                    </select>

                    {showNailFieldsRetrograde && (
                      <>
                        <input
                          type="text"
                          value={retrogradeOther}
                          onChange={(e) => setRetrogradeOther(e.target.value)}
                          placeholder="Enter nail name"
                          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Enter nail length"
                          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="text"
                          placeholder="Enter nail diameter"
                          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Combined */}
        {surgeryType === "combined" && (
          <div>
            <label
              htmlFor="combined-text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Describe Combined Surgery:
            </label>
            <input
              type="text"
              id="combined-text"
              value={combinedText}
              onChange={(e) => setCombinedText(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Enter combined surgery details..."
            />
          </div>
        )}

        {/* Material */}
        <div>
          <label
            htmlFor="material-used"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Material Used:
          </label>
          <select
            id="material-used"
            value={materialUsed}
            onChange={(e) => setMaterialUsed(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            required
          >
            <option value="">--Select Material--</option>
            <option value="stainless-steel">Stainless Steel</option>
            <option value="titanium">Titanium</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            placeholder="Enter any additional notes or description..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Surgery;
