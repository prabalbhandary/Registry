import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { 
  RiUserHeartLine, 
  RiSearchLine,
  RiFileListLine,
  RiUserLine,
  RiPhoneLine,
  RiCalendarLine,
  RiHospitalLine
} from "react-icons/ri";
import { FaUserInjured } from "react-icons/fa";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${URL}/patient-detail`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setPatients(res.data?.data || []);
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
            error.response?.data?.message || "Failed to fetch patients"
          );
        }
      }
      finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.hospital_number?.toLowerCase().includes(searchLower) ||
      patient.first_name?.toLowerCase().includes(searchLower) ||
      patient.last_name?.toLowerCase().includes(searchLower) ||
      patient.phone_number?.toLowerCase().includes(searchLower) ||
      patient.type_of_injury?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <RiUserHeartLine className="text-4xl mr-3" />
              <h2 className="text-3xl font-bold">All Patients</h2>
            </div>
            <p className="text-emerald-100">
              Managing {patients.length} patient{patients.length !== 1 ? 's' : ''} in the registry
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <RiFileListLine className="text-5xl text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Stats Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <RiSearchLine className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Search Patients</h3>
              <p className="text-sm text-gray-500">
                {filteredPatients.length} of {patients.length} patients
              </p>
            </div>
          </div>
          
          <div className="relative flex-1 md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <RiSearchLine className="text-gray-400 text-xl" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search by name, hospital no, phone..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      {filteredPatients.length === 0 && patients.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <RiUserHeartLine className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Patients Found</h3>
          <p className="text-gray-500">Start by adding your first patient to the registry.</p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <RiSearchLine className="text-4xl text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Matching Patients</h3>
          <p className="text-gray-500">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Hospital No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Patient Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Injury Type</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Arrival Date</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredPatients.map((patient, index) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-emerald-100 text-sm font-medium text-gray-700 group-hover:text-emerald-700 transition-colors">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mr-3">
                            <RiHospitalLine className="text-white text-lg" />
                          </div>
                          <span className="font-semibold text-gray-900">{patient.hospital_number}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-3">
                            <RiUserLine className="text-white text-lg" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {patient.first_name} {patient.last_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          patient.gender === 'Male' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {patient.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">{patient.phone_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          <FaUserInjured className="mr-1" />
                          {patient.type_of_injury}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                        {new Date(patient.arrival_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredPatients.map((patient, index) => (
              <div
                key={patient.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <RiUserLine className="text-2xl text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">
                          {patient.first_name} {patient.last_name}
                        </h3>
                        <p className="text-sm text-emerald-100">
                          #{patient.hospital_number}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm text-sm font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <RiUserLine className="text-lg" />
                      <span className="text-sm">Age</span>
                    </div>
                    <span className="font-semibold text-gray-900">{patient.age}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <RiUserLine className="text-lg" />
                      <span className="text-sm">Gender</span>
                    </div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.gender === 'Male' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {patient.gender}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <RiPhoneLine className="text-lg" />
                      <span className="text-sm">Phone</span>
                    </div>
                    <span className="font-semibold text-gray-900">{patient.phone_number}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaUserInjured className="text-lg" />
                      <span className="text-sm">Injury Type</span>
                    </div>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                      {patient.type_of_injury}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <RiCalendarLine className="text-lg" />
                      <span className="text-sm">Arrival Date</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {new Date(patient.arrival_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPatients;