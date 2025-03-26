import React, { useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateSurgery = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [hospital_number, setHospital_number] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [occupation, setOccupation] = useState("");
  const [sports, setSports] = useState("");
  const [completedIndex, setCompletedIndex] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        firstName,
        lastName,
        age,
        gender,
        nationality,
        province,
        district,
        hospital_number,
        contact_number,
        occupation,
        sports,
      });

      setCompletedIndex((prevIndex) => (prevIndex === null ? 1 : prevIndex + 1));
      navigate("/add-surgerical-details");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <title>Create Surgery - Nepal Ligament Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Add Patient Information</h1>
        <p className="text-center text-gray-600 mb-6">Please fill in the details and proceed to the next step.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-lg font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                name="firstName"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-lg font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                name="lastName"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age" className="text-lg font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                id="age"
                name="age"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nationality" className="text-lg font-medium text-gray-700">Nationality</label>
              <select
                name="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                id="nationality"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="nepali">Nepali</option>
                <option value="non-nepali">Non-Nepali</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="province" className="text-lg font-medium text-gray-700">Province</label>
              <select
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                id="province"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="province no1">Province Number 1</option>
                <option value="madesh province">Madesh Province</option>
                <option value="bagmati province">Bagmati Province</option>
                <option value="gandaki province">Gandaki Province</option>
                <option value="lumbini province">Lumbini Province</option>
                <option value="karnali province">Karnali Province</option>
                <option value="sudurpaschim province">Sudurpaschim Province</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="district" className="text-lg font-medium text-gray-700">District</label>
              <select
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                id="district"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="kathmandu">Kathmandu</option>
                <option value="bhaktapur">Bhaktapur</option>
                <option value="lalitpur">Lalitpur</option>
                <option value="pokhara">Pokhara</option>
                <option value="chitwan">Chitwan</option>
                <option value="baglung">Baglung</option>
                <option value="gorkha">Gorkha</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="hospital_number" className="text-lg font-medium text-gray-700">Hospital Number</label>
              <input
                type="number"
                value={hospital_number}
                onChange={(e) => setHospital_number(e.target.value)}
                id="hospital_number"
                name="hospital_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact_number" className="text-lg font-medium text-gray-700">Contact Number</label>
              <input
                type="tel"
                value={contact_number}
                onChange={(e) => setContact_number(e.target.value)}
                id="contact_number"
                name="contact_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-lg font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="occupation" className="text-lg font-medium text-gray-700">Occupation</label>
              <select
                name="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                id="occupation"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="unemployed">Unemployed</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="sports" className="text-lg font-medium text-gray-700">Involvement in Sports</label>
              <select
                name="sports"
                value={sports}
                onChange={(e) => setSports(e.target.value)}
                id="sports"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="professional">Professional</option>
                <option value="recreational">Recreational</option>
                <option value="no sports">No Sports</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSurgery;
