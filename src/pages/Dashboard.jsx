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
    <>
      <title>Dashboard - Trauma Registry</title>

      {/* Main Layout: Fixed Sidebar on the left and scrollable content on the right */}
      <div className="flex">

        {/* Main Content */}
        <div className="p-6 overflow-y-auto">
          {/* Your Dashboard content */}
          <section>
            <p className="text-xl font-semibold text-gray-700 mb-4">LIVE STATS</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 max-w-full">
              {/* Stats Boxes */}
              <div className="flex shadow-lg">
                <div className="bg-yellow-500 text-white w-1/4 h-24 flex items-center justify-center rounded-l-lg">
                  <p className="text-xl">Sur</p>
                </div>
                <div className="text-center border border-yellow-500 border-l-0 w-3/4 rounded-r-lg">
                  <Link
                    to="/surgeries"
                    className="text-black font-medium hover:text-gray-700 hover:underline"
                  >
                    Surgeries
                  </Link>
                  <p className="text-xl font-semibold mt-2">0</p>
                </div>
              </div>
              <div className="flex shadow-lg">
                <div className="bg-gray-500 text-white w-1/4 h-24 flex items-center justify-center rounded-l-lg">
                  <p className="text-xl">Pat</p>
                </div>
                <div className="text-center border border-gray-500 w-3/4 rounded-r-lg">
                  <Link
                    to="/patients"
                    className="text-black font-medium hover:text-gray-700 hover:underline"
                  >
                    Patients
                  </Link>
                  <p className="text-xl font-semibold mt-2">0</p>
                </div>
              </div>
              <div className="flex shadow-lg">
                <div className="bg-blue-500 text-white w-1/4 h-24 flex items-center justify-center rounded-l-lg">
                  <p className="text-xl">AS</p>
                </div>
                <div className="text-center border border-blue-500 w-3/4 rounded-r-lg">
                  <Link
                    to="/assistants"
                    className="text-black font-medium hover:text-gray-700 hover:underline"
                  >
                    Assistant Surgeons
                  </Link>
                  <p className="text-xl font-semibold mt-2">0</p>
                </div>
              </div>
              <div className="flex shadow-lg">
                <div className="bg-red-500 text-white w-1/4 h-24 flex items-center justify-center rounded-l-lg">
                  <p className="text-xl">HO</p>
                </div>
                <div className="text-center border border-red-500 w-3/4 rounded-r-lg">
                  <Link
                    to="/hospitals"
                    className="text-black font-medium hover:text-gray-700 hover:underline"
                  >
                    Hospitals
                  </Link>
                  <p className="text-xl font-semibold mt-2">0</p>
                </div>
              </div>
            </div>
            <hr className="my-6" />
          </section>

          {/* Other Sections */}
          <section className="w-full p-6 bg-white rounded-lg mb-6">
            <div className="flex items-center justify-between mb-4 space-x-6">
              <div onClick={() => navigate("/add-hospital")} className="flex items-center hover:bg-gray-200 cursor-pointer rounded-full">
                <div className="bg-pink-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  <FaBars className="text-xl" />
                </div>
                <div className="flex items-center justify-center px-6 ml-4">
                  <p className="text-gray-500 font-medium hover:underline">
                    Add Hospital
                  </p>
                  <FaLongArrowAltRight className="inline ml-2 text-gray-500" />
                </div>
              </div>

              <div onClick={() => navigate("/add-assistant")} className="flex items-center hover:bg-gray-200 cursor-pointer rounded-full">
                <div className="bg-yellow-500 text-white w-12 h-12 flex items-center justify-center rounded-full">
                  <SiGooglesheets className="text-xl" />
                </div>
                <div className="flex items-center justify-center px-6 ml-4">
                  <p className="text-gray-500 font-medium hover:underline">
                    Add Assistant Surgeon
                  </p>
                  <FaLongArrowAltRight className="inline ml-2 text-gray-500" />
                </div>
              </div>
            </div>
            <hr className="my-6" />
          </section>

          <section className="w-full rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              <div className="flex-1 bg-white p-4 rounded-lg">
                <RecentSurgeries />
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg">
                <RecentUsers />
              </div>
              <div className="flex-1 bg-white p-4 rounded-lg">
                <RecentPatients />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
