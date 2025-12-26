import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const AddAssistant = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [surgeons, setSurgeons] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospitals_id, setHospitals_id] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ===================== RESET ===================== */
  const handleReset = () => setSearchTerm("");

  /* ===================== FETCH ASSISTANT SURGEONS ===================== */
  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeone`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSurgeons(res.data?.data || res.data);
      } catch (error) {
        console.error("Fetch assistant surgeons error:", error);
        handleAuthError(error, "Failed to fetch assistant surgeons");
      }
    };

    fetchAssistantSurgeons();
  }, [token]);

  /* ===================== FETCH HOSPITALS ===================== */
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${URL}/hospital`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHospitals(res.data?.data || []);
      } catch (error) {
        console.error("Fetch hospitals error:", error);
        handleAuthError(error, "Failed to fetch hospitals");
      }
    };

    fetchHospitals();
  }, [token]);

  /* ===================== ADD ASSISTANT SURGEON ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !hospitals_id) {
      toast.error("Both name and hospital are required");
      return;
    }

    try {
      const res = await axios.post(
        `${URL}/assistant-surgeone`,
        {
          name,
          hospitals_id: Number(hospitals_id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data?.message || "Assistant surgeon added");

      setSurgeons((prev) => [...prev, res.data.assistant_surgeon]);
      setName("");
      setHospitals_id("");
    } catch (error) {
      console.error("Add assistant surgeon error:", error);
      handleAuthError(error, "Failed to add assistant surgeon");
    }
  };

  /* ===================== TOGGLE ACTIVE STATUS ===================== */
  const toggleActiveStatus = async (surgeonId, currentStatus) => {
    try {
      const res = await axios.patch(
        `${URL}/activate-assistant-surgeone/${surgeonId}`,
        { is_active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setSurgeons((prev) =>
          prev.map((s) =>
            s.id === surgeonId ? { ...s, is_active: !currentStatus } : s
          )
        );

        toast.success(
          `Status changed to ${!currentStatus ? "Active" : "Inactive"}`
        );
      }
    } catch (error) {
      console.error("Toggle status error:", error);
      handleAuthError(error, "Failed to update status");
    }
  };

  /* ===================== AUTH ERROR HANDLER ===================== */
  const handleAuthError = (error, fallbackMessage) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.", {
        onClose: () => {
          localStorage.clear();
          navigate("/login");
        },
      });
    } else {
      toast.error(error.response?.data?.message || fallbackMessage);
    }
  };

  /* ===================== FILTER ===================== */
  const filteredSurgeons = surgeons.filter((surgeon) =>
    surgeon.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      {/* ===================== FORM ===================== */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h1 className="text-3xl font-bold mb-2">Add New Assistant Surgeon</h1>
        <p className="text-gray-600 mb-6">Enter name and select hospital</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border rounded-md"
            required
          />

          <select
            value={hospitals_id}
            onChange={(e) => setHospitals_id(e.target.value)}
            className="w-full p-4 border rounded-md"
            required
          >
            <option value="">Select Hospital</option>
            {hospitals
              .filter((h) => h.is_active)
              .map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
          </select>

          <button className="w-full bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700">
            Save
          </button>
        </form>
      </section>

      {/* ===================== LIST ===================== */}
      <section className="container mx-auto px-4 md:px-8 py-6 bg-white shadow-xl rounded-lg my-8">
        <h2 className="text-3xl font-bold mb-4">Assistant Surgeons</h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 border rounded-md"
          />
          <button
            onClick={handleReset}
            className="bg-blue-600 text-white px-4 rounded-md"
          >
            Reset
          </button>
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurgeons.length > 0 ? (
              filteredSurgeons.map((s, i) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActiveStatus(s.id, s.is_active)}
                    >
                      {s.is_active ? (
                        <PiToggleRightFill className="text-green-500 text-3xl" />
                      ) : (
                        <PiToggleLeftFill className="text-gray-400 text-3xl" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">
                  No assistant surgeons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default AddAssistant;
