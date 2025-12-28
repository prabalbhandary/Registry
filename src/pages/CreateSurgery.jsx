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

  const countryOptions = countries.map(country => ({
    value: country.id,
    label: country.name
  }));

  const selectedCountry = countryOptions.find(option => option.value === country_id) || null;

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
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '48px',
      borderColor: state.isFocused ? '#4f46e5' : '#e5e7eb',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(79, 70, 229, 0.1)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#4f46e5' : '#d1d5db',
      },
      borderRadius: '0.5rem',
      fontSize: '0.9375rem',
      transition: 'all 0.2s',
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0.375rem 0.75rem',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#4f46e5' : state.isFocused ? '#eef2ff' : 'white',
      color: state.isSelected ? 'white' : '#111827',
      '&:active': {
        backgroundColor: '#4f46e5',
      },
    }),
  };

  return (
    <>
      <title>Create Surgery - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Add Patient Information</h1>
            </div>
            <p className="text-gray-600 ml-13">Please fill in the patient details to proceed with the surgery registration</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="first_name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      placeholder="Enter first name"
                      className={`p-3 border ${fieldErrors.first_name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.first_name && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.first_name}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="last_name"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      placeholder="Enter last name"
                      className={`p-3 border ${fieldErrors.last_name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.last_name && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.last_name}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div className="flex flex-col">
                    <label htmlFor="age" className="text-sm font-semibold text-gray-700 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Enter age"
                      className={`p-3 border ${fieldErrors.age ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.age && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.age}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col">
                    <label htmlFor="gender" className="text-sm font-semibold text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={`p-3 border ${fieldErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {fieldErrors.gender && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Location Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                  Contact & Location
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Country */}
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-sm font-semibold text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
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
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.country_id}
                      </p>
                    )}
                  </div>

                  {/* Province (Nepal only) */}
                  {isNepal && (
                    <div className="flex flex-col">
                      <label htmlFor="province" className="text-sm font-semibold text-gray-700 mb-2">
                        Province <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={province_id}
                        onChange={(e) => setProvinceId(e.target.value)}
                        disabled={!country_id}
                        className={`p-3 border ${fieldErrors.province_id ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      >
                        <option value="">Select Province</option>
                        {provinces.map((prov) => (
                          <option key={prov.id} value={prov.id}>
                            {prov.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.province_id && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.province_id}
                        </p>
                      )}
                    </div>
                  )}

                  {/* District (Nepal only) */}
                  {isNepal && (
                    <div className="flex flex-col">
                      <label htmlFor="district" className="text-sm font-semibold text-gray-700 mb-2">
                        District <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="district"
                        name="district"
                        value={district_id}
                        onChange={(e) => setDistrictId(e.target.value)}
                        disabled={!province_id}
                        className={`p-3 border ${fieldErrors.district_id ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed`}
                      >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.district_id && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.district_id}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Address (non-Nepal countries) */}
                  {country_id && !isNepal && (
                    <div className="flex flex-col md:col-span-2">
                      <label htmlFor="address" className="text-sm font-semibold text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="3"
                        placeholder="Enter full address"
                        className={`p-3 border ${fieldErrors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      />
                      {fieldErrors.address && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.address}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Hospital Number */}
                  <div className="flex flex-col">
                    <label htmlFor="hospital_number" className="text-sm font-semibold text-gray-700 mb-2">
                      Hospital Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="hospital_number"
                      name="hospital_number"
                      value={hospital_number}
                      onChange={(e) => setHospital_number(e.target.value)}
                      placeholder="Enter hospital number"
                      className={`p-3 border ${fieldErrors.hospital_number ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.hospital_number && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.hospital_number}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label htmlFor="contact_number" className="text-sm font-semibold text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact_number"
                      name="phone_number"
                      value={phone_number}
                      onChange={(e) => setPhone_number(e.target.value)}
                      placeholder="Enter contact number"
                      className={`p-3 border ${fieldErrors.phone_number ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.phone_number && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.phone_number}
                      </p>
                    )}
                  </div>

                  {/* Occupation */}
                  <div className="flex flex-col">
                    <label htmlFor="occupation" className="text-sm font-semibold text-gray-700 mb-2">
                      Occupation <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className={`p-3 border ${fieldErrors.occupation ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select Occupation</option>
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="other">Other</option>
                    </select>
                    {fieldErrors.occupation && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.occupation}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Injury Details Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                  Injury Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mechanism of Injury */}
                  <div className="flex flex-col">
                    <label htmlFor="moi" className="text-sm font-semibold text-gray-700 mb-2">
                      Mechanism of Injury <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="mechanism_of_injury"
                      value={mechanism_of_injury}
                      onChange={handleMoIChange}
                      id="moi"
                      className={`p-3 border ${fieldErrors.mechanism_of_injury ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select Mechanism of Injury</option>
                      <option value="RTA injury">RTA Injury</option>
                      <option value="fall injury">Fall Injury</option>
                      <option value="sports injury">Sports Injury</option>
                      <option value="others">Others</option>
                    </select>
                    {fieldErrors.mechanism_of_injury && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.mechanism_of_injury}
                      </p>
                    )}
                  </div>

                  {/* Sub-options based on Mechanism */}
                  {mechanism_of_injury === "RTA injury" && (
                    <div className="flex flex-col">
                      <label htmlFor="subMoi" className="text-sm font-semibold text-gray-700 mb-2">
                        RTA Injury Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type_of_injury"
                        value={type_of_injury}
                        onChange={handleSubMoIChange}
                        id="subMoi"
                        className={`p-3 border ${fieldErrors.type_of_injury ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      >
                        <option value="">Select Injury</option>
                        <option value="4 Wheeler occupant">4 Wheeler occupant</option>
                        <option value="2 Wheeler rider">2 Wheeler rider</option>
                        <option value="2 Wheeler Pillion rider">2 Wheeler Pillion rider</option>
                        <option value="Pedestrian">Pedestrian</option>
                      </select>
                      {fieldErrors.type_of_injury && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.type_of_injury}
                        </p>
                      )}
                    </div>
                  )}

                  {mechanism_of_injury === "fall injury" && (
                    <div className="flex flex-col">
                      <label htmlFor="subMoi" className="text-sm font-semibold text-gray-700 mb-2">
                        Fall Injury Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type_of_injury"
                        value={type_of_injury}
                        onChange={handleSubMoIChange}
                        id="subMoi"
                        className={`p-3 border ${fieldErrors.type_of_injury ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                      >
                        <option value="">Select Fall Injury</option>
                        <option value="From height">From height</option>
                        <option value="From Standing height">From Standing height</option>
                      </select>
                      {fieldErrors.type_of_injury && (
                        <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {fieldErrors.type_of_injury}
                        </p>
                      )}
                    </div>
                  )}

                  {mechanism_of_injury === "sports injury" && (
                    <>
                      <div className="flex flex-col">
                        <label htmlFor="subMoi" className="text-sm font-semibold text-gray-700 mb-2">
                          Sports Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subMoi"
                          value={type_of_injury}
                          onChange={handleSubMoIChange}
                          id="subMoi"
                          className={`p-3 border ${fieldErrors.type_of_injury ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                        >
                          <option value="">Select Sports Injury</option>
                          <option value="Football">Football</option>
                          <option value="Cricket">Cricket</option>
                          <option value="Basketball">Basketball</option>
                          <option value="Volleyball">Volleyball</option>
                          <option value="others">Others</option>
                        </select>
                        {fieldErrors.type_of_injury && (
                          <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {fieldErrors.type_of_injury}
                          </p>
                        )}
                      </div>

                      {type_of_injury === "others" && (
                        <div className="flex flex-col">
                          <label htmlFor="sportsOther" className="text-sm font-semibold text-gray-700 mb-2">
                            Please Specify Sports
                          </label>
                          <input
                            type="text"
                            value={sportsOther}
                            onChange={(e) => setSportsOther(e.target.value)}
                            id="sportsOther"
                            name="sportsOther"
                            placeholder="Enter sport name"
                            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {mechanism_of_injury === "others" && (
                    <div className="flex flex-col">
                      <label htmlFor="MoIOther" className="text-sm font-semibold text-gray-700 mb-2">
                        Please Specify Mechanism of Injury
                      </label>
                      <input
                        type="text"
                        value={MoIOther}
                        onChange={(e) => setMoIOther(e.target.value)}
                        id="MoIOther"
                        name="MoIOther"
                        placeholder="Describe the mechanism"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  {/* Incident Date */}
                  <div className="flex flex-col">
                    <label htmlFor="incidentDate" className="text-sm font-semibold text-gray-700 mb-2">
                      Date of Incident <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incident_datetime"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className={`p-3 border ${fieldErrors.incidentDate ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.incidentDate && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.incidentDate}
                      </p>
                    )}
                  </div>

                  {/* Incident Time */}
                  <div className="flex flex-col">
                    <label htmlFor="incidentTime" className="text-sm font-semibold text-gray-700 mb-2">
                      Time of Incident <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="incidentTime"
                      name="incident_datetime"
                      value={incidentTime}
                      onChange={(e) => setIncidentTime(e.target.value)}
                      className={`p-3 border ${fieldErrors.incidentTime ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    />
                    {fieldErrors.incidentTime && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.incidentTime}
                      </p>
                    )}
                  </div>

                  {/* Presentation Delay */}
                  {incidentDate && incidentTime && (
                    <div className="flex flex-col md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700 mb-2">
                        Presentation Delay
                      </label>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-medium">Time since incident</p>
                            <p className="text-lg font-bold text-gray-900">{calculatePresentationDelay()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Treatment Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-2 border-b-2 border-indigo-100 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                  Treatment Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Treatment */}
                  <div className="flex flex-col">
                    <label htmlFor="primaryTreatment" className="text-sm font-semibold text-gray-700 mb-2">
                      Primary Treatment Received <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="primaryTreatment"
                      name="primary_treatment_received"
                      value={primaryTreatment}
                      onChange={(e) => setPrimaryTreatment(e.target.value)}
                      className={`p-3 border ${fieldErrors.primaryTreatment ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    >
                      <option value="">Select Treatment</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    {fieldErrors.primaryTreatment && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.primaryTreatment}
                      </p>
                    )}
                  </div>

                  {/* Treatment Details (conditional) */}
                  {primaryTreatment === "1" && (
                    <>
                      <div className="flex flex-col">
                        <label htmlFor="treatmentWhere" className="text-sm font-semibold text-gray-700 mb-2">
                          Treatment Location
                        </label>
                        <input
                          type="text"
                          id="treatmentWhere"
                          value={treatmentWhere}
                          onChange={(e) => setTreatmentWhere(e.target.value)}
                          placeholder="Where was treatment received?"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="antibiotic" className="text-sm font-semibold text-gray-700 mb-2">
                          Antibiotic
                        </label>
                        <input
                          type="text"
                          id="antibiotic"
                          value={antibiotic}
                          onChange={(e) => setAntibiotic(e.target.value)}
                          placeholder="Antibiotic administered"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="flex flex-col md:col-span-2">
                        <label htmlFor="whatTreatment" className="text-sm font-semibold text-gray-700 mb-2">
                          Treatment Details
                        </label>
                        <textarea
                          id="whatTreatment"
                          rows="4"
                          value={whatTreatment}
                          onChange={(e) => setWhatTreatment(e.target.value)}
                          placeholder="Describe the treatment received..."
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="text-sm font-semibold text-red-800">Error</h3>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                  Save and Continue →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSurgery;
