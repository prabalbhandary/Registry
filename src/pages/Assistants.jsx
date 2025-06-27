import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../components/URL";
import { toast } from "react-toastify";

const Assistants = () => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

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
        toast.error(
          error?.response?.data?.message || "Failed to fetch assistants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Assistants</h1>
        {loading && (
          <div className="flex justify-center items-center h-full w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && assistants.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Hospitals</th>
                  <th className="py-2 px-4 text-left">Is Active</th>
                </tr>
              </thead>
              <tbody>
                {assistants.map((assistant) => (
                  <tr
                    key={assistant.id}
                    className={`cursor-pointer ${
                      selectedAssistant?.id === assistant.id
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedAssistant(assistant)}
                  >
                    <td className="py-2 px-4 font-medium">{assistant.name}</td>
                    <td className="py-2 px-4">{assistant.hospitals.name}</td>
                    <td className="py-2 px-4">
                      {assistant.is_active ? "Yes" : "No"}
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

export default Assistants;
