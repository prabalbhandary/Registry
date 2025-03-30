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

  // Fetch hospitals from the server when the component mounts
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`);
        console.log(res.data); // Log response to check structure
        const activeHospitals = res.data.data.filter(hospital => hospital.is_active);
        const inactiveHospitals = res.data.data.filter(hospital => !hospital.is_active);
        setHospitals(activeHospitals);  // Active hospitals list
        setInactiveHospitals(inactiveHospitals); // Inactive hospitals list
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        toast.error('Failed to load hospitals.');
      }
    };

    fetchHospitals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation to ensure name and address are provided
    if (!name || !address) {
      toast.error('Both name and address are required');
      return;
    }

    try {
      const res = await axios.post(`${URL}/hospital`, { name, address });
      if (res.status === 201) {
        toast.success(res.data.message);
        setHospitals((prevHospitals) => [...prevHospitals, res.data.hospital]);
        setName(''); // Reset the input fields after success
        setAddress('');
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding hospital:', error);
      const errorMessage = error?.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      setError(error.response.data.error);
    }
  };

  const toggleActiveStatus = async (hospitalId, currentStatus) => {
    try {
      const res = await axios.put(`${URL}/hospital/${hospitalId}`, {
        is_active: !currentStatus, // Toggle the current status
      });

      if (res.status === 200) {
        // Search in both active and inactive hospitals to find the hospital
        const hospitalToUpdate = 
          hospitals.find(hospital => hospital.id === hospitalId) || 
          inactiveHospitals.find(hospital => hospital.id === hospitalId);

        if (!hospitalToUpdate) {
          throw new Error('Hospital not found');
        }

        // Clone the hospital object to avoid direct mutation
        const updatedHospital = { ...hospitalToUpdate, is_active: !currentStatus };

        if (!currentStatus) {
          // If current status is false (inactive), move to active list
          setHospitals((prevHospitals) => [...prevHospitals, updatedHospital]);
          setInactiveHospitals((prevInactiveHospitals) =>
            prevInactiveHospitals.filter(hospital => hospital.id !== hospitalId)
          );
        } else {
          // If current status is true (active), move to inactive list
          setHospitals((prevHospitals) =>
            prevHospitals.filter(hospital => hospital.id !== hospitalId)
          );
          setInactiveHospitals((prevInactiveHospitals) => [...prevInactiveHospitals, updatedHospital]);
        }

        toast.success(`Hospital status updated to ${!currentStatus ? 'Active' : 'Inactive'}`);
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error(error.message || 'Failed to update hospital status.');
      setError(error.response.data.error);
    }
  };

  const unlinkHospital = async (hospitalId) => {
    try {
      const res = await axios.put(`${URL}/hospital/${hospitalId}`, { is_active: 0 });

      if (res.status === 200) {
        // Make sure hospital exists before trying to access its properties
        const hospitalToUnlink = hospitals.find(hospital => hospital.id === hospitalId);
        if (!hospitalToUnlink) {
          throw new Error('Hospital not found in active list');
        }

        setHospitals((prevHospitals) =>
          prevHospitals.filter(hospital => hospital.id !== hospitalId)
        );
        setInactiveHospitals((prevInactiveHospitals) => [...prevInactiveHospitals, hospitalToUnlink]);

        toast.success('Hospital has been unlinked and marked as inactive.');
      }
    } catch (error) {
      console.error('Unlink hospital error:', error);
      toast.error(error.message || 'Failed to unlink hospital.');
      setError(error.response.data.error);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  // Filter hospitals based on search term
  const filteredInactiveHospitals = inactiveHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Your Hospitals - Trauma Registry</title>

      {/* Section for Searching and Adding Existing Hospitals */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Existing Hospitals</h1>
        <p className="text-gray-600 mb-6">Search and add existing listed hospitals to the registry.</p>

        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Hospitals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={resetSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset
          </button>
        </div>

        <div className="mt-6">
          {filteredInactiveHospitals.map((hospital) => (
            <div key={hospital.id} className="mb-4 p-4 border rounded-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">{hospital.name}</p>
                <p className="text-gray-600">{hospital.address}</p>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => toggleActiveStatus(hospital.id, hospital.is_active)}
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Section for Adding New Hospitals */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Hospital</h1>
        <p className="text-gray-600 mb-6">Add the hospitals where you work and contribute to the trauma registry.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="hospital_name" className="block text-lg text-gray-700 font-semibold mb-2">Hospital Name</label>
            <input
              type="text"
              id="hospital_name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-lg text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Hospital
            </button>
          </div>
        </form>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Section for Displaying the List of Active Hospitals */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Active Hospitals List</h1>
        <p className="text-gray-600 mb-6">Here is the list of active hospitals in the registry.</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left text-gray-700 font-medium">S.No</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Hospital Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Address</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, index) => (
                <tr key={hospital.id} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{hospital.name}</td>
                  <td className="px-6 py-4">{hospital.address}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => unlinkHospital(hospital.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Unlink
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
        error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>  
        )
      }
      </section>

      <hr className="my-6 border-gray-300" />
    </>
  );
};

export default AddHospital;