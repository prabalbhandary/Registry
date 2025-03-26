import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { FaChevronUp, FaChevronDown, FaBars } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { CiUser, CiClock1 } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "./URL";

const Sidebar = () => {
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[100%] w-[350px] p-6 bg-gray-300 text-black">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">NL Registry</h1>

      <div
        onClick={() => setDropDownOpened(!dropDownOpened)}
        className="flex items-center mb-4 cursor-pointer hover:bg-gray-400 p-2 rounded-lg"
      >
        <img src={user} alt="User" className="w-12 h-12 rounded-full mr-4" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold text-gray-800">
            {JSON.parse(localStorage.getItem("user")).name}
          </p>
          <p className="text-sm text-gray-600">
            {JSON.parse(localStorage.getItem("user")).email}
          </p>
        </div>
        <div className="ml-auto">
          {dropDownOpened ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </div>
      </div>

      {dropDownOpened && (
        <div className="bg-gray-200 shadow-xl p-4 rounded-lg mb-4">
          <NavLink
            to="/add-hospital"
            className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
          >
            Add Hospital
          </NavLink>
          <NavLink
            to="/add-assistant"
            className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
          >
            Add Assistant
          </NavLink>
          <NavLink
            to="/profile"
            className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
          >
            View Profile
          </NavLink>
          <hr className="my-2 border-gray-600" />
          <NavLink
            onClick={handleLogout}
            className="block text-sm text-red-500 hover:text-red-400 p-2 rounded"
          >
            Logout
          </NavLink>
        </div>
      )}

      <div className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
              : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
          }
        >
          <MdOutlineHome className="text-xl" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/surgeries"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
              : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
          }
        >
          <FaBars className="text-xl" />
          <span>Surgeries</span>
        </NavLink>

        <NavLink
          to="/patients"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
              : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
          }
        >
          <CiClock1 className="text-xl" />
          <span>Patients</span>
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
              : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
          }
        >
          <CiUser className="text-xl" />
          <span>Users</span>
        </NavLink>
      </div>

      <div className="mt-8 text-sm">
        <p className="text-gray-700 font-semibold">PROGRESS STEPS</p>
        <ul className="space-y-4 mt-2">
          <li className="flex flex-col items-start space-y-3">
            <div className="w-full flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 ease-in-out">
              <p className="w-3.5 h-3.5 bg-green-500 rounded-full" />
              <p className="text-gray-900 font-medium">Completed</p>
            </div>
            <div className="w-full flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 ease-in-out">
              <p className="w-3.5 h-3.5 bg-blue-500 rounded-full" />
              <p className="text-gray-900 font-medium">Diagnosis</p>
            </div>
            <div className="w-full flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 ease-in-out">
              <p className="w-3.5 h-3.5 bg-yellow-500 rounded-full" />
              <p className="text-gray-900 font-medium">
                Patient Injury Details
              </p>
            </div>
            <div className="w-full flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition-all duration-300 ease-in-out">
              <p className="w-3.5 h-3.5 bg-red-500 rounded-full" />
              <p className="text-gray-900 font-medium">
                Patient Surgical Details
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
