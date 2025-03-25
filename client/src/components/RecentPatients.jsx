import React from 'react';

const RecentPatients = () => {
  const patients = [
    { name: 'John Doe', hn: 28 },
    { name: 'Jane Smith', hn: 34 },
    { name: 'Alice Johnson', hn: 45 },
    { name: 'Bob Brown', hn: 39 },
    { name: 'Charlie Davis', hn: 50 },
    { name: 'David Evans', hn: 29 },
    { name: 'Eva Green', hn: 37 },
  ];

  const displayData = patients.length > 5 ? patients.slice(0, 5) : patients;

  return (
    <div className="p-4 rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">Recent Patients</p>
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-100 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 bg-blue-100 text-left text-sm font-medium text-gray-600">Hospital Number</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((patient, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-gray-700">{patient.name}</td>
                <td className="px-4 py-2 text-gray-700">{patient.hn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
