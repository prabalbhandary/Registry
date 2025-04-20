import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { FaChevronUp, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { CiUser, CiClock1 } from "react-icons/ci";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "./URL";

const Sidebar = () => {
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle
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
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-gray-300">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-gray-800"
        >
          Trauma Registry
        </h1>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:block fixed top-0 left-0 h-screen w-64 p-6 bg-gray-300 text-black z-40 transition-all duration-300`}
      >
        <h1
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
          className="text-2xl font-semibold text-gray-800 mb-6 cursor-pointer hidden md:block"
        >
          Trauma Registry
        </h1>

        {/* User Info & Dropdown */}
        <div
          onClick={() => setDropDownOpened(!dropDownOpened)}
          className="flex items-center mb-4 cursor-pointer hover:bg-gray-400 p-2 rounded-lg"
        >
          <img
            src={user}
            alt="User"
            className="w-12 h-12 rounded-full mr-4 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {userInfo?.name}
            </p>
            <p className="text-sm text-gray-600 truncate">{userInfo?.email}</p>
          </div>
          <div className="ml-auto pl-2">
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
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
            >
              Add Hospital
            </NavLink>
            <NavLink
              to="/add-assistant"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
            >
              Add Assistant
            </NavLink>
            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-800 hover:bg-gray-500 hover:text-white rounded p-2"
            >
              View Profile
            </NavLink>
            <hr className="my-2 border-gray-600" />
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block text-sm text-red-500 hover:text-red-400 p-2 rounded"
            >
              Logout
            </button>
          </div>
        )}

        {/* Main Navigation */}
        <div className="space-y-4">
          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
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
            onClick={() => setMenuOpen(false)}
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
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
                : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
            }
          >
            <CiClock1 className="text-xl" />
            <span>Patients</span>
          </NavLink>

          {/* <NavLink
            to="/users"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-4 p-3 rounded-lg bg-gray-500 text-white"
                : "flex items-center space-x-4 p-3 rounded-lg text-gray-800 hover:bg-gray-400 hover:text-black"
            }
          >
            <CiUser className="text-xl" />
            <span>Users</span>
          </NavLink> */}
        </div>

        {/* Progress Section */}
        <div className="mt-8 text-sm">
          <p className="text-gray-700 font-semibold">PROGRESS STEPS</p>
          <ul className="space-y-4 mt-2">
            <li className="flex flex-col items-start space-y-3">
              <div className="w-full flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
                <p className="w-3.5 h-3.5 bg-green-500 rounded-full" />
                <p className="text-gray-900 font-medium">Completed</p>
              </div>
              <div className="w-full flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
                <p className="w-3.5 h-3.5 bg-blue-500 rounded-full" />
                <p className="text-gray-900 font-medium">Diagnosis</p>
              </div>
              <div className="w-full flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
                <p className="w-3.5 h-3.5 bg-yellow-500 rounded-full" />
                <p className="text-gray-900 font-medium">
                  Patient Injury Details
                </p>
              </div>
              <div className="w-full flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
                <p className="w-3.5 h-3.5 bg-red-500 rounded-full" />
                <p className="text-gray-900 font-medium">
                  Patient Surgical Details
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
