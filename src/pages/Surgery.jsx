import React, { useState } from 'react';

const Surgery = () => {
  const [surgeryType, setSurgeryType] = useState('');
  const [externalType, setExternalType] = useState('');
  const [internalType, setInternalType] = useState('');
  const [extramedullaryType, setExtramedullaryType] = useState('');
  const [intramedullaryType, setIntramedullaryType] = useState('');
  const [antigradeType, setAntigradeType] = useState('');
  const [retrogradeType, setRetrogradeType] = useState('');
  const [materialUsed, setMaterialUsed] = useState('');
  const [combinedText, setCombinedText] = useState('');
  const [description, setDescription] = useState('');
  const [extramedullaryDetail, setExtramedullaryDetail] = useState('');
  const [antigradeDetail, setAntigradeDetail] = useState('');
  const [retrogradeDetail, setRetrogradeDetail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSurgeryChange = (e) => {
    const selectedType = e.target.value;
    setSurgeryType(selectedType);
    setExternalType('');
    setInternalType('');
    setExtramedullaryType('');
    setIntramedullaryType('');
    setAntigradeType('');
    setRetrogradeType('');
    setCombinedText('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      surgeryType,
      externalType,
      internalType,
      extramedullaryType,
      extramedullaryDetail,
      intramedullaryType,
      antigradeType,
      antigradeDetail,
      retrogradeType,
      retrogradeDetail,
      combinedText,
      materialUsed,
      description
    };

    console.log('Submitted form data:', formData);
    setSubmittedData(formData); // For showing confirmation
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Surgery Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Surgery Type */}
        <label htmlFor="surgery-select" className="block text-sm font-medium text-gray-700 mb-2">
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
        {surgeryType === 'external' && (
          <div>
            <label htmlFor="external-type" className="block mb-2 text-sm font-medium text-gray-700">
              Select External Fixture Type:
            </label>
            <div className="flex gap-2">
              <select
                id="external-type"
                value={externalType}
                onChange={(e) => setExternalType(e.target.value)}
                className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
              >
                <option value="">--Select External Type--</option>
                <option value="conventional">Conventional</option>
                <option value="rail-fixator">Rail Fixator</option>
                <option value="illizarov">Illizarov</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                value={extramedullaryDetail}
                onChange={(e) => setExtramedullaryDetail(e.target.value)}
                placeholder="Details for external type"
                className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Internal Options */}
        {surgeryType === 'internal' && (
          <div>
            <label htmlFor="internal-type" className="block text-sm font-medium text-gray-700 mb-2">
              Select Internal Fixture Type:
            </label>
            <select
              id="internal-type"
              value={internalType}
              onChange={(e) => {
                setInternalType(e.target.value);
                setExtramedullaryType('');
                setIntramedullaryType('');
                setAntigradeType('');
                setRetrogradeType('');
              }}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            >
              <option value="">--Select Internal Type--</option>
              <option value="extramedullary">Extramedullary</option>
              <option value="intramedullary">Intramedullary</option>
            </select>

            {/* Extramedullary Options */}
            {internalType === 'extramedullary' && (
              <div>
                <label htmlFor="extramedullary-type" className="block mb-2 text-sm text-gray-700">
                  Select Extramedullary Type:
                </label>
                <div className="flex gap-2">
                  <select
                    id="extramedullary-type"
                    value={extramedullaryType}
                    onChange={(e) => setExtramedullaryType(e.target.value)}
                    className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
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

                  <input
                    type="text"
                    value={extramedullaryDetail}
                    onChange={(e) => setExtramedullaryDetail(e.target.value)}
                    placeholder="Details for selected plate"
                    className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Intramedullary Options */}
            {internalType === 'intramedullary' && (
              <div>
                <label htmlFor="intramedullary-type" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Intramedullary Type:
                </label>
                <select
                  id="intramedullary-type"
                  value={intramedullaryType}
                  onChange={(e) => {
                    setIntramedullaryType(e.target.value);
                    setAntigradeType('');
                    setRetrogradeType('');
                  }}
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
                >
                  <option value="">--Select Option--</option>
                  <option value="antigrade">Antigrade</option>
                  <option value="retrograde">Retrograde</option>
                </select>

                {/* Antigrade Options */}
                {intramedullaryType === 'antigrade' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Antigrade Type:
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={antigradeType}
                        onChange={(e) => setAntigradeType(e.target.value)}
                        className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                      >
                        <option value="">--Select Option--</option>
                        <option value="solid-nail">Solid Nail</option>
                        <option value="hollow-nail">Hollow Nail</option>
                        <option value="pfn">PFN: Proximal Femoral Nail</option>
                        <option value="other">Other</option>
                      </select>

                      <input
                        type="text"
                        value={antigradeDetail}
                        onChange={(e) => setAntigradeDetail(e.target.value)}
                        placeholder="Details for antigrade"
                        className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                {/* Retrograde Options */}
                {intramedullaryType === 'retrograde' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Retrograde Type:
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={retrogradeType}
                        onChange={(e) => setRetrogradeType(e.target.value)}
                        className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                      >
                        <option value="">--Select Option--</option>
                        <option value="solid-nail">Solid Nail</option>
                        <option value="hollow-nail">Hollow Nail</option>
                        <option value="dfn">DFN: Distal Femoral Nail</option>
                        <option value="other">Other</option>
                      </select>

                      <input
                        type="text"
                        value={retrogradeDetail}
                        onChange={(e) => setRetrogradeDetail(e.target.value)}
                        placeholder="Details for retrograde"
                        className="w-1/2 px-4 py-2 mb-4 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Combined Text Field */}
        {surgeryType === 'combined' && (
          <div>
            <label htmlFor="combined-text" className="block text-sm font-medium text-gray-700 mb-2">
              Describe Combined Surgery:
            </label>
            <input
              type="text"
              id="combined-text"
              value={combinedText}
              onChange={(e) => setCombinedText(e.target.value)}
              placeholder="Describe combined surgery"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />
          </div>
        )}

        {/* Material Used */}
        <div>
          <label htmlFor="material-used" className="block text-sm font-medium text-gray-700 mb-2">
            Material Used:
          </label>
          <select className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md" id="">
            <option value="">--Select Option--</option>
            <option value="stainlessSteel">Stainless Steel</option>
            <option value="titanium">Titanium</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description of Surgery:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details of surgery"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>

      {/* Submitted Data */}
      {submittedData && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <h3 className="text-xl font-semibold">Form Submitted</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Surgery;
