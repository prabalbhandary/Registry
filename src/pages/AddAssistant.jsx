import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { URL } from '../components/URL';

const AddAssistant = () => {
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSurgeons, setActiveSurgeons] = useState([]);
  const [inactiveSurgeons, setInactiveSurgeons] = useState([]);
  const [error, setError] = useState('');

  // Fetch assistant surgeons from the server when the component mounts
  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeone`);
        console.log(res.data); // Log response to check structure
        const activeList = res.data.data.filter(surgeon => surgeon.is_active);
        const inactiveList = res.data.data.filter(surgeon => !surgeon.is_active);
        setActiveSurgeons(activeList);
        setInactiveSurgeons(inactiveList);
      } catch (error) {
        console.error('Error fetching assistant surgeons:', error);
        toast.error('Failed to load assistant surgeons.');
      }
    };

    fetchAssistantSurgeons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation to ensure name is provided
    if (!name) {
      toast.error('Name is required');
      return;
    }

    try {
      const res = await axios.post(`${URL}/assistant-surgeone`, { name });
      if (res.status === 201) {
        toast.success(res.data.message);
        setActiveSurgeons((prevSurgeons) => [...prevSurgeons, res.data.assistant_surgeon]);
        setName(''); // Reset the input field after success
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding assistant surgeon:', error);
      const errorMessage = error?.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      setError(error.response.data.error);
    }
  };

  const toggleActiveStatus = async (surgeonId, currentStatus) => {
    try {
      const res = await axios.put(`${URL}/assistant-surgeone/${surgeonId}`, {
        is_active: !currentStatus, // Toggle the current status
      });

      if (res.status === 200) {
        // Search in both active and inactive surgeons to find the surgeon
        const surgeonToUpdate = 
          activeSurgeons.find(surgeon => surgeon.id === surgeonId) || 
          inactiveSurgeons.find(surgeon => surgeon.id === surgeonId);

        if (!surgeonToUpdate) {
          throw new Error('Assistant Surgeon not found');
        }

        // Clone the surgeon object to avoid direct mutation
        const updatedSurgeon = { ...surgeonToUpdate, is_active: !currentStatus };

        if (!currentStatus) {
          // If current status is false (inactive), move to active list
          setActiveSurgeons((prevSurgeons) => [...prevSurgeons, updatedSurgeon]);
          setInactiveSurgeons((prevSurgeons) =>
            prevSurgeons.filter(surgeon => surgeon.id !== surgeonId)
          );
        } else {
          // If current status is true (active), move to inactive list
          setActiveSurgeons((prevSurgeons) =>
            prevSurgeons.filter(surgeon => surgeon.id !== surgeonId)
          );
          setInactiveSurgeons((prevSurgeons) => [...prevSurgeons, updatedSurgeon]);
        }

        toast.success(`Surgeon status updated to ${!currentStatus ? 'Active' : 'Inactive'}`);
      }
    } catch (error) {
      console.error('Toggle status error:', error);
      toast.error(error.message || 'Failed to update surgeon status.');
    }
  };

  const unlinkSurgeon = async (surgeonId) => {
    try {
      const res = await axios.put(`${URL}/assistant-surgeone/${surgeonId}`, { is_active: 0 });

      if (res.status === 200) {
        // Make sure surgeon exists before trying to access its properties
        const surgeonToUnlink = activeSurgeons.find(surgeon => surgeon.id === surgeonId);
        if (!surgeonToUnlink) {
          throw new Error('Surgeon not found in active list');
        }

        setActiveSurgeons((prevSurgeons) =>
          prevSurgeons.filter(surgeon => surgeon.id !== surgeonId)
        );
        setInactiveSurgeons((prevSurgeons) => [...prevSurgeons, surgeonToUnlink]);

        toast.success('Surgeon has been unlinked and marked as inactive.');
      }
    } catch (error) {
      console.error('Unlink surgeon error:', error);
      toast.error(error.message || 'Failed to unlink surgeon.');
      setError(error.response.data.error);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  // Filter inactive surgeons based on search term
  const filteredInactiveSurgeons = inactiveSurgeons.filter(surgeon => 
    surgeon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      {
        error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )
      }
      
      {/* Section for Searching and Adding Existing Assistant Surgeons */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Existing Assistant Surgeons</h1>
        <p className="text-gray-600 mb-6">Search Assistant Surgeons and add them</p>
        
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Assistant Surgeons"
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
          {filteredInactiveSurgeons.map((surgeon) => (
            <div key={surgeon.id} className="mb-4 p-4 border rounded-md flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">{surgeon.name}</p>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => toggleActiveStatus(surgeon.id, surgeon.is_active)}
              >
                Activate
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Section for Adding New Assistant Surgeons */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Assistant Surgeons</h1>
        <p className="text-gray-600 mb-6">Enter name and save</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </section>

      <hr className="my-6 border-gray-300" />

      {/* Section for Displaying the List of Assistant Surgeons */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Active Assistant Surgeons</h1>
        <p className="text-gray-600 mb-6">List of Active Assistant Surgeons</p>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left text-gray-700 font-medium">S.No</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Name</th>
                <th className="px-6 py-4 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeSurgeons.map((surgeon, index) => (
                <tr key={surgeon.id} className="border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{surgeon.name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => unlinkSurgeon(surgeon.id)}
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
      </section>
      
      <hr className="my-6 border-gray-300" />
    </>
  )
}

export default AddAssistant;