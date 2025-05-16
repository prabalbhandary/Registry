import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecentSurgeries from "../components/RecentSurgeries";
import RecentPatients from "../components/RecentPatients";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sCount, setSCount] = useState(0);
  const [pCount, setPCount] = useState(0);
  const [aCount, setACount] = useState(0);
  const [hCount, setHCount] = useState(0);
  useEffect(() => {
    const fetchSugeryCount = async () => {
      try {
        const res = await axios.get(`${URL}/surgery-count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSCount(res.data.count);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching data");
      }
    }
    const fetchPatientCount = async () => {
      try {
        const res = await axios.get(`${URL}/patient-count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPCount(res.data.count);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching data");
      }
    }
    const fetchAssistantCount = async () => {
      try {
        const res = await axios.get(`${URL}/assistant-surgeon-count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setACount(res.data.count);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching data");
      }
    }
    const fetchHospitalCount = async () => {
      try {
        const res = await axios.get(`${URL}/hospital-count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHCount(res.data.count);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error fetching data");
      }
    }
    fetchSugeryCount();
    fetchPatientCount();
    fetchAssistantCount();
    fetchHospitalCount();
  }, [])
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Live Stats Section */}
      <section>
        <p className="text-xl font-semibold text-gray-700 mb-4">LIVE STATS</p>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {[
            {
              label: "Surgeries",
              count: sCount,
              bg: "bg-yellow-500",
              border: "border-yellow-500",
              short: "Sur",
              path: "/surgeries",
            },
            {
              label: "Patients",
              count: pCount,
              bg: "bg-gray-500",
              border: "border-gray-500",
              short: "Pat",
              path: "/patients",
            },
            {
              label: "Assistant Surgeons",
              count: aCount,
              bg: "bg-blue-500",
              border: "border-blue-500",
              short: "AS",
              path: "/assistants",
            },
            {
              label: "Hospitals",
              count: hCount,
              bg: "bg-red-500",
              border: "border-red-500",
              short: "HO",
              path: "/hospitals",
            },
          ].map((item, index) => (
            <div key={index} className="flex shadow-lg rounded-lg overflow-hidden">
              <div className={`${item.bg} text-white w-1/3 sm:w-1/4 h-24 flex items-center justify-center`}>
                <p className="text-lg font-bold">{item.short}</p>
              </div>
              <div className={`text-center border ${item.border} border-l-0 w-2/3 sm:w-3/4 flex flex-col justify-center`}>
                <Link
                  to={item.path}
                  className="text-black font-medium hover:text-gray-700 hover:underline"
                >
                  {item.label}
                </Link>
                <p className="text-xl font-semibold mt-2">{item.count}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-6" />
      </section>

      {/* Recent Activity Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <RecentSurgeries />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <RecentPatients />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
