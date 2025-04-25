import React, { useState } from 'react';

const Femur = () => {
  const [status, setStatus] = useState('');
  const [side, setSide] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Femur Fracture</h1>

        {/* Status Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setSide('');
              setLocation('');
              setCustomLocation('');
            }}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Status</option>
            <option value="Closed">Closed</option>
            <option value="Open">Open</option>
          </select>
        </div>

        {/* Side Selection */}
        {(status === 'Closed' || status === 'Open') && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Side</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="side"
                  value="Left"
                  checked={side === 'Left'}
                  onChange={(e) => {
                    setSide(e.target.value);
                    setLocation('');
                    setCustomLocation('');
                  }}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2 text-gray-700">Left</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="side"
                  value="Right"
                  checked={side === 'Right'}
                  onChange={(e) => {
                    setSide(e.target.value);
                    setLocation('');
                    setCustomLocation('');
                  }}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2 text-gray-700">Right</span>
              </label>
            </div>
          </div>
        )}

        {/* Location Selection */}
        {(side === 'Left' || side === 'Right') && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Location</option>
              <option value="Proximal">Proximal</option>
              <option value="Midshaft">Midshaft</option>
              <option value="Distal">Distal</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Custom Location Text Field */}
        {location === 'Other' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Specify Other Location</label>
            <input
              type="text"
              placeholder="Enter custom location"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default Femur;
