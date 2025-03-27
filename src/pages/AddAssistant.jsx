import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddAssistant = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        name
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
        <title>Assistant Surgeons - Trauma Registry</title>
        <section className="container mx-auto p-8 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Existing Assistant Surgeons</h1>
        <p className="text-gray-600 mb-6">Search Assistant Surgeons and add them</p>
        
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Assistant Surgeons"
            className="flex-grow p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Reset
          </button>
        </div>
        
        <div className="mt-6">
          {/* Assistant Surgeon List will appear here */}
        </div>

        <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none">
          Save
        </button>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Assistant Surgeons</h1>
        <p className="text-gray-600 mb-6">List of Assistant Surgeons</p>

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
              {/* Hospital List will be mapped here */}
            </tbody>
          </table>
        </div>
      </section>
      
      <hr className="my-6 border-gray-300" />
    </>
  )
}

export default AddAssistant