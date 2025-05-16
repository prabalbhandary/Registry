import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";

const Surgeries = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurgeries = async () => {
      try {
        const res = await axios.get(`${URL}/create-surgery`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSurgeries(res.data.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching surgeries");
      } finally {
        setLoading(false);
      }
    };

    fetchSurgeries();
  }, []);

  return (
    <>
      <title>Surgeries - Trauma Registry</title>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Surgeries</h1>

        {loading ? (
          <p>Loading...</p>
        ) : surgeries.length === 0 ? (
          <p>No surgeries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Patient Name</th>
                  <th className="px-4 py-2 border">Age</th>
                  <th className="px-4 py-2 border">Fixture</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Sub Type</th>
                  <th className="px-4 py-2 border">Plate Size</th>
                  <th className="px-4 py-2 border">Screws</th>
                  <th className="px-4 py-2 border">Material</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Elaboration</th>
                  <th className="px-4 py-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {surgeries.map((surgery, index) => (
                  <tr key={surgery.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {surgery.patient_detail?.first_name} {surgery.patient_detail?.last_name}
                    </td>
                    <td className="px-4 py-2 border">{surgery.patient_detail?.age}</td>
                    <td className="px-4 py-2 border">{surgery.fixture}</td>
                    <td className="px-4 py-2 border">{surgery.fixture_type}</td>
                    <td className="px-4 py-2 border">{surgery.fixture_sub_type}</td>
                    <td className="px-4 py-2 border">{surgery.size_of_plate}</td>
                    <td className="px-4 py-2 border">{surgery.number_of_screws}</td>
                    <td className="px-4 py-2 border">{surgery.material_used}</td>
                    <td className="px-4 py-2 border">{surgery.description}</td>
                    <td className="px-4 py-2 border">{surgery.elaboration}</td>
                    <td className="px-4 py-2 border">
                      {new Date(surgery.created_at).toLocaleDateString()}
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

export default Surgeries;
