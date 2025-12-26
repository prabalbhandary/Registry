import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Your Hospitals - Trauma Registry";

    const fetchHospitals = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${URL}/hospital`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setHospitals(res.data.data);
        setSelectedHospital(res.data.data[0]);
      } catch (error) {
        setError(error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => {
              localStorage.clear();
              navigate("/login");
            },
          });
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch hospitals"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Hospitals</h1>
        {loading && (
          <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && hospitals.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Address</th>
                  <th className="py-2 px-4 text-left">Is Active</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr
                    key={hospital.id}
                    className={`cursor-pointer ${
                      selectedHospital?.id === hospital.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedHospital(hospital)}
                  >
                    <td className="py-2 px-4 font-medium">{hospital.name}</td>
                    <td className="py-2 px-4">{hospital.address}</td>
                    <td className="py-2 px-4">
                      {hospital.is_active ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Hospitals;
