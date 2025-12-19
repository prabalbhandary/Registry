import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import RecentSurgeries from "../components/RecentSurgeries";
import RecentPatients from "../components/RecentPatients";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";
import Loader from "../components/Loader";

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

  // Small stat card component
  const StatCard = ({ label, count, bg, border, short, path }) => (
    <div className="flex shadow-lg rounded-lg overflow-hidden">
      <div
        className={`${bg} text-white w-1/3 sm:w-1/4 h-24 flex items-center justify-center`}
      >
        <p className="text-lg font-bold">{short}</p>
      </div>

      <div
        className={`text-center border ${border} border-l-0 w-2/3 sm:w-3/4 flex flex-col justify-center`}
      >
        <Link
          to={path}
          className="text-black font-medium hover:text-gray-700 hover:underline"
        >
          {label}
        </Link>
        <p className="text-xl font-semibold mt-2">{count}</p>
      </div>
    </div>
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="p-4 sm:p-6 md:p-8">
      {/* LIVE STATS */}
      <section>
        <p className="text-xl font-semibold text-gray-700 mb-4">LIVE STATS</p>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          <StatCard
            label="Surgeries"
            count={counts.surgeries}
            bg="bg-yellow-500"
            border="border-yellow-500"
            short="Sur"
            path="/patients/surgeries"
          />

          <StatCard
            label="Patients"
            count={counts.patients}
            bg="bg-gray-500"
            border="border-gray-500"
            short="Pat"
            path="/patients/follow-up"
          />

          <StatCard
            label="Assistant Surgeons"
            count={counts.assistants}
            bg="bg-blue-500"
            border="border-blue-500"
            short="AS"
            path="/assistants"
          />

          <StatCard
            label="Hospitals"
            count={counts.hospitals}
            bg="bg-red-500"
            border="border-red-500"
            short="HO"
            path="/hospitals"
          />
        </div>

        <hr className="my-6" />
      </section>

      {/* RECENT ACTIVITY */}
      <section>
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
