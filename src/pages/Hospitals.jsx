import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../components/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaHospital, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const navigate = useNavigate();

  /* =============================
     FETCH HOSPITALS
  ============================= */
  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await axios.get(`${URL}/hospital`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHospitals(res.data?.data || []);
      setSelectedHospital(res.data?.data?.[0] || null);
    } catch (err) {
      setError(err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          onClose: () => {
            localStorage.clear();
            navigate("/login");
          },
        });
      } else {
        toast.error(err.response?.data?.message || "Failed to fetch hospitals");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Hospitals - Trauma Registry";
    fetchHospitals();
  }, []);

  if (loading) return <Loader />;

  return (
   <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-slate-100 p-4 md:p-8">
  {/* Header */}
  <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-700 to-sky-500 bg-clip-text text-transparent mb-2">
      Hospitals
    </h1>
    <p className="text-slate-600 text-lg font-medium">
      View and manage registered hospitals
    </p>
  </div>

  {/* Table Container */}
  <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out]">
    {loading && (
      <div className="py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500" />
      </div>
    )}

    {!loading && hospitals.length === 0 && (
      <div className="py-20 text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          No Hospitals Found
        </h3>
        <p className="text-slate-500">
          Hospitals will appear here once added
        </p>
      </div>
    )}

    {!loading && hospitals.length > 0 && (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-cyan-100 to-sky-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Hospital Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {hospitals.map((hospital, index) => (
              <tr
                key={hospital.id}
                onClick={() => setSelectedHospital(hospital)}
                className={`cursor-pointer transition-all duration-200
                  ${
                    selectedHospital?.id === hospital.id
                      ? "bg-cyan-50"
                      : "hover:bg-gradient-to-r hover:from-cyan-50 hover:to-sky-50"
                  }
                `}
              >
                <td className="px-6 py-5">
                  <span className="text-sm font-semibold text-slate-500">
                    {index + 1}
                  </span>
                </td>

                <td className="px-6 py-5 font-semibold text-slate-800">
                  {hospital.name}
                </td>

                <td className="px-6 py-5 text-slate-700">
                  {hospital.address}
                </td>

                <td className="px-6 py-5">
                  {hospital.is_active ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm font-semibold">
                      ● Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-100 text-red-700 text-sm font-semibold">
                      ● Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>

  <style>{`
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}</style>
</div>

  );
};

export default Hospitals;
