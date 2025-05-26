import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { useNavigate } from "react-router-dom";

const Surgeries = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for screen size on mount and when resized
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    // Set initial value
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
        toast.error(
          error.response?.data?.message || "Error fetching surgeries"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSurgeries();
  }, []);

  // Card view for mobile/small screens
  const renderCards = () => {
    return surgeries.map((surgery, index) => (
      <div
        key={surgery.id}
        className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">
            Patient: {surgery.patient_detail?.first_name}{" "}
            {surgery.patient_detail?.last_name}
          </h3>
          <span className="text-xs text-gray-500">
            {new Date(surgery.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium">Age:</p>
            <p>{surgery.patient_detail?.age}</p>
          </div>

          <div>
            <p className="font-medium">Fixture:</p>
            <p>{surgery.fixture}</p>
          </div>

          <div>
            <p className="font-medium">Type:</p>
            <p>{surgery.fixture_type}</p>
          </div>

          <div>
            <p className="font-medium">Sub Type:</p>
            <p>{surgery.fixture_sub_type}</p>
          </div>

          <div>
            <p className="font-medium">Plate Size:</p>
            <p>{surgery.size_of_plate}</p>
          </div>

          <div>
            <p className="font-medium">Screws:</p>
            <p>{surgery.number_of_screws}</p>
          </div>

          <div>
            <p className="font-medium">Material:</p>
            <p>{surgery.material_used}</p>
          </div>
        </div>

        <div className="mt-2">
          <p className="font-medium">Description:</p>
          <p className="text-sm">{surgery.description}</p>
        </div>

        {surgery.elaboration && (
          <div className="mt-2">
            <p className="font-medium">Elaboration:</p>
            <p className="text-sm">{surgery.elaboration}</p>
          </div>
        )}
      </div>
    ));
  };

  // Table view for larger screens
  const renderTable = () => {
    return (
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
                  {surgery.patient_detail?.first_name}{" "}
                  {surgery.patient_detail?.last_name}
                </td>
                <td className="px-4 py-2 border">
                  {surgery.patient_detail?.age}
                </td>
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
    );
  };

  return (
    <>
      <title>Surgeries - Trauma Registry</title>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Follow Up</h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading followup...</p>
          </div>
        ) : surgeries.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded p-6 text-center">
            <p className="text-gray-500">No followup found.</p>
          </div>
        ) : isSmallScreen ? (
          renderCards()
        ) : (
          renderTable()
        )}
      </div>
    </>
  );
};

export default Surgeries;
