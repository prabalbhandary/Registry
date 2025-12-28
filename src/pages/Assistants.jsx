import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../components/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Assistants = () => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Assistants - Trauma Registry";

    const fetchAssistants = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${URL}/assistant-surgeone`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAssistants(res.data.data);
        setSelectedAssistant(res.data.data[0]);
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
            error.response?.data?.message || "Failed to fetch assistants"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 animate-[slideDown_0.6s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-700 to-sky-500 bg-clip-text text-transparent mb-2">
          Assistants
        </h1>
        <p className="text-slate-600 text-lg font-medium">
          List of assistant surgeons and assigned hospitals
        </p>
      </div>

      {/* Table Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-[fadeIn_0.8s_ease-out]">
        {/* Loader */}
        {loading && (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-cyan-500" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6 text-red-600 font-semibold">
            Error: {error.message}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && assistants.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              No Assistants Found
            </h3>
            <p className="text-slate-500">
              Assistants will appear here once added
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && assistants.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-100 to-sky-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Assistant Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Hospital
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {assistants.map((assistant, index) => (
                  <tr
                    key={assistant.id}
                    onClick={() => setSelectedAssistant(assistant)}
                    className={`cursor-pointer transition-all duration-200
                  ${selectedAssistant?.id === assistant.id
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
                      {assistant.name}
                    </td>

                    <td className="px-6 py-5">
                      <div className="font-semibold text-slate-800">
                        {assistant.hospital?.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {assistant.hospital?.address}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {assistant.is_active ? (
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

export default Assistants;
