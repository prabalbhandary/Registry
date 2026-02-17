import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import OTP from "./pages/OTP";
import OTPResend from "./pages/OTPResend";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.is_admin === 1;
  return isAuthenticated && isAdmin ? children : <Navigate to="/login" replace />;
};

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
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Authenticated Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

const LoginRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export default App;
