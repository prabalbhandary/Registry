import React, { useEffect, useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import Select from "react-select";

const CreateSurgery = () => {
  const navigate = useNavigate();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [country_id, setCountryId] = useState("");
  const [province_id, setProvinceId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const [address, setAddress] = useState("");
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

  const selectPortalStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menu: (base) => ({ ...base, zIndex: 9999 }),
  };

  const BASE_URL = URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/countries`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => setCountries(res.data.data))
      .catch(() => {
        if (error.response?.status === 401) {
                  toast.error("Session expired. Please log in again.", {
                    onClose: () => {
                      localStorage.clear();
                      navigate("/login");
                    },
                  });
                } else {
                  toast.error(
                    error.response?.data?.message || "Failed to fetch countries"
                  );
                }
      });
  }, []);

  useEffect(() => {
    if (!country_id) return;

    // Check if selected country is Nepal
    const selectedCountry = countries.find(c => c.id === country_id);
    const isNepal = selectedCountry?.name?.toLowerCase() === 'nepal';

    if (isNepal) {
      axios.get(`${BASE_URL}/provinces?country_id=${country_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(res => {
          setProvinces(res.data.data);
          setProvinceId("");
          setDistrictId("");
          setDistricts([]);
        })
        .catch(() => toast.error("Failed to load provinces"));
    } else {
      // Clear province/district data for non-Nepal countries
      setProvinces([]);
      setProvinceId("");
      setDistricts([]);
      setDistrictId("");
    }
  }, [country_id, countries]);

  useEffect(() => {
    if (!province_id) return;

    axios.get(`${BASE_URL}/districts?province_id=${province_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => {
        setDistricts(res.data.data);
        setDistrictId("");
      })
      .catch(() => {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch districts"
          );
        }
      });
  }, [province_id]);

  const [fieldErrors, setFieldErrors] = useState({
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    country_id: "",
    province_id: "",
    district_id: "",
    address: "",
    hospital_number: "",
    phone_number: "",
    occupation: "",
    mechanism_of_injury: "",
    type_of_injury: "",
    incidentDate: "",
    incidentTime: "",
    primaryTreatment: "",
  });

  // Convert countries to react-select format
  const countryOptions = countries.map(country => ({
    value: country.id,
    label: country.name
  }));

  // Get selected country for react-select
  const selectedCountry = countryOptions.find(option => option.value === country_id) || null;

  // Check if selected country is Nepal
  const selectedCountryData = countries.find(c => c.id === country_id);
  const isNepal = selectedCountryData?.name?.toLowerCase() === 'nepal';

  const calculatePresentationDelay = () => {
    if (!incidentDate || !incidentTime) return "";

    const incidentDateTime = new Date(`${incidentDate}T${incidentTime}`);
    const now = new Date();
    const diffMs = now - incidentDateTime;

    if (diffMs < 0) return "Invalid incident time";

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const handleCountryChange = (selectedOption) => {
    setCountryId(selectedOption ? selectedOption.value : "");
    // Clear address, province, and district when country changes
    setAddress("");
    setProvinceId("");
    setDistrictId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      country_id: "",
      province_id: "",
      district_id: "",
      address: "",
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
    if (!country_id) {
      formValid = false;
      newErrors.country_id = "Country is required.";
    }

    // Conditional validation based on country
    if (isNepal) {
      if (!province_id) {
        formValid = false;
        newErrors.province_id = "Province is required.";
      }
      if (!district_id) {
        formValid = false;
        newErrors.district_id = "District is required.";
      }
    } else {
      if (!address) {
        formValid = false;
        newErrors.address = "Address is required.";
      }
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
      newErrors.mechanism_of_injury = "Mechanism of Injury is required.";
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
      const res = await axios.post(`${URL}/patient-detail`, {
        surgeon_detail_id: localStorage.getItem("surgeonDetailId"),
        first_name,
        last_name,
        age,
        gender,
        country_id,
        province_id: isNepal ? province_id : null,
        district_id: isNepal ? district_id : null,
        address: !isNepal ? address : null,
        hospital_number,
        phone_number,
        occupation,
        mechanism_of_injury,
        type_of_injury,
        sportsOther,
        MoIOther,
        incident_date: incidentDate,
        incident_time: incidentTime,
        primary_treatment_received: primaryTreatment,
        treatment_location: treatmentWhere,
        antibiotic,
        treatment_details: whatTreatment,
      });
      if (res.data.success === true) {
        toast.success(res.data.message);
        setCompletedIndex(1);
        const patientId = res.data.data.id;
        localStorage.setItem("patientId", patientId);
        navigate(`/add-surgerical-details`, {
          state: { completedIndex: 1 },
        });
      }
    } catch (error) {
      if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            error.response?.data?.message || "Failed to create patient"
          );
        }
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

  // Custom styles for react-select to match your design
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '56px',
      borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.5)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
      },
      borderRadius: '0.5rem',
      padding: '0.5rem',
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 0.5rem',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
  };

  return (
    <>
      <title>Create Surgery - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 sm:mb-8">
          Add Patient Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-lg font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.first_name}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-lg font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.last_name && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.last_name}
                </p>
              )}
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label
                htmlFor="age"
                className="text-lg font-medium text-gray-700"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.age && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.age}</p>
              )}
            </div>

            {/* Country - Searchable */}
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-lg font-medium text-gray-700 mb-2"
              >
                Country
              </label>
              <Select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countryOptions}
                styles={{ ...customSelectStyles, ...selectPortalStyles }}
                menuPortalTarget={document.body}
                placeholder="Search or select country..."
                isClearable
                isSearchable
                noOptionsMessage={() => "No country found"}
              />
              {fieldErrors.country_id && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.country_id}
                </p>
              )}
            </div>

            {/* Conditional Province/District for Nepal OR Address for other countries */}
            {isNepal ? (
              <>
                {/* Province */}
                <div className="flex flex-col">
                  <label
                    htmlFor="province"
                    className="text-lg font-medium text-gray-700"
                  >
                    Province
                  </label>
                  <select
                    id="province"
                    name="province"
                    value={province_id}
                    onChange={(e) => setProvinceId(e.target.value)}
                    disabled={!country_id}
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Province</option>
                    {provinces.map((prov) => (
                      <option key={prov.id} value={prov.id}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.province_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.province_id}
                    </p>
                  )}
                </div>

                {/* District */}
                <div className="flex flex-col">
                  <label
                    htmlFor="district"
                    className="text-lg font-medium text-gray-700"
                  >
                    District
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={district_id}
                    onChange={(e) => setDistrictId(e.target.value)}
                    disabled={!province_id}
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.district_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.district_id}
                    </p>
                  )}
                </div>
              </>
            ) : (
              country_id && (
                /* Address field for non-Nepal countries */
                <div className="flex flex-col md:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-lg font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows="3"
                    placeholder="Enter full address"
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {fieldErrors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldErrors.address}
                    </p>
                  )}
                </div>
              )
            )}

            {/* Hospital Number */}
            <div className="flex flex-col">
              <label
                htmlFor="hospital_number"
                className="text-lg font-medium text-gray-700"
              >
                Hospital Number
              </label>
              <input
                type="text"
                id="hospital_number"
                name="hospital_number"
                value={hospital_number}
                onChange={(e) => setHospital_number(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.hospital_number && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.hospital_number}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label
                htmlFor="contact_number"
                className="text-lg font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contact_number"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.phone_number}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-lg font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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

            {/* Occupation */}
            <div className="flex flex-col">
              <label
                htmlFor="occupation"
                className="text-lg font-medium text-gray-700"
              >
                Occupation
              </label>
              <select
                id="occupation"
                name="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
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

            {/* MoI & Conditional Fields */}
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
              {fieldErrors.mechanism_of_injury && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.mechanism_of_injury}
                </p>
              )}
            </div>
            {mechanism_of_injury === "RTA injury" && (
              <div className="flex flex-col">
                <label
                  htmlFor="subMoi"
                  className="text-lg font-medium text-gray-700"
                >
                  RTA Injury
                </label>
                <select
                  name="type_of_injury"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Injury</option>
                  <option value="4 Wheeler occupant">4 Wheeler occupant</option>
                  <option value="2 Wheeler rider">2 Wheeler rider</option>
                  <option value="2 Wheeler Pillion rider">
                    2 Wheeler Pillion rider
                  </option>
                  <option value="Pedestrian">Pedestrian</option>
                </select>
                {fieldErrors.type_of_injury && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.type_of_injury}
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
                  Fall Injury
                </label>
                <select
                  name="type_of_injury"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Fall Injury</option>
                  <option value="From height">From height</option>
                  <option value="From Standing height">
                    From Standing height
                  </option>
                </select>
                {fieldErrors.type_of_injury && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.type_of_injury}
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
                  Sports Injury
                </label>
                <select
                  name="subMoi"
                  value={type_of_injury}
                  onChange={handleSubMoIChange}
                  id="subMoi"
                  className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Sports Injury</option>
                  <option value="Football">Football</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="others">Others</option>
                </select>

                {/* Show error if subtype not selected */}
                {fieldErrors.type_of_injury && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.type_of_injury}
                  </p>
                )}

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

            {/* Incident Date */}
            <div className="flex flex-col">
              <label
                htmlFor="incidentDate"
                className="text-lg font-medium text-gray-700"
              >
                Date of Incident
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incident_datetime"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.incidentDate && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.incidentDate}
                </p>
              )}
            </div>

            {/* Incident Time */}
            <div className="flex flex-col">
              <label
                htmlFor="incidentTime"
                className="text-lg font-medium text-gray-700"
              >
                Time of Incident
              </label>
              <input
                type="time"
                id="incidentTime"
                name="incident_datetime"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {fieldErrors.incidentTime && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.incidentTime}
                </p>
              )}
            </div>
            {/* Presentation Delay */}
            {incidentDate && incidentTime && (
              <div className="flex flex-col">
                <label className="text-lg font-medium text-gray-700">
                  Presentation Delay
                </label>
                <p className="mt-2 p-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-900">
                  {calculatePresentationDelay()}
                </p>
              </div>
            )}

            {/* Primary Treatment */}
            <div className="flex flex-col">
              <label
                htmlFor="primaryTreatment"
                className="text-lg font-medium text-gray-700"
              >
                Primary Treatment
              </label>
              <select
                id="primaryTreatment"
                name="primary_treatment_received"
                value={primaryTreatment}
                onChange={(e) => setPrimaryTreatment(e.target.value)}
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

            {/* Treatment Details (conditional) */}
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
                    id="treatmentWhere"
                    value={treatmentWhere}
                    onChange={(e) => setTreatmentWhere(e.target.value)}
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
                    id="antibiotic"
                    value={antibiotic}
                    onChange={(e) => setAntibiotic(e.target.value)}
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
                    id="whatTreatment"
                    rows="4"
                    value={whatTreatment}
                    onChange={(e) => setWhatTreatment(e.target.value)}
                    className="mt-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 col-span-2"
                  />
                </div>
              </>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-100 rounded-lg py-4 px-5 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Responsive Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
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
