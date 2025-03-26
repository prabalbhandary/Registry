import React, { useState } from 'react'
import SecondNavbar from '../components/SecondNavbar'
import { useLocation } from 'react-router-dom';

const Diagnosis = () => {
    const location = useLocation();
  const [completedIndex, setCompletedIndex] = useState(location.state?.completedIndex || 1);
  return (
    <>
        <title>Diagnosis - Trauma Registry</title>
        <SecondNavbar completedIndex={4} />
    </>
  )
}

export default Diagnosis