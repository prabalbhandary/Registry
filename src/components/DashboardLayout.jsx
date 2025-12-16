import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Pages
import Dashboard from "../pages/Dashboard";
import Surgeries from "../pages/Surgeries";
import Patients from "../pages/Patients";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Diagnosis from "../pages/Diagnosis";
import AddHospital from "../pages/AddHospital";
import AddAssistant from "../pages/AddAssistant";
import CreateSurgery from "../pages/CreateSurgery";
import CreatePatient from "../pages/CreatePatient";
import CreateUser from "../pages/CreateUser";
import PatientSurgicalDetails from "../pages/PatientSurgericalDetails";
import PatientInjuryDetails from "../pages/PatientInjuryDetails";
import AddSurgicalDetails from "../pages/AddSurgericalDetails";
import Assistants from "../pages/Assistants";
import Hospitals from "../pages/Hospitals";
import Clavicle from "./skeletonpart/upperlimb/Clavicle";
import Scapula from "./skeletonpart/upperlimb/Scapula";
import Humerus from "./skeletonpart/upperlimb/Humerus";
import RadiusAndUlna from "./skeletonpart/upperlimb/RadiusAndUlna";
import Hand from "./skeletonpart/upperlimb/Hand";
import Femur from "./skeletonpart/lowerlimb/Femur";
import TibiaAndFibula from "./skeletonpart/lowerlimb/TibiaAndFibula";
import Patella from "./skeletonpart/lowerlimb/Patella";
import Foot from "./skeletonpart/lowerlimb/Foot";
import SelectPage from "../pages/SelectPage";
import Surgery from "../pages/Surgery";
import FollowUp from "../pages/FollowUp";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5 fixed md:relative top-0 left-0 h-full z-10">
        <Sidebar />
      </div>
      <div className="w-full md:w-4/5 p-6 mt-8 md:mt-0 overflow-y-auto">
        <Navbar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients/surgeries" element={<Surgeries />} />
          <Route path="patients/follow-up" element={<Patients />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
          <Route path="diagnosis" element={<Diagnosis />} />
          <Route path="add-hospital" element={<AddHospital />} />
          <Route path="add-assistant" element={<AddAssistant />} />
          <Route path="create-surgery" element={<CreateSurgery />} />
          <Route path="create-patient" element={<CreatePatient />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="patient/:id/patient-surgical-details" element={<PatientSurgicalDetails />} />
          <Route path="patient-injury-detail" element={<PatientInjuryDetails />} />
          <Route path="add-surgerical-details" element={<AddSurgicalDetails />} />
          <Route path="assistants" element={<Assistants />} />
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="clavicle" element={<Clavicle />} />
          <Route path="scapula" element={<Scapula />} />
          <Route path="humerus" element={<Humerus />} />
          <Route path="radius_and_ulna" element={<RadiusAndUlna />} />
          <Route path="hand" element={<Hand />} />
          <Route path="femur" element={<Femur />} />
          <Route path="tibia_and_fibula" element={<TibiaAndFibula />} />
          <Route path="patella" element={<Patella />} />
          <Route path="foot" element={<Foot />} />
          <Route path="select" element={<SelectPage />} />
          <Route path="surgery" element={<Surgery />} />
          <Route path="followup/:id" element={<FollowUp />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
