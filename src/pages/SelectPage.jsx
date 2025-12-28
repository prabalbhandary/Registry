import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { URL } from "../components/URL";
import { FaPlus, FaArrowLeft } from "react-icons/fa6";

const selectStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
};

const SelectPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [assistantSurgeons, setAssistantSurgeons] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedAssistants, setSelectedAssistants] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [primarySurgeon] = useState(user?.name || "");

  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [assistantName, setAssistantName] = useState("");
  const [assistantHospitalId, setAssistantHospitalId] = useState("");

  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!selectedHospital) {
      toast.error("Please select a hospital.");
      return;
    }
    if (selectedAssistants.length === 0) {
      toast.error("Please select at least one assistant surgeon.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/surgeon-detail`, {
        surgeon_name: primarySurgeon,
        hospitals_id: selectedHospital.value,
        assistant_surgeones: selectedAssistants.map((s) => s.value),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem(
          "surgeonDetailId",
          JSON.stringify(res.data.data.id)
        );
        navigate("/create-surgery");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    axios
      .get(`${URL}/hospital`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setHospitals(
          (res.data?.data || [])
            .filter((h) => h.is_active)
            .map((h) => ({ value: h.id, label: h.name }))
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/assistant-surgeone`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setAssistantSurgeons(
          (res.data?.data || []).map((s) => ({
            value: s.name,
            label: s.name,
          }))
        );
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white rounded-xl border border-slate-200 hover:shadow-lg"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
              Surgeon Details
            </h1>
            <p className="text-slate-600 font-medium">
              Select hospital & assistant surgeons
            </p>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 space-y-8">
          {/* Hospital */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Hospital
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Select
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  options={hospitals}
                  value={selectedHospital}
                  onChange={setSelectedHospital}
                  placeholder="Select Hospital"
                />
              </div>
              <button
                onClick={() => setIsHospitalModalOpen(true)}
                className="p-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Assistants */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">
              Assistant Surgeons
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Select
                  isMulti
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  options={assistantSurgeons}
                  value={selectedAssistants}
                  onChange={setSelectedAssistants}
                  placeholder="Select Assistant Surgeons"
                />
              </div>
              <button
                onClick={() => setIsAssistantModalOpen(true)}
                className="p-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg"
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6 border-t border-slate-200">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border-2 border-slate-300 font-semibold hover:bg-slate-50"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-xl"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Modals (same logic, improved style) */}
      {(isHospitalModalOpen || isAssistantModalOpen) && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {isHospitalModalOpen ? "Add Hospital" : "Add Assistant"}
            </h2>

            {isHospitalModalOpen ? (
              <>
                <input
                  className="w-full p-3 border-2 rounded-xl mb-3"
                  placeholder="Hospital Name"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
                <input
                  className="w-full p-3 border-2 rounded-xl mb-4"
                  placeholder="Address"
                  value={hospitalAddress}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                />
              </>
            ) : (
              <>
                <input
                  className="w-full p-3 border-2 rounded-xl mb-3"
                  placeholder="Assistant Name"
                  value={assistantName}
                  onChange={(e) => setAssistantName(e.target.value)}
                />
                <select
                  className="w-full p-3 border-2 rounded-xl mb-4"
                  value={assistantHospitalId}
                  onChange={(e) => setAssistantHospitalId(e.target.value)}
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((h) => (
                    <option key={h.value} value={h.value}>
                      {h.label}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsHospitalModalOpen(false);
                  setIsAssistantModalOpen(false);
                }}
                className="px-4 py-2 font-semibold"
              >
                Cancel
              </button>
              <button className="px-6 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectPage;
