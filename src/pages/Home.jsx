import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaChartLine, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src={Logo}
                alt="Nepal Orthopedic Association"
                className="w-14 h-14 object-contain transition-transform group-hover:scale-110 duration-300"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                  Nepal Orthopedic Association
                </h1>
                <p className="text-sm text-slate-600">Trauma Registry System</p>
              </div>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 text-slate-700 font-semibold hover:text-blue-600 transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center animate-[fadeIn_0.8s_ease-out]">
          {/* Logo Circle */}
          <div className="inline-block mb-8">
            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-3xl shadow-2xl p-6 border-4 border-blue-100">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Trauma Registry System
          </h1>

          <p className="text-xl lg:text-2xl text-slate-600 mb-4 max-w-3xl mx-auto font-medium">
            Nepal Orthopedic Association
          </p>

          <p className="text-lg lg:text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            Comprehensive patient care management, surgical tracking, and follow-up coordination for orthopedic trauma cases
          </p>

          {/* CTA Buttons */}
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg border-2 border-blue-600 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <Counter end={500} />+
              </div>
              <div className="text-slate-600 font-medium">Patients</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                <Counter end={50} />+
              </div>
              <div className="text-slate-600 font-medium">Surgeons</div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                <Counter end={10} />+
              </div>
              <div className="text-slate-600 font-medium">Hospitals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16 animate-[fadeIn_1s_ease-out]">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage trauma cases efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-[fadeIn_1.2s_ease-out]">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <FaUserMd className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Patient Management
            </h3>
            <p className="text-slate-600">
              Comprehensive patient record tracking with detailed medical history, injury documentation, and treatment progress monitoring.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <FaHospital className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Multi-Hospital
            </h3>
            <p className="text-slate-600">
              Seamlessly manage multiple hospital facilities, coordinate care across locations, and maintain centralized records.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <FaChartLine className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Analytics & Reports
            </h3>
            <p className="text-slate-600">
              Track surgical outcomes, monitor patient recovery, and generate detailed reports for better decision making.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Secure & Compliant
            </h3>
            <p className="text-slate-600">
              Enterprise-grade security with role-based access control, ensuring patient data privacy and regulatory compliance.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
              <FaClock className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Follow-up Tracking
            </h3>
            <p className="text-slate-600">
              Systematic follow-up scheduling and tracking to ensure continuous patient care and improved recovery outcomes.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <FaUsers className="text-3xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Team Collaboration
            </h3>
            <p className="text-slate-600">
              Coordinate with surgeons, assistants, and medical staff across departments for comprehensive patient care.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 lg:p-16 text-center shadow-2xl animate-[fadeIn_1.4s_ease-out]">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join Nepal Orthopedic Association's trauma registry system and streamline your patient care management today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg border-2 border-white/50 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 object-contain bg-white/10 rounded-xl p-2"
              />
              <div>
                <div className="font-bold text-lg">Nepal Orthopedic Association</div>
                <div className="text-slate-400 text-sm">Trauma Registry System</div>
              </div>
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              &copy; {new Date().getFullYear()} Nepal Orthopedic Association.<br className="sm:hidden" /> All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;