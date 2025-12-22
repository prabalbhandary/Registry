import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import Loader from "../components/Loader";
import {
  RiSurgicalMaskFill,
  RiHospitalLine,
  RiUserHeartLine,
  RiStethoscopeLine,
} from "react-icons/ri";
import { FaArrowUp, FaArrowDown, FaChartLine } from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import RecentSurgeries from "../components/RecentSurgeries";
import RecentPatients from "../components/RecentPatients";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    surgeries: 0,
    patients: 0,
    assistants: 0,
    hospitals: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${URL}/dashboard-count`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data.data;

        setCounts({
          surgeries: data.surgery || 0,
          patients: data.patient || 0,
          assistants: data.assistent_surgeon || 0,
          hospitals: data.hospital || 0,
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  // Modern Stat Card Component
  const StatCard = ({ 
    label, 
    count, 
    icon: Icon, 
    bgGradient, 
    iconColor,
    path,
    trend = null 
  }) => (
    <Link to={path} className="group">
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 rounded-full bg-white/5"></div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm mb-4`}>
            <Icon className={`text-3xl ${iconColor}`} />
          </div>

          {/* Count */}
          <div className="mb-2">
            <h3 className="text-4xl font-bold text-white mb-1">{count}</h3>
            <p className="text-white/80 text-sm font-medium">{label}</p>
          </div>

          {/* Trend */}
          {trend && (
            <div className="flex items-center space-x-1 text-xs text-white/70">
              {trend > 0 ? (
                <>
                  <FaArrowUp className="text-green-300" />
                  <span className="text-green-300">+{trend}%</span>
                </>
              ) : (
                <>
                  <FaArrowDown className="text-red-300" />
                  <span className="text-red-300">{trend}%</span>
                </>
              )}
              <span>vs last month</span>
            </div>
          )}
        </div>

        {/* Hover Effect Indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );

  // Quick Stats Component
  const QuickStat = ({ label, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} bg-opacity-10 flex items-center justify-center`}>
          <Icon className={`text-2xl ${color}`} />
        </div>
      </div>
    </div>
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="text-blue-100">Here's what's happening with your trauma registry today.</p>
          </div>
          <div className="hidden lg:block">
            <BiTrendingUp className="text-8xl text-white/20" />
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Surgeries"
          count={counts.surgeries}
          icon={RiSurgicalMaskFill}
          bgGradient="from-amber-400 to-orange-500"
          iconColor="text-white"
          path="/patients/surgeries"
          trend={12}
        />

        <StatCard
          label="Active Patients"
          count={counts.patients}
          icon={RiUserHeartLine}
          bgGradient="from-emerald-400 to-teal-500"
          iconColor="text-white"
          path="/all-patients"
          trend={8}
        />

        <StatCard
          label="Assistant Surgeons"
          count={counts.assistants}
          icon={RiStethoscopeLine}
          bgGradient="from-blue-400 to-indigo-500"
          iconColor="text-white"
          path="/assistants"
          trend={5}
        />

        <StatCard
          label="Hospitals"
          count={counts.hospitals}
          icon={RiHospitalLine}
          bgGradient="from-rose-400 to-pink-500"
          iconColor="text-white"
          path="/hospitals"
          trend={-2}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <FaChartLine className="mr-2 text-blue-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/select"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="text-white text-2xl">+</span>
            </div>
            <span className="text-sm font-medium text-gray-700">New Patient</span>
          </Link>

          <Link
            to="/add-hospital"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 transition-all group"
          >
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <RiHospitalLine className="text-white text-2xl" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Hospital</span>
          </Link>

          <Link
            to="/add-assistant"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all group"
          >
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <RiStethoscopeLine className="text-white text-2xl" />
            </div>
            <span className="text-sm font-medium text-gray-700">Add Assistant</span>
          </Link>

          <Link
            to="/patients/follow-up"
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all group"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Follow Up</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Surgeries */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Surgeries</h3>
            <Link
              to="/patients/surgeries"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            <RecentSurgeries />
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Patients</h3>
            <Link
              to="/all-patients"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            <RecentPatients />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
