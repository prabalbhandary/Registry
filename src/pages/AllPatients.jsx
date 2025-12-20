import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import Loader from "../components/Loader";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

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
        toast.error("Error fetching patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Patients</h1>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Hospital No</th>
                <th className="px-4 py-3 text-left">Patient Name</th>
                <th className="px-4 py-3 text-left">Age</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Injury Type</th>
                <th className="px-4 py-3 text-left">Arrival Date</th>
                {/* <th className="px-4 py-3 text-left">Status</th> */}
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{index + 1}</td>

                  <td className="px-4 py-2 font-medium">
                    {patient.hospital_number}
                  </td>

                  <td className="px-4 py-2">
                    {patient.first_name} {patient.last_name}
                  </td>

                  <td className="px-4 py-2">{patient.age}</td>

                  <td className="px-4 py-2">{patient.gender}</td>

                  <td className="px-4 py-2">{patient.phone_number}</td>

                  <td className="px-4 py-2">
                    {patient.type_of_injury}
                  </td>

                  <td className="px-4 py-2">
                    {new Date(patient.arrival_date).toLocaleDateString()}
                  </td>

                  {/* <td className="px-4 py-2">
                    {patient.is_completed ? (
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPatients;
