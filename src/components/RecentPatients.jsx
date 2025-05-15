import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from './URL';

const RecentPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${URL}/patient-detail`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Ensure it's always an array
      const data = Array.isArray(res.data.data)
        ? res.data.data
        : res.data.patients || [];

      setPatients(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Error fetching patients');
    }
  };

  fetchPatients();
}, []);


  const displayData = patients.length > 5 ? patients.slice(0, 5) : patients;

  return (
    <div className="rounded-lg">
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
                <td className="px-4 py-2 text-gray-700">{patient.first_name}</td>
                <td className="px-4 py-2 text-gray-700">{patient.hospital_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
