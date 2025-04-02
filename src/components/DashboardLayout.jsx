import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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
import Elbow from "./skeletonpart/upperlimb/Elbow";
import RadiusAndUlna from "./skeletonpart/upperlimb/RadiusAndUlna";
import Hand from "./skeletonpart/upperlimb/Hand";
import Pelvis from "./skeletonpart/lowerlimb/Pelvis";
import Acetabulum from "./skeletonpart/lowerlimb/Acetabulum";
import Femur from "./skeletonpart/lowerlimb/Femur";
import TibiaAndFibula from "./skeletonpart/lowerlimb/TibiaAndFibula";
import Patella from "./skeletonpart/lowerlimb/Patella";
import Foot from "./skeletonpart/lowerlimb/Foot";

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <>
      <title>
        {location.pathname === "/dashboard"
          ? "Dashboard - Trauma Registry"
          : location.pathname === "/surgeries"
          ? "Surgeries - Trauma Registry"
          : location.pathname === "/patients"
          ? "Patients - Trauma Registry"
          : location.pathname === "/users"
          ? "Users - Trauma Registry"
          : location.pathname === "/create-surgery"
          ? "Create Surgery - Trauma Registry"
          : location.pathname === "/add-surgical-details/:id"
          ? "Create Surgery Details - Trauma Registry"
          : location.pathname === "/patient/:id/patient-surgical-details"
          ? "Create Patient Surgical Details - Trauma Registry"
          : location.pathname === "/patient-injury-detail"
          ? "Patient Injury Details - Trauma Registry"
          : location.pathname === "/diagnosis"
          ? "Diagnosis - Trauma Registry"
          : location.pathname === "/create-patient"
          ? "Create Patient - Trauma Registry"
          : location.pathname === "/create-user"
          ? "Create User - Trauma Registry"
          : location.pathname === "/add-hospital"
          ? "Add Hospital - Trauma Registry"
          : location.pathname === "/add-assistant"
          ? "Add Assistant - Trauma Registry"
          : location.pathname === "/profile"
          ? "Profile - Trauma Registry"
          : location.pathname === "/assistants"
          ? "Assistants - Trauma Registry"
          : location.pathname === "/hospitals"
          ? "Hospitals - Trauma Registry"
          : location.pathname === "/clavicle"
          ? "Clavicle - Trauma Registry"
          : location.pathname === "/scapula"
          ? "Scapula - Trauma Registry"
          : location.pathname === "/humerus"
          ? "Humerus - Trauma Registry"
          : location.pathname === "/elbow"
          ? "Elbow - Trauma Registry"
          : location.pathname === "/radius_and_elna"
          ? "Radius & Ulna - Trauma Registry"
          : location.pathname === "/hand"
          ? "Hand - Trauma Registry"
          : location.pathname === "/pelvis"
          ? "Pelvis - Trauma Registry"
          : location.pathname === "/acetabulum"
          ? "Acetabulum - Trauma Registry"
          : location.pathname === "/femur"
          ? "Femur - Trauma Registry"
          : location.pathname === "/tibia_and_fibula"
          ? "Tibia & Fibula - Trauma Registry"
          : location.pathname === "/patella"
          ? "Patella - Trauma Registry"
          : location.pathname === "/foot"
          ? "Foot - Trauma Registry"
          : "Trauma Registry"}
      </title>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 fixed md:relative top-0 left-0 h-full bg-gray-800 z-10">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5 p-6 overflow-y-auto">
          <Navbar />
          <div>
            {location.pathname === "/dashboard" && <Dashboard />}
            {location.pathname === "/surgeries" && <Surgeries />}
            {location.pathname === "/patients" && <Patients />}
            {location.pathname === "/users" && <Users />}
            {location.pathname === "/profile" && <Profile />}
            {location.pathname === "/diagnosis" && <Diagnosis />}
            {location.pathname === "/add-hospital" && <AddHospital />}
            {location.pathname === "/add-assistant" && <AddAssistant />}
            {location.pathname === "/create-surgery" && <CreateSurgery />}
            {location.pathname === "/create-patient" && <CreatePatient />}
            {location.pathname === "/create-user" && <CreateUser />}
            {location.pathname === "/patient/:id/patient-surgical-details" && <PatientSurgicalDetails />}
            {location.pathname === "/patient-injury-detail" && <PatientInjuryDetails />}
            {location.pathname === "/add-surgical-details/:id" && <AddSurgicalDetails />}
            {location.pathname === "/assistants" && <Assistants />}
            {location.pathname === "/hospitals" && <Hospitals />}
            {location.pathname === "/clavicle" && <Clavicle />}
            {location.pathname === "/scapula" && <Scapula />}
            {location.pathname === "/humerus" && <Humerus />}
            {location.pathname === "/elbow" && <Elbow />}
            {location.pathname === "/radius_and_elna" && <RadiusAndUlna />}
            {location.pathname === "/hand" && <Hand />}
            {location.pathname === "/pelvis" && <Pelvis />}
            {location.pathname === "/acetabulum" && <Acetabulum />}
            {location.pathname === "/femur" && <Femur />}
            {location.pathname === "/tibia_and_fibula" && <TibiaAndFibula />}
            {location.pathname === "/patella" && <Patella />}
            {location.pathname === "/foot" && <Foot />}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
