import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <h1 className="text-blue-500 text-2xl font-semibold mb-2">Nepal Orthopedic Association</h1>
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-32 h-32 mb-4" />
      </Link>
      <h2 className="text-blue-500 text-2xl font-semibold mb-2">
      Trauma Registry
      </h2>
      <div className="space-x-4">
        {isAuthenticated ? (
          <Link to="/dashboard" className="underline">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login" className="underline">
              Login
            </Link>
            <Link to="/register" className="underline">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
