import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import Surgeries from "./pages/Surgeries";
import Patients from "./pages/Patients";
import Users from "./pages/Users";
import CreateSurgery from "./pages/CreateSurgery";
import CreatePatient from "./pages/CreatePatient";
import CreateUser from "./pages/CreateUser";
import AddHospital from "./pages/AddHospital";
import AddAssistant from "./pages/AddAssistant";
import Profile from "./pages/Profile";
import Assistants from "./pages/Assistants";
import Hospitals from "./pages/Hospitals";
import ResetPassword from "./pages/ResetPassword";
import OTP from "./pages/OTP";
import OTPResend from "./pages/OTPResend";
import AddSurgericalDetails from "./pages/AddSurgericalDetails";
import PatientSurgericalDetails from "./pages/PatientSurgericalDetails";
import PatientInjuryDetails from "./pages/PatientInjuryDetails";
import Diagnosis from "./pages/Diagnosis";
import Clavicle from "./components/skeletonpart/upperlimb/Clavicle";
import Scapula from "./components/skeletonpart/upperlimb/Scapula";
import Humerus from "./components/skeletonpart/upperlimb/Humerus";
import RadiusAndUlna from "./components/skeletonpart/upperlimb/RadiusAndUlna";
import Hand from "./components/skeletonpart/upperlimb/Hand";
import Femur from "./components/skeletonpart/lowerlimb/Femur";
import TibiaAndFibula from "./components/skeletonpart/lowerlimb/TibiaAndFibula";
import Patella from "./components/skeletonpart/lowerlimb/Patella";
import Foot from "./components/skeletonpart/lowerlimb/Foot";
import DashboardLayout from "./components/DashboardLayout";
import Terms from "./pages/Terms";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");

  const role = JSON.parse(localStorage.getItem("user"))?.is_admin === 1;

  return (
    <div className="flex">
      {/* {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/forget-password" && location.pathname !== "/reset-password" && location.pathname !== "/otp" && location.pathname !== "/otp-resend" && (
        <div>
          <Sidebar />
        </div>
      )} */}

      <div className="flex-1 flex flex-col">
        {/* {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/forget-password" && location.pathname !== "/reset-password" && location.pathname !== "/otp" && location.pathname !== "/otp-resend" && (
          <div className="p-4">
            <Navbar />
          </div>
        )} */}

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/forget-password"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <ForgetPassword />
                )
              }
            />
            <Route
              path="/reset-password"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <ResetPassword />
                )
              }
            />
            <Route
              path="/otp"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTP />}
            />
            <Route
              path="/otp-resend"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <OTPResend />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/surgeries"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/patients"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/users"
              element={
                role && isAuthenticated ? (
                  <DashboardLayout />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/create-surgery"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-surgerical-details"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/patient/:id/patient-surgical-details"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/patient-injury-details"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/diagnosis"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/create-patient"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/create-user"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-hospital"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/add-assistant"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/assistants"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/hospitals"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/clavicle"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/scapula"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/humerus"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/radius_and_ulna"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/hand"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/femur"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tibia_and_fibula"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/patella"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/foot"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/select"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/surgery"
              element={
                isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
              }
            />
            {/* <Route path="/terms" element={isAuthenticated ? <Terms /> : <Navigate to="/dashboard" />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
