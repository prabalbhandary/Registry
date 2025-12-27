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

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ===================== FETCH ASSISTANT SURGEONS (PAGINATED) ===================== */
  useEffect(() => {
    const fetchAssistantSurgeons = async () => {
      try {
        const res = await axios.get(
          `${URL}/assistant-surgeone?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSurgeons(res.data?.data || []);
        setLastPage(res.data?.meta?.last_page || 1);
      } catch (error) {
        handleAuthError(error, "Failed to fetch assistant surgeons");
      }
    };

    fetchAssistantSurgeons();
  }, [page, token]);

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

      toast.success("Assistant surgeon added");
      setName("");
      setHospitals_id("");

      // refresh current page
      setPage(1);
    } catch (error) {
      handleAuthError(error, "Failed to add assistant surgeon");
    }
  };

  /* ===================== TOGGLE ACTIVE STATUS ===================== */
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      await axios.patch(
        `${URL}/activate-assistant-surgeone/${id}`,
        { is_active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");

      setSurgeons((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, is_active: !currentStatus } : s
        )
      );
    } catch (error) {
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

  /* ===================== SEARCH (CURRENT PAGE ONLY) ===================== */
  const filteredSurgeons = surgeons.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <title>Assistant Surgeons - Trauma Registry</title>

      {/* ===================== ADD FORM ===================== */}
      <section className="container mx-auto px-6 py-6 bg-white shadow rounded-lg my-8">
        <h1 className="text-2xl font-bold mb-4">Add Assistant Surgeon</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <select
            value={hospitals_id}
            onChange={(e) => setHospitals_id(e.target.value)}
            className="w-full p-3 border rounded"
          >
            <option value="">Select Hospital</option>
            {hospitals
              .filter((h) => h.is_active)
              .map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
          </select>

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Save
          </button>
        </form>
      </section>

      {/* ===================== LIST ===================== */}
      <section className="container mx-auto px-6 py-6 bg-white shadow rounded-lg my-8">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="flex-grow p-3 border rounded"
          />
        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredSurgeons.length > 0 ? (
              filteredSurgeons.map((s, i) => (
                <tr key={s.id} className="border-t">
                  <td className="p-3">
                    {(page - 1) * 10 + i + 1}
                  </td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">
                    <button onClick={() => toggleActiveStatus(s.id, s.is_active)}>
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

        {/* ===================== PAGINATION ===================== */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {lastPage}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
            disabled={page === lastPage}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default AddAssistant;
