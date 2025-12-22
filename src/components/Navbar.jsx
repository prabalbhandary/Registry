import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const Header = ({ title, button, showSearch = false }) => (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-4 lg:px-8">
        {/* Left: Title */}
        <div className="flex items-center space-x-4 flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            {title}
          </h1>
        </div>

        {/* Right: Search and Actions */}
        <div className="flex items-center space-x-3">
          {showSearch && (
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-gray-700 w-full"
              />
            </div>
          )}

          {/* Notifications */}
          {/*<button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaBell className="text-xl" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>*/}

          {/* Action Button */}
          {button}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {pathname.startsWith("/dashboard") && (
        <Header
          title="Dashboard"
          showSearch={true}
          button={
            <Link
              to="/select"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
            >
              <FaPlus />
              <span className="hidden sm:inline">Create Patient</span>
              <span className="sm:hidden">Create</span>
            </Link>
          }
        />
      )}

      {pathname === "/patients/surgeries" && (
        <Header title="Surgeries" showSearch={true} />
      )}
      {pathname === "/patients/follow-up" && (
        <Header title="Follow Up" showSearch={true} />
      )}
      {pathname === "/all-patients" && (
        <Header title="All Patients" showSearch={true} />
      )}
      {pathname === "/add-hospital" && <Header title="Add Hospital" />}
      {pathname === "/add-assistant" && <Header title="Add Assistant Surgeon" />}
      {pathname === "/assistants" && (
        <Header title="Assistant Surgeons" showSearch={true} />
      )}
      {pathname === "/hospitals" && <Header title="Hospitals" showSearch={true} />}
      {pathname === "/profile" && <Header title="My Profile" />}
      {pathname === "/create-surgery" && <Header title="Create Surgery" />}
      {pathname === "/add-surgerical-details" && (
        <Header title="Add Surgical Details" />
      )}
      {pathname === "/patient-surgical-details" && (
        <Header title="Patient Surgical Details" />
      )}
      {pathname === "/patient-injury-details" && (
        <Header title="Patient Injury Details" />
      )}
      {pathname === "/diagnosis" && <Header title="Create Diagnosis" />}
      {pathname === "/users" && <Header title="Users Management" showSearch={true} />}
    </>
  );
};

export default Navbar;
