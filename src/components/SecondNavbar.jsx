import React from "react";
import { Link } from "react-router-dom";

const SecondNavbar = ({ completedIndex }) => {
  return (
    <nav className="flex justify-center py-4 space-x-8">
      <Link to="/create-surgery" className={completedIndex >= 0 ? "text-blue-600" : "text-gray-400"}>
        Step 1: Create Surgery
      </Link>
      <Link to="/add-surgerical-details" className={completedIndex >= 1 ? "text-blue-600" : "text-gray-400"}>
        Step 2: Add Surgical Details
      </Link>
      <Link to="/patient-surgical-details" className={completedIndex >= 2 ? "text-blue-600" : "text-gray-400"}>
        Step 3: Patient Surgical Details
      </Link>
      <Link to="/patient-injury-details" className={completedIndex >= 3 ? "text-blue-600" : "text-gray-400"}>
        Step 4: Patient Injury Details
      </Link>
    </nav>
  );
};

export default SecondNavbar;
