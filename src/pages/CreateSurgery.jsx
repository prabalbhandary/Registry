import React, { useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";

const CreateSurgery = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [hospital_number, setHospital_number] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [occupation, setOccupation] = useState("");
  const [sports_involvement, setSports_involvement] = useState("");
  const [completedIndex, setCompletedIndex] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/patient-detail`, {
        first_name,
        last_name,
        age,
        gender,
        nationality,
        province,
        district,
        hospital_number,
        phone_number,
        occupation,
        sports_involvement,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setCompletedIndex(1);
        navigate("/add-surgerical-details", { state: { completedIndex: 1 } });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <title>Create Surgery - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Add Patient Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-lg font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                id="firstName"
                name="first_name"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-lg font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                id="lastName"
                name="last_name"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="age"
                className="text-lg font-medium text-gray-700"
              >
                Age
              </label>
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
              <label
                htmlFor="nationality"
                className="text-lg font-medium text-gray-700"
              >
                Nationality
              </label>
              <select
                name="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                id="nationality"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Nationality</option>
                <option value="nepali">Nepali</option>
                <option value="non-nepali">Non-Nepali</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="province"
                className="text-lg font-medium text-gray-700"
              >
                Province
              </label>
              <select
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                id="province"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Province</option>
                <option value="koshi province">Koshi Province</option>
                <option value="madesh province">Madesh Province</option>
                <option value="bagmati province">Bagmati Province</option>
                <option value="gandaki province">Gandaki Province</option>
                <option value="lumbini province">Lumbini Province</option>
                <option value="karnali province">Karnali Province</option>
                <option value="sudurpaschim province">
                  Sudurpaschim Province
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="district"
                className="text-lg font-medium text-gray-700"
              >
                District
              </label>
              <select
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                id="district"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select District</option>
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
              <label
                htmlFor="hospital_number"
                className="text-lg font-medium text-gray-700"
              >
                Hospital Number
              </label>
              <input
                type="text"
                value={hospital_number}
                onChange={(e) => setHospital_number(e.target.value)}
                id="hospital_number"
                name="hospital_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="contact_number"
                className="text-lg font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                id="contact_number"
                name="phone_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-lg font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="occupation"
                className="text-lg font-medium text-gray-700"
              >
                Occupation
              </label>
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
              <label
                htmlFor="sports"
                className="text-lg font-medium text-gray-700"
              >
                Involvement in Sports
              </label>
              <select
                name="sports"
                value={sports_involvement}
                onChange={(e) => setSports_involvement(e.target.value)}
                id="sports"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Involvement in Sports</option>
                <option value="professional">Professional</option>
                <option value="recreational">Recreational</option>
                <option value="no sports">No Sports</option>
              </select>
            </div>
          </div>
          <div>
            {error && (
              <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700">
                {error}
              </div>
            )}
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
