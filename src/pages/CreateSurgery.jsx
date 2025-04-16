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
  const [mechanism_of_injury, setMechanism_of_injury] = useState("");
  const [type_of_injury, setType_of_Injury] = useState("");
  const [sportsOther, setSportsOther] = useState("");
  const [MoIOther, setMoIOther] = useState("");
  const [completedIndex, setCompletedIndex] = useState(0);
  const [error, setError] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [primaryTreatment, setPrimaryTreatment] = useState("");
  const [treatmentWhere, setTreatmentWhere] = useState("");
  const [antibiotic, setAntibiotic] = useState("");
  const [whatTreatment, setWhatTreatment] = useState("");

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
    mechanism_of_injury: "",
    type_of_injury: "",
    incidentDate: "",
    incidentTime: "",
    primaryTreatment: "",
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
      mechanism_of_injury: "",
      type_of_injury: "",
      incidentDate: "",
      incidentTime: "",
      primaryTreatment: "",
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
    if (!mechanism_of_injury) {
      formValid = false;
      newErrors.MoI = "Mechanism of Injury is required.";
    }
    if (!type_of_injury && mechanism_of_injury !== "others") {
      formValid = false;
      newErrors.type_of_injury = "Sub-option is required.";
    }
    if (!incidentDate) {
      formValid = false;
      newErrors.incidentDate = "Incident Date is required.";
    }
    if (!incidentTime) {
      formValid = false;
      newErrors.incidentTime = "Incident Time is required.";
    }
    if (!primaryTreatment) {
      formValid = false;
      newErrors.primaryTreatment = "Primary Treatment is required.";
    }

    if (!formValid) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      const surgeonDetail = JSON.parse(
        localStorage.getItem("surgeonDetail")
      )[0];
      const res = await axios.post(`${URL}/patient-detail`, {
        surgeon_detail_id: surgeonDetail.id,
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
        mechanism_of_injury,
        type_of_injury,
        sportsOther,
        MoIOther,
        incident_date: incidentDate,
        incident_time: incidentTime,
        primaryTreatment,
        treatmentWhere,
        antibiotic,
        whatTreatment,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setCompletedIndex(1);
        const patientId = res.data.data.id;
        localStorage.setItem("patientId", patientId);
        navigate(`/add-surgerical-details/${patientId}`, {
          state: { completedIndex: 1 },
        });
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
          "Jhapa",
          "Illam",
          "Paachthar",
          "Taplejung",
          "Sankhuwasawa",
          "Therathum",
          "Bhojpur",
          "Dhankuta",
          "Khotang",
          "Sunsari",
          "Morong",
          "Solukhumbu",
          "Okhaldhunga",
          "Udaypur",
        ]);
        break;
      case "madesh province":
        setDistricts([
          "Parsa",
          "Bara",
          "Rautahat",
          "Sarlahi",
          "Siraha",
          "Dhanusha",
          "Saptari",
          "Mahottari",
        ]);
        break;
      case "bagmati province":
        setDistricts([
          "Kathmandu",
          "Makwanpur",
          "Lalitpur",
          "Bhaktapur",
          "Nuwakot",
          "Rasuwa",
          "Dhading",
          "Kavrepalanchok",
          "Sindhupalchok",
          "Sindhuli",
          "Dolakha",
          "Ramechhap",
          "Chitwan",
        ]);
        break;
      case "gandaki province":
        setDistricts([
          "Gorkha",
          "Tanahu",
          "Syanja",
          "Lamjung",
          "Kaski",
          "Nawalparashi East",
          "Manang",
          "Mustang",
          "Parbat",
          "Baglung",
          "Myagdi",
        ]);
        break;
      case "lumbini province":
        setDistricts([
          "Kapilvastu",
          "Gulmi",
          "Rupandehi",
          "Banke",
          "Argakhachi",
          "Bardiya",
          "Dang",
          "Rukum East",
          "Pyuthan",
          "Nawalparashi West",
          "Palpa",
          "Rolpa",
        ]);
        break;
      case "karnali province":
        setDistricts([
          "Rukum West",
          "Salyan",
          "Dolpa",
          "Jumla",
          "Mugu",
          "Humla",
          "Kalikot",
          "Jajarkot",
          "Dailekh",
          "Surkhet",
        ]);
        break;
      case "sudurpaschim province":
        setDistricts([
          "Darchula",
          "Baitadi",
          "Dadeldhura",
          "Kanchanpur",
          "Bajhang",
          "Bajura",
          "Doti",
          "Achham",
          "Kailali",
        ]);
        break;
      default:
        setDistricts([]);
        break;
    }
  };

  const handleMoIChange = (e) => {
    setMechanism_of_injury(e.target.value);
    setType_of_Injury("");
    setSportsOther("");
    setMoIOther("");
  };

  const handleSubMoIChange = (e) => {
    setType_of_Injury(e.target.value);
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
              {fieldErrors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.first_name}
                </p>
              )}
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
              {fieldErrors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.last_name}
                </p>
              )}
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
              {fieldErrors.age && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.age}</p>
              )}
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
              {fieldErrors.nationality && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.nationality}
                </p>
              )}
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
                <option value="sudurpaschim province">
                  Sudurpaschim Province
                </option>
              </select>
              {fieldErrors.province && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.province}
                </p>
              )}
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
                {districts.map((districtName) => (
                  <option key={districtName} value={districtName}>
                    {districtName}
                  </option>
                ))}
              </select>
              {fieldErrors.district && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.district}
                </p>
              )}
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
              {fieldErrors.hospital_number && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.hospital_number}
                </p>
              )}
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
              {fieldErrors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.phone_number}
                </p>
              )}
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {fieldErrors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.gender}
                </p>
              )}
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
                <option value="self-employed">Self-employed</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.occupation && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.occupation}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="moi"
                className="text-lg font-medium text-gray-700"
              >
                Mechanism of Injury
              </label>
              <select
                name="mechanism_of_injury"
                value={mechanism_of_injury}
                onChange={handleMoIChange}
                id="moi"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Mechanism of Injury</option>
                <option value="RTA injury">RTA Injury</option>
                <option value="fall injury">Fall Injury</option>
                <option value="sports injury">Sports Injury</option>
                <option value="others">Others</option>
              </select>
              {fieldErrors.MoI && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.MoI}</p>
              )}
            </div>
            {mechanism_of_injury === "RTA injury" && (
              <div className="flex flex-col">
                <label
                  htmlFor="subMoi"
                  className="text-lg font-medium text-gray-700"
                >
                  RTA Sub Options
                </label>
                <select
                  name="type_of_injury"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Sub Option</option>
                  <option value="4 Wheeler occupant">4 Wheeler occupant</option>
                  <option value="2 Wheeler rider">2 Wheeler rider</option>
                  <option value="2 Wheeler Pillion rider">
                    2 Wheeler Pillion rider
                  </option>
                  <option value="Pedestrian">Pedestrian</option>
                </select>
                {fieldErrors.subMoI && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.subMoI}
                  </p>
                )}
              </div>
            )}
            {mechanism_of_injury === "fall injury" && (
              <div className="flex flex-col">
                <label
                  htmlFor="subMoi"
                  className="text-lg font-medium text-gray-700"
                >
                  Fall Sub Options
                </label>
                <select
                  name="subMoi"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="From height">From height</option>
                  <option value="From Standing height">
                    From Standing height
                  </option>
                </select>
                {fieldErrors.subMoI && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.subMoI}
                  </p>
                )}
              </div>
            )}
            {mechanism_of_injury === "sports injury" && (
              <div className="flex flex-col">
                <label
                  htmlFor="subMoi"
                  className="text-lg font-medium text-gray-700"
                >
                  Sports Sub Options
                </label>
                <select
                  name="subMoi"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="others">Others</option>
                </select>
                {type_of_injury === "others" && (
                  <div className="flex flex-col mt-2">
                    <label
                      htmlFor="sportsOther"
                      className="text-lg font-medium text-gray-700"
                    >
                      Please Specify Sports
                    </label>
                    <input
                      type="text"
                      value={sportsOther}
                      onChange={(e) => setSportsOther(e.target.value)}
                      id="sportsOther"
                      name="sportsOther"
                      className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            )}
            {mechanism_of_injury === "others" && (
              <div className="flex flex-col mt-2">
                <label
                  htmlFor="MoIOther"
                  className="text-lg font-medium text-gray-700"
                >
                  Please Specify Mechanism of Injury
                </label>
                <input
                  type="text"
                  value={MoIOther}
                  onChange={(e) => setMoIOther(e.target.value)}
                  id="MoIOther"
                  name="MoIOther"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label
                htmlFor="incidentDate"
                className="text-lg font-medium text-gray-700"
              >
                Date of Incident
              </label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                id="incidentDate"
                name="incident_datetime"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.incidentDate && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.incidentDate}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="incidentTime"
                className="text-lg font-medium text-gray-700"
              >
                Time of Incident
              </label>
              <input
                type="time"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                id="incidentTime"
                name="incident_datetime"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.incidentTime && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.incidentTime}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="primaryTreatment"
                className="text-lg font-medium text-gray-700"
              >
                Primary Treatment
              </label>
              <select
                name="primary_treatment_received"
                value={primaryTreatment}
                onChange={(e) => setPrimaryTreatment(e.target.value)}
                id="primaryTreatment"
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Treatment</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              {fieldErrors.primaryTreatment && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.primaryTreatment}
                </p>
              )}
            </div>
            {primaryTreatment === "1" && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="treatmentWhere"
                    className="text-lg font-medium text-gray-700"
                  >
                    Where
                  </label>
                  <input
                    type="text"
                    value={treatmentWhere}
                    onChange={(e) => setTreatmentWhere(e.target.value)}
                    id="treatmentWhere"
                    name="treatment_location"
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="antibiotic"
                    className="text-lg font-medium text-gray-700"
                  >
                    Antibiotic
                  </label>
                  <input
                    type="text"
                    value={antibiotic}
                    onChange={(e) => setAntibiotic(e.target.value)}
                    id="antibiotic"
                    name="antibiotic"
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="whatTreatment"
                    className="text-lg font-medium text-gray-700"
                  >
                    What Treatment
                  </label>
                  <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    value={whatTreatment}
                    onChange={(e) => setWhatTreatment(e.target.value)}
                    id="whatTreatment"
                    name="treatment_details"
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}
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
              Save and Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSurgery;
