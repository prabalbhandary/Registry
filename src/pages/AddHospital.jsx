import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { URL } from '../components/URL';

const AddHospital = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [inactiveHospitals, setInactiveHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`);
        const active = res.data.data.filter(h => h.is_active);
        const inactive = res.data.data.filter(h => !h.is_active);
        setHospitals(active);
        setInactiveHospitals(inactive);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        toast.error('Failed to load hospitals.');
      }
    };
    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address) {
      toast.error('Both name and address are required');
      return;
    }

    try {
      const res = await axios.post(`${URL}/hospital`, { name, address });
      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prev) => [...prev, res.data.hospital]);
        setName('');
        setAddress('');
        window.location.reload();
      }
    } catch (err) {
      console.error('Add hospital error:', err);
      toast.error(err?.response?.data?.message || 'Error adding hospital');
      setError(err.response?.data?.error);
    }
  };

  const toggleActiveStatus = async (hospitalId, currentStatus) => {
    try {
      const res = await axios.get(`${URL}/activate-hospital/${hospitalId}`, {
        is_active: !currentStatus,
      });

      if (res.status === 200) {
        const hospitalToUpdate = hospitals.find(h => h.id === hospitalId) ||
                                  inactiveHospitals.find(h => h.id === hospitalId);

        if (!hospitalToUpdate) throw new Error('Hospital not found');

        const updated = { ...hospitalToUpdate, is_active: !currentStatus };

        if (!currentStatus) {
          setHospitals((prev) => [...prev, updated]);
          setInactiveHospitals((prev) => prev.filter(h => h.id !== hospitalId));
        } else {
          setInactiveHospitals((prev) => [...prev, updated]);
          setHospitals((prev) => prev.filter(h => h.id !== hospitalId));
        }

        toast.success(`Hospital marked as ${!currentStatus ? 'Active' : 'Inactive'}`);
      }
    } catch (err) {
      console.error('Toggle status error:', err);
      toast.error(err.message || 'Failed to update hospital status.');
      setError(err.response?.data?.error);
    }
  };

  const unlinkHospital = async (hospitalId) => {
    try {
      const res = await axios.get(`${URL}/activate-hospital/${hospitalId}`, {
        is_active: 0,
      });

      if (res.status === 200) {
        const target = hospitals.find(h => h.id === hospitalId);
        if (!target) throw new Error('Hospital not found');

        setHospitals((prev) => prev.filter(h => h.id !== hospitalId));
        setInactiveHospitals((prev) => [...prev, target]);

        toast.success('Hospital has been unlinked.');
      }
    } catch (err) {
      console.error('Unlink error:', err);
      toast.error(err.message || 'Failed to unlink hospital.');
      setError(err.response?.data?.error);
    }
  };

  const resetSearch = () => setSearchTerm('');

  const filteredInactiveHospitals = inactiveHospitals.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Your Hospitals - Trauma Registry</title>

      {/* Add Existing Hospital */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Add Existing Hospitals</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Search and activate previously listed hospitals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search Hospitals"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={resetSearch}
              className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {filteredInactiveHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="p-4 border rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div className="mb-2 sm:mb-0">
                  <p className="font-semibold text-gray-800">{hospital.name}</p>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                </div>
                <button
                  onClick={() => toggleActiveStatus(hospital.id, hospital.is_active)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Activate
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add New Hospital */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Add New Hospital</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Add new hospitals you work with to the trauma registry.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="hospital_name" className="block font-semibold text-gray-700 mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospital_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Hospital
            </button>
          </form>
        </div>
      </section>

      {/* Active Hospitals */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Active Hospitals</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            List of all active hospitals in the registry.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">S.No</th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Address</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital, index) => (
                  <tr key={hospital.id} className="border-b">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{hospital.name}</td>
                    <td className="px-4 py-3">{hospital.address}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => unlinkHospital(hospital.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Unlink
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AddHospital;
