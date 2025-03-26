import React, { useState } from 'react'
import SecondNavbar from '../components/SecondNavbar'
import skeleton from '../assets/skeleton.png'

const PatientInjuryDetails = () => {
    const [completedIndex, setCompletedIndex] = useState(null);
  return (
    <>
        <title>Add Patient Injury Details - Trauma Registry</title>
        <SecondNavbar completedIndex={completedIndex} />
        <section>
            <h1>Add Patient Injury Details</h1>
            <p>Add Patient Injury Details</p>
            <div>
                <img src={skeleton} alt="skeleton" />
            </div>
        </section>
        <section>
            <form>
                <div>
                    <label htmlFor="">Duration of Injury</label>
                </div>
            </form>
        </section>
    </>
  )
}

export default PatientInjuryDetails