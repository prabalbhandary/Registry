import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Surgeries = () => {
  const [surgeries, setSurgeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", checkScreenSize);
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
        setSurgeries(res.data.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching surgeries"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSurgeries();
  }, []);

  const handleClick = (patient_detail_id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (patient_detail_id) {
      localStorage.setItem("patient_detail_id", patient_detail_id);
    }
  };

  const renderCards = () =>
    surgeries.map((surgery) => (
      <div
        key={surgery.id}
        onClick={() => handleClick(surgery.patient_detail?.id)}
        className="cursor-pointer bg-white rounded-xl shadow-md p-5 mb-5 border border-gray-100 hover:shadow-lg transition-all duration-200"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-gray-800">
            {surgery.patient_detail?.first_name}{" "}
            {surgery.patient_detail?.last_name}
          </h3>
          <span className="text-xs text-gray-500">
            {new Date(surgery.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <CardItem label="Age" value={surgery.patient_detail?.age} />
          <CardItem label="Fixture" value={surgery.fixture} />
          <CardItem label="Type" value={surgery.fixture_type} />
          <CardItem label="Sub Type" value={surgery.fixture_sub_type} />
          <CardItem label="Plate Size" value={surgery.size_of_plate} />
          <CardItem label="Screws" value={surgery.number_of_screws} />
          <CardItem label="Material" value={surgery.material_used} />
        </div>

        {/* Description */}
        <CardText label="Description" value={surgery.description} />

        {/* Elaboration */}
        {surgery.elaboration && (
          <CardText label="Elaboration" value={surgery.elaboration} />
        )}
      </div>
    ));

  const renderTable = () => (
    <div className="overflow-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr className="text-left">
            {[
              "#",
              "Patient Name",
              "Age",
              "Fixation",
              "Type",
              "Sub Type",
              "Plate Size",
              "Screws",
              "Elaboration",
              "Material Used",
              "Description",
              "Created At",
            ].map((head, idx) => (
              <th key={idx} className="px-4 py-3 border-b font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {surgeries.map((surgery, index) => (
            <tr
              key={surgery.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 border-b">{index + 1}</td>
              <td className="px-4 py-3 border-b">
                <Link
                  to={`/followup/${surgery.id}`}
                  onClick={() => handleClick(surgery.patient_detail?.id)}
                  className="text-blue-600 hover:underline"
                >
                  {surgery.patient_detail?.first_name}{" "}
                  {surgery.patient_detail?.last_name}
                </Link>
              </td>
              <td className="px-4 py-3 border-b">{surgery.patient_detail?.age}</td>
              <td className="px-4 py-3 border-b">{surgery.fixture}</td>
              <td className="px-4 py-3 border-b">{surgery.fixture_type}</td>
              <td className="px-4 py-3 border-b">{surgery.fixture_sub_type}</td>
              <td className="px-4 py-3 border-b">{surgery.size_of_plate}</td>
              <td className="px-4 py-3 border-b">{surgery.number_of_screws}</td>
              <td className="px-4 py-3 border-b">{surgery.elaboration}</td>
              <td className="px-4 py-3 border-b">{surgery.material_used}</td>
              <td className="px-4 py-3 border-b">{surgery.description}</td>
              <td className="px-4 py-3 border-b">
                {new Date(surgery.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <title>Patients - Trauma Registry</title>

      <div className="p-6 min-h-[300px]">
        {loading ? (
         <Loader />
        ) : surgeries.length === 0 ? (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            No surgeries found.
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

// Reusable UI components
const CardItem = ({ label, value }) => (
  <div>
    <p className="font-medium text-gray-700">{label}:</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

const CardText = ({ label, value }) => (
  <div className="mt-3">
    <p className="font-medium text-gray-700">{label}:</p>
    <p className="text-sm text-gray-600">{value}</p>
  </div>
);
