import React from "react";
import { FaBars, FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SiGooglesheets } from "react-icons/si";
import RecentSurgeries from "../components/RecentSurgeries";
import RecentUsers from "../components/RecentUsers";
import RecentPatients from "../components/RecentPatients";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Live Stats Section */}
      <section>
        <p className="text-xl font-semibold text-gray-700 mb-4">LIVE STATS</p>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {[
            {
              label: "Surgeries",
              count: 0,
              bg: "bg-yellow-500",
              border: "border-yellow-500",
              short: "Sur",
              path: "/surgeries",
            },
            {
              label: "Patients",
              count: 0,
              bg: "bg-gray-500",
              border: "border-gray-500",
              short: "Pat",
              path: "/patients",
            },
            {
              label: "Assistant Surgeons",
              count: 0,
              bg: "bg-blue-500",
              border: "border-blue-500",
              short: "AS",
              path: "/assistants",
            },
            {
              label: "Hospitals",
              count: 0,
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

      {/* Quick Actions Section */}
      <section className="bg-white rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          {/* Add Hospital */}
          <div
            onClick={() => navigate("/add-hospital")}
            className="flex items-center w-full sm:w-auto hover:bg-gray-100 p-2 rounded-full cursor-pointer transition"
          >
            <div className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
              <FaBars className="text-xl" />
            </div>
            <div className="flex items-center ml-4">
              <p className="text-gray-600 font-medium hover:underline">
                Add Hospital
              </p>
              <FaLongArrowAltRight className="ml-2 text-gray-500" />
            </div>
          </div>

          {/* Add Assistant */}
          <div
            onClick={() => navigate("/add-assistant")}
            className="flex items-center w-full sm:w-auto hover:bg-gray-100 p-2 rounded-full cursor-pointer transition"
          >
            <div className="bg-yellow-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
              <SiGooglesheets className="text-xl" />
            </div>
            <div className="flex items-center ml-4">
              <p className="text-gray-600 font-medium hover:underline">
                Add Assistant Surgeon
              </p>
              <FaLongArrowAltRight className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>
        <hr className="my-6" />
      </section>

      {/* Recent Activity Section */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <RecentSurgeries />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <RecentUsers />
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
