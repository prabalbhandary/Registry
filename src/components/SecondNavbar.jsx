import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SecondNavbar = ({ completedIndex = 0 }) => {
  const [patientId, setPatientId] = useState(null);
  const { idFromRoute } = useParams(); // Using useParams for route-specific ID

  useEffect(() => {
    console.log("idFromRoute:", idFromRoute); // Log the route parameter
    // Try to get patientId from localStorage
    const patientData = localStorage.getItem("patientId");
    if (patientData) {
      console.log("Patient data from localStorage:", patientData); // Log data from localStorage
      setPatientId(JSON.parse(patientData).patientId); // Set patientId from localStorage
    } else if (idFromRoute) {
      console.log("Patient ID from route params:", idFromRoute); // Log route param
      setPatientId(idFromRoute); // Set from route params if available
    }
  }, [idFromRoute]); // This hook runs whenever idFromRoute changes

  const getStepClass = (step) => {
    if (completedIndex > step) {
      return "text-blue-600 bg-blue-800 text-white px-4 py-4 rounded-full";
    } else if (completedIndex === step) {
      return "text-blue-800 bg-white border border-blue-800 px-4 py-4 rounded-full";
    } else {
      return "text-gray-400 border border-gray-400 px-4 py-4 rounded-full";
    }
  };

  // Show loading only if patientId is not set and completedIndex > 0
  if (completedIndex > 0 && !patientId) {
    return <div>Loading...</div>; // Optional: handle case when patientId is still not available and it's needed
  }

  return (
    <nav className="flex justify-center py-4 space-x-8">
      {/* Step 1 does not need patientId */}
      <Link to="/create-surgery" className="flex items-center space-x-2">
        <span className={getStepClass(0)}>1</span>
        <span>Create Surgery</span>
      </Link>

      {/* Step 2 onwards need patientId */}
      {patientId && (
        <>
          <Link to={`/add-surgerical-details/${patientId}`} className="flex items-center space-x-2">
            <span className={getStepClass(1)}>2</span>
            <span>Add Surgical Details</span>
          </Link>
          <Link to={`/patient-surgical-details/${patientId}`} className="flex items-center space-x-2">
            <span className={getStepClass(2)}>3</span>
            <span>Patient Surgical Details</span>
          </Link>
          <Link to={`/patient-injury-details/${patientId}`} className="flex items-center space-x-2">
            <span className={getStepClass(3)}>4</span>
            <span>Patient Injury Details</span>
          </Link>
          <Link to={`/diagnosis/${patientId}`} className="flex items-center space-x-2">
            <span className={getStepClass(4)}>5</span>
            <span>Diagnosis</span>
          </Link>
        </>
      )}
    </nav>
  );
};

export default SecondNavbar;
