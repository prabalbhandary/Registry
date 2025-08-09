import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import OTP from "./pages/OTP";
import OTPResend from "./pages/OTPResend";
import Terms from "./pages/Terms";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.is_admin === 1;
  return isAuthenticated && isAdmin ? children : <Navigate to="/login" replace />;
};

const authPages = [
  { path: "/dashboard", element: <DashboardLayout /> },
  { path: "/surgeries", element: <DashboardLayout /> },
  { path: "/patients", element: <DashboardLayout /> },
  { path: "/create-surgery", element: <DashboardLayout /> },
  { path: "/add-surgerical-details", element: <DashboardLayout /> },
  { path: "/patient/:id/patient-surgical-details", element: <DashboardLayout /> },
  { path: "/patient-injury-details", element: <DashboardLayout /> },
  { path: "/diagnosis", element: <DashboardLayout /> },
  { path: "/create-patient", element: <DashboardLayout /> },
  { path: "/create-user", element: <DashboardLayout /> },
  { path: "/add-hospital", element: <DashboardLayout /> },
  { path: "/add-assistant", element: <DashboardLayout /> },
  { path: "/profile", element: <DashboardLayout /> },
  { path: "/assistants", element: <DashboardLayout /> },
  { path: "/hospitals", element: <DashboardLayout /> },
  { path: "/clavicle", element: <DashboardLayout /> },
  { path: "/scapula", element: <DashboardLayout /> },
  { path: "/humerus", element: <DashboardLayout /> },
  { path: "/radius_and_ulna", element: <DashboardLayout /> },
  { path: "/hand", element: <DashboardLayout /> },
  { path: "/femur", element: <DashboardLayout /> },
  { path: "/tibia_and_fibula", element: <DashboardLayout /> },
  { path: "/patella", element: <DashboardLayout /> },
  { path: "/foot", element: <DashboardLayout /> },
  { path: "/select", element: <DashboardLayout /> },
  { path: "/surgery", element: <DashboardLayout /> },
  { path: "/followup/:id", element: <DashboardLayout /> },
];

const adminPages = [
  { path: "/users", element: <DashboardLayout /> },
];

const App = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRedirect><Login /></LoginRedirect>} />
      <Route path="/register" element={<LoginRedirect><Register /></LoginRedirect>} />
      <Route path="/forget-password" element={<LoginRedirect><ForgetPassword /></LoginRedirect>} />
      <Route path="/reset-password" element={<LoginRedirect><ResetPassword /></LoginRedirect>} />
      <Route path="/otp" element={<LoginRedirect><OTP /></LoginRedirect>} />
      <Route path="/otp-resend" element={<LoginRedirect><OTPResend /></LoginRedirect>} />
      <Route path="/terms" element={<Terms />} />

      {/* Private Routes */}
      {authPages.map(({ path, element }) => (
        <Route key={path} path={path} element={<PrivateRoute>{element}</PrivateRoute>} />
      ))}

      {/* Admin Routes */}
      {adminPages.map(({ path, element }) => (
        <Route key={path} path={path} element={<AdminRoute>{element}</AdminRoute>} />
      ))}
    </Routes>
  </Router>
);

// Redirect logged-in users away from login/register
const LoginRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default App;
