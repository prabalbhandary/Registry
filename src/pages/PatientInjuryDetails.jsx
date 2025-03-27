import React, { useState } from "react";
import SecondNavbar from "../components/SecondNavbar";
import { useLocation } from "react-router-dom";

const PatientInjuryDetails = () => {
  const location = useLocation();
  const [completedIndex, setCompletedIndex] = useState(
    location.state?.completedIndex || 1
  );
  return (
    <>
      <title>Add Patient Injury Details - Trauma Registry</title>
      <SecondNavbar completedIndex={completedIndex} />
      <section>
        <h1>Add Patient Injury Details</h1>
        <p>Add Patient Injury Details</p>
      </section>
      <section>
        <form>
          <div>
            <label htmlFor="">Duration of Injury</label>
          </div>
        </form>
      </section>
    </>
  );
};

export default PatientInjuryDetails;
