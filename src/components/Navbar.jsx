import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem("user"))?.is_admin === 1;

  const pathname = location.pathname;

  const Header = ({ title, button }) => (
    <>
      <div className="bg-white text-black p-4 flex justify-between items-center relative mt-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        {button}
      </div>
      <hr />
    </>
  );

  return (
    <>
      {pathname.startsWith("/dashboard") && (
        <Header
          title="Home"
          button={
            <Link
              to="/select"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none relative z-10"
            >
              Create Patient
            </Link>
          }
        />
      )}

      {pathname === "/patients/surgeries" && (
        <Header title="Surgeries" />
      )}

      {pathname === "/patients/follow-up" && (
        <Header title="Follow Up" />
      )}

      {pathname === "/add-hospital" && (
        <Header title="Hospitals" />
      )}

      {pathname === "/add-assistant" && (
        <Header title="Assistant Surgeons" />
      )}

      {pathname === "/profile" && (
        <Header title="Profile" />
      )}

      {pathname === "/create-surgery" && (
        <Header title="Create Patient" />
      )}

      {pathname === "/add-surgerical-details" && (
        <Header title="Add Surgical Details" />
      )}

      {pathname === "/patient-surgical-details" && (
        <Header title="Create Patient Surgical Details" />
      )}

      {pathname === "/patient-injury-details" && (
        <Header title="Create Patient Injury Details" />
      )}

      {pathname === "/diagnosis" && (
        <Header title="Create Diagnosis" />
      )}
    </>
  );
};

export default Navbar;
