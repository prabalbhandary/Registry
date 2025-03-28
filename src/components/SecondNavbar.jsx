import React from "react";
import { Link } from "react-router-dom";

const SecondNavbar = ({ completedIndex = 0 }) => {
  const getStepClass = (step) => {
    if (completedIndex > step) {
      return "text-blue-600 bg-blue-800 text-white px-4 py-4 rounded-full";
    } else if (completedIndex === step) {
      return "text-blue-800 bg-white border border-blue-800 px-4 py-4 rounded-full";
    } else {
      return "text-gray-400 border border-gray-400 px-4 py-4 rounded-full";
    }
  };

  return (
    <nav className="flex justify-center py-4 space-x-8">
      <Link to="/create-surgery" className="flex items-center space-x-2">
        <span className={getStepClass(0)}>1</span>
        <span>Create Surgery</span>
      </Link>
      <Link to="/add-surgerical-details" className="flex items-center space-x-2">
        <span className={getStepClass(1)}>2</span>
        <span>Add Surgical Details</span>
      </Link>
      <Link to="/patient-surgical-details" className="flex items-center space-x-2">
        <span className={getStepClass(2)}>3</span>
        <span>Patient Surgical Details</span>
      </Link>
      <Link to="/patient-injury-details" className="flex items-center space-x-2">
        <span className={getStepClass(3)}>4</span>
        <span>Patient Injury Details</span>
      </Link>
      <Link to="/diagnosis" className="flex items-center space-x-2">
        <span className={getStepClass(4)}>5</span>
        <span>Diagnosis</span>
      </Link>
    </nav>
  );
};

export default SecondNavbar;
