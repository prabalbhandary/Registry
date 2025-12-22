import React, { useState, useEffect, createContext, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronUp,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaHospital,
  FaUserMd,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdOutlineHome, MdLocalHospital } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiSurgicalMaskFill } from "react-icons/ri";
import { BiCalendarCheck } from "react-icons/bi";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "./URL";

// Create context for sidebar state
export const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

const Sidebar = () => {
  const [dropDownOpened, setDropDownOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem("user"))?.is_admin === 1;

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setDropDownOpened(false);
  }, [location.pathname]);

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
        localStorage.clear();
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const userInfo = JSON.parse(localStorage.getItem("user"));

  return (
    <SidebarContext.Provider value={{ menuOpen, setMenuOpen }}>
      {/* Full Screen Overlay - Covers everything including content */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg z-[60] fixed top-0 left-0 w-full">
        <div className="flex items-center space-x-3">
          <MdLocalHospital className="text-white text-3xl" />
          <h1
            onClick={() => navigate("/")}
            className="text-lg font-bold text-white cursor-pointer"
          >
            Trauma Registry
          </h1>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-[60]"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white z-[55] transition-transform duration-300 overflow-y-auto shadow-2xl mt-14 md:mt-0`}
      >
        {/* Desktop Logo */}
        <div className="hidden md:flex items-center space-x-3 p-6 border-b border-slate-700/50">
          <div className="bg-blue-500 p-2 rounded-lg">
            <MdLocalHospital className="text-white text-3xl" />
          </div>
          <div>
            <h1
              onClick={() => {
                navigate("/");
                setMenuOpen(false);
              }}
              className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
            >
              Trauma Registry
            </h1>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4">
          <div
            onClick={() => setDropDownOpened(!dropDownOpened)}
            className="flex items-center p-3 cursor-pointer hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 ml-3 min-w-0">
              <p className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                {userInfo?.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{userInfo?.email}</p>
            </div>
            <div className="ml-2">
              {dropDownOpened ? (
                <FaChevronUp className="text-slate-400 text-sm" />
              ) : (
                <FaChevronDown className="text-slate-400 text-sm" />
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropDownOpened && (
            <div className="mt-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 space-y-1 border border-slate-700/50 animate-fadeIn">
              <NavLink
                to="/add-hospital"
                onClick={() => {
                  setMenuOpen(false);
                  setDropDownOpened(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all"
              >
                <FaHospital className="text-blue-400" />
                <span>Add Hospital</span>
              </NavLink>
              <NavLink
                to="/add-assistant"
                onClick={() => {
                  setMenuOpen(false);
                  setDropDownOpened(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all"
              >
                <FaUserMd className="text-blue-400" />
                <span>Add Assistant</span>
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => {
                  setMenuOpen(false);
                  setDropDownOpened(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all"
              >
                <FaUserCircle className="text-blue-400" />
                <span>View Profile</span>
              </NavLink>
              <div className="my-2 border-t border-slate-700/50"></div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                  setDropDownOpened(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all w-full"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-2 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>

          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            }
          >
            <MdOutlineHome className="text-xl" />
            <span className="font-medium">Dashboard</span>
          </NavLink>

          {role && 
            (<NavLink
            to="/all-patients"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            }
          >
            <HiUsers className="text-xl" />
            <span className="font-medium">All Patients</span>
          </NavLink>)}

          <NavLink
            to="/patients/follow-up"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            }
          >
            <BiCalendarCheck className="text-xl" />
            <span className="font-medium">Follow Up</span>
          </NavLink>

          <NavLink
            to="/patients/surgeries"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
            }
          >
            <RiSurgicalMaskFill className="text-xl" />
            <span className="font-medium">Surgeries</span>
          </NavLink>

          {role && (
            <NavLink
              to="/users"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "flex items-center space-x-3 px-3 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all"
              }
            >
              <HiUsers className="text-xl" />
              <span className="font-medium">Users</span>
            </NavLink>
          )}
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/50">
          <div className="text-center">
            <p className="text-xs text-slate-500">Version 1.0.0</p>
            <p className="text-xs text-slate-600 mt-1">© 2024 Trauma Registry</p>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
