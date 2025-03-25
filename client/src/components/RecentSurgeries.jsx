import React from "react";

const RecentSurgeries = () => {
  const surgeries = [
    { date: "01/01/2023", patient: "John Doe" },
    { date: "01/02/2023", patient: "Jane Smith" },
    { date: "01/03/2023", patient: "Alice Johnson" },
    { date: "01/04/2023", patient: "Bob Brown" },
    { date: "01/05/2023", patient: "Charlie Davis" },
    { date: "01/06/2023", patient: "David Evans" },
    { date: "01/07/2023", patient: "Eva Green" },
  ];

  const displayData = surgeries.length > 5 ? surgeries.slice(0, 5) : surgeries;

  return (
    <div className="p-6 bg-white rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">Recent Surgeries</p>
      <div className="overflow-y-auto" style={{ maxHeight: "350px" }}>
        <table className="min-w-full table-auto border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                Date of Surgery
              </th>
              <th className="px-6 py-3 bg-indigo-100 text-left text-sm font-semibold text-gray-600 border-b">
                Patient Name
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((surgery, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {surgery.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {surgery.patient}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSurgeries;
