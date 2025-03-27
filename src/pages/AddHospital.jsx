import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddHospital = () => {
  const [hospital_name, setHospital_name] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        hospital_name,
        address
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
            className="flex-grow p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Reset
          </button>
        </div>
        
        <div className="mt-6">
          {/* Hospital List will appear here */}
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none">
          Save
        </button>
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
              value={hospital_name}
              onChange={(e) => setHospital_name(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-lg text-gray-700 font-semibold mb-2">Address</label>
            <input
              type="text"
              id="address"
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

      {/* Section for Displaying the List of Hospitals */}
      <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospitals List</h1>
        <p className="text-gray-600 mb-6">Here is the list of hospitals in the registry.</p>

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
              {/* Hospital List will be mapped here */}
            </tbody>
          </table>
        </div>
      </section>
      
      <hr className="my-6 border-gray-300" />
    </>
  );
};

export default AddHospital;
