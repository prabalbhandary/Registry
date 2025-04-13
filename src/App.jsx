import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import OTP from "./pages/OTP";
import OTPResend from "./pages/OTPResend";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forget-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgetPassword />} />
            <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ResetPassword />} />
            <Route path="/otp" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTP />} />
            <Route path="/otp-resend" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTPResend />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/surgeries" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/patients" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/users" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/create-surgery" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/add-surgerical-details/:id" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/patient/:id/patient-surgical-details" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/patient-injury-details" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/diagnosis" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/create-patient" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/create-user" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/add-hospital" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/add-assistant" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/assistants" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/hospitals" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/clavicle" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/scapula" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/humerus" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/elbow" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/radius_and_ulna" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/hand" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/pelvis" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/acetabulum" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/femur" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/tibia_and_fibula" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/patella" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
            <Route path="/foot" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
