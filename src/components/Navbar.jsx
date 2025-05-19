import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  return (
    <>
      {location.pathname === "/dashboard" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Home</h2>

            <Link
              to="/select"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Create Patient
            </Link>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/surgeries" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Surgeries</h2>
            {/* <Link
              to="/create-surgery"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Create Surgery
            </Link> */}
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/patients" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Patients</h2>
            {/* <Link
              to="/create-patient"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Create Patient
            </Link> */}
          </div>
          <hr />
        </>
      )}
      {/* {location.pathname === "/users" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Users</h2>
            <Link
              to="/create-user"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
            >
              Create User
            </Link>
          </div>
          <hr />
        </>
      )} */}
      {location.pathname === "/add-hospital" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Hospitals</h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/add-assistant" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assistant Surgeons</h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/profile" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Profile</h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/create-surgery" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create Patient</h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/add-surgerical-details" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Add Surgerical Details</h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/patient-surgical-details" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Create Patient Surgical Details
            </h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/patient-injury-details" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Create Patient Injury Details
            </h2>
          </div>
          <hr />
        </>
      )}
      {location.pathname === "/diagnosis" && (
        <>
          <div className="bg-white text-black p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create Diagnosis</h2>
          </div>
          <hr />
        </>
      )}
    </>
  );
};

export default Navbar;
