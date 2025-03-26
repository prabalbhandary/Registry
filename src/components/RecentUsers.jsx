import React from 'react';
import user from '../assets/user.png';

const RecentUsers = () => {
  const users = [
    { name: 'John Doe', pp: user, status: 'activated', role: 'admin' },
    { name: 'Jane Smith', pp: user, status: 'deactivated', role: 'doctor' },
    { name: 'Alice Johnson', pp: user, status: 'activated', role: 'doctor' },
    { name: 'Bob Brown', pp: user, status: 'deactivated', role: 'doctor' },
    { name: 'Charlie Davis', pp: user, status: 'activated', role: 'doctor' },
    { name: 'David Evans', pp: user, status: 'deactivated', role: 'doctor' },
    { name: 'Eva Green', pp: user, status: 'activated', role: 'doctor' },
  ];

  const displayData = users.length > 5 ? users.slice(0, 5) : users;

  return (
    <div className="rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">Recent Users</p>
      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-100 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 bg-blue-100 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 bg-blue-100 text-left text-sm font-medium text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="flex gap-4 px-4 py-2 text-gray-700">
                    <div className='w-10 h-10 rounded-full flex items-center justify-center'>
                        <img src={user.pp} alt="Profile Picture" className="w-full h-full rounded-full" />
                    </div>
                  {user.name}
                </td>
                <td className="px-4 py-2 text-gray-700">{user.status}</td>
                <td className="px-4 py-2 text-gray-700">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;
