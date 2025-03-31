import React, { useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import { useNavigate, useParams } from "react-router-dom";
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

  const [fieldErrors, setFieldErrors] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    nationality: "",
    province: "",
    district: "",
    hospital_number: "",
    phone_number: "",
    occupation: "",
    sports_involvement: "",
  });

  const [districts, setDistricts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      nationality: "",
      province: "",
      district: "",
      hospital_number: "",
      phone_number: "",
      occupation: "",
      sports_involvement: "",
    });

    let formValid = true;
    let newErrors = {};

    if (!first_name) {
      formValid = false;
      newErrors.first_name = "First name is required.";
    }
    if (!last_name) {
      formValid = false;
      newErrors.last_name = "Last name is required.";
    }
    if (!age || isNaN(age)) {
      formValid = false;
      newErrors.age = "Age is required and must be a number.";
    }
    if (!gender) {
      formValid = false;
      newErrors.gender = "Gender is required.";
    }
    if (!nationality) {
      formValid = false;
      newErrors.nationality = "Nationality is required.";
    }
    if (!province) {
      formValid = false;
      newErrors.province = "Province is required.";
    }
    if (!district) {
      formValid = false;
      newErrors.district = "District is required.";
    }
    if (!hospital_number) {
      formValid = false;
      newErrors.hospital_number = "Hospital number is required.";
    }
    if (!phone_number) {
      formValid = false;
      newErrors.phone_number = "Phone number is required.";
    }
    if (!occupation) {
      formValid = false;
      newErrors.occupation = "Occupation is required.";
    }
    if (!sports_involvement) {
      formValid = false;
      newErrors.sports_involvement = "Sports involvement is required.";
    }

    if (!formValid) {
      setFieldErrors(newErrors);
      return;
    }

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
        const patientId = res.data.data.id;
        localStorage.setItem("patientId", patientId);
        navigate(`/add-surgerical-details/${patientId}`, { state: { completedIndex: 1 } });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError(error.response.data.error);
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    switch (selectedProvince) {
      case "koshi province":
        setDistricts([
          "Jhapa", "Illam", "Paachthar", "Taplejung", "Sankhuwasawa", 
          "Therathum", "Bhojpur", "Dhankuta", "Khotang", "Sunsari", 
          "Morong", "Solukhumbu", "Okhaldhunga", "Udaypur"
        ]);
        break;
      case "madesh province":
        setDistricts([
          "Parsa", "Bara", "Rautahat", "Sarlahi", "Siraha", "Dhanusha", 
          "Saptari", "Mahottari"
        ]);
        break;
      case "bagmati province":
        setDistricts([
          "Kathmandu", "Makwanpur", "Lalitpur", "Bhaktapur", "Nuwakot", 
          "Rasuwa", "Dhading", "Kavrepalanchok", "Sindhupalchok", 
          "Sindhuli", "Dolakha", "Ramechhap", "Chitwan"
        ]);
        break;
      case "gandaki province":
        setDistricts([
          "Gorkha", "Tanahu", "Syanja", "Lamjung", "Kaski", "Nawalparashi East", 
          "Manang", "Mustang", "Parbat", "Baglung", "Myagdi"
        ]);
        break;
      case "lumbini province":
        setDistricts([
          "Kapilvastu", "Gulmi", "Rupandehi", "Banke", "Argakhachi", "Bardiya", 
          "Dang", "Rukum East", "Pyuthan", "Nawalparashi West", "Palpa", "Rolpa"
        ]);
        break;
      case "karnali province":
        setDistricts([
          "Rukum West", "Salyan", "Dolpa", "Jumla", "Mugu", "Humla", "Kalikot", 
          "Jajarkot", "Dailekh", "Surkhet"
        ]);
        break;
      case "sudurpaschim province":
        setDistricts([
          "Darchula", "Baitadi", "Dadeldhura", "Kanchanpur", "Bajhang", "Bajura", 
          "Doti", "Achham", "Kailali"
        ]);
        break;
      default:
        setDistricts([]);
        break;
    }
  };

  return (
    <>
      <title>Create Surgery - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Add Patient Information</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-lg font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                id="firstName"
                name="first_name"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.first_name && <p className="text-red-500 text-sm mt-1">{fieldErrors.first_name}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-lg font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                id="lastName"
                name="last_name"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.last_name && <p className="text-red-500 text-sm mt-1">{fieldErrors.last_name}</p>}
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
              {fieldErrors.age && <p className="text-red-500 text-sm mt-1">{fieldErrors.age}</p>}
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
                <option value="">Select Nationality</option>
                <option value="nepali">Nepali</option>
                <option value="non-nepali">Non-Nepali</option>
              </select>
              {fieldErrors.nationality && <p className="text-red-500 text-sm mt-1">{fieldErrors.nationality}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="province" className="text-lg font-medium text-gray-700">Province</label>
              <select
                name="province"
                value={province}
                onChange={handleProvinceChange}
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
                <option value="sudurpaschim province">Sudurpaschim Province</option>
              </select>
              {fieldErrors.province && <p className="text-red-500 text-sm mt-1">{fieldErrors.province}</p>}
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
                <option value="">Select District</option>
                {districts.map((districtName) => (
                  <option key={districtName} value={districtName}>
                    {districtName}
                  </option>
                ))}
              </select>
              {fieldErrors.district && <p className="text-red-500 text-sm mt-1">{fieldErrors.district}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="hospital_number" className="text-lg font-medium text-gray-700">Hospital Number</label>
              <input
                type="text"
                value={hospital_number}
                onChange={(e) => setHospital_number(e.target.value)}
                id="hospital_number"
                name="hospital_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.hospital_number && <p className="text-red-500 text-sm mt-1">{fieldErrors.hospital_number}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact_number" className="text-lg font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                id="contact_number"
                name="phone_number"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.phone_number && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone_number}</p>}
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
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.gender && <p className="text-red-500 text-sm mt-1">{fieldErrors.gender}</p>}
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
                <option value="self-employed">Self-employed</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.occupation && <p className="text-red-500 text-sm mt-1">{fieldErrors.occupation}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="sports_involvement" className="text-lg font-medium text-gray-700">Sports Involvement</label>
              <input
                type="text"
                value={sports_involvement}
                onChange={(e) => setSports_involvement(e.target.value)}
                id="sports_involvement"
                name="sports_involvement"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.sports_involvement && <p className="text-red-500 text-sm mt-1">{fieldErrors.sports_involvement}</p>}
            </div>
          </div>

          <div>
            {error && (
              <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700">{error}</div>
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
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSurgery;
