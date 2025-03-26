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
import Dashboard from "./pages/Dashboard";
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

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token")

  return (
    <div className="flex">
      {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/forget-password" && location.pathname !== "/reset-password" && location.pathname !== "/otp" && location.pathname !== "/otp-resend" && (
        <div>
          <Sidebar />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/forget-password" && location.pathname !== "/reset-password" && location.pathname !== "/otp" && location.pathname !== "/otp-resend" && (
          <div className="p-4">
            <Navbar />
          </div>
        )}

        <div className="p-6 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/forget-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgetPassword />} />
            <Route path="/reset-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ResetPassword />} />
            <Route path="/otp" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTP />} />
            <Route path="/otp-resend" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTPResend />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/surgeries" element={isAuthenticated ? <Surgeries /> : <Navigate to="/login" />} />
            <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />
            <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
            <Route path="/create-surgery" element={isAuthenticated ? <CreateSurgery /> : <Navigate to="/login" />} />
            <Route path="/create-patient" element={isAuthenticated ? <CreatePatient /> : <Navigate to="/login" />} />
            <Route path="/create-user" element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />} />
            <Route path="/add-hospital" element={isAuthenticated ? <AddHospital /> : <Navigate to="/login" />} />
            <Route path="/add-assistant" element={isAuthenticated ? <AddAssistant /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/assistants" element={isAuthenticated ? <Assistants /> : <Navigate to="/login" />} />
            <Route path="/hospitals" element={isAuthenticated ? <Hospitals /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
