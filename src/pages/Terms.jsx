import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AppContext } from "../context/AppContext";

const Terms = () => {
  const { token } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src={Logo}
                alt="Nepal Orthopedic Association"
                className="w-14 h-14 object-contain transition-transform group-hover:scale-150 duration-1000"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-800 leading-tight">
                  Nepal Orthopedic Association
                </h1>
                <p className="text-sm text-slate-600">
                  Trauma Registry System
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              {token ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Terms Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-200 p-8 md:p-12">

          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Terms & Conditions
          </h1>

          <p className="text-slate-500 mb-10">
            Last Updated: January 2024
          </p>

          {/* Section 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              1. Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms and Conditions govern the use of the Nepal Orthopedic
              Association Trauma Registry System. By accessing or using this
              platform, you agree to comply with these terms. If you do not
              agree, you must discontinue use of the system.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              2. Authorized Use
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              This system is intended solely for authorized medical professionals
              and affiliated healthcare institutions. Users agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete patient information.</li>
              <li>Maintain confidentiality of login credentials.</li>
              <li>Access data only for legitimate medical purposes.</li>
              <li>Comply with applicable healthcare regulations.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              3. Data Privacy & Security
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Patient information stored within the Trauma Registry System is
              treated as confidential. We implement appropriate technical and
              organizational measures to protect data from unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              4. User Responsibilities
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Users are responsible for ensuring data accuracy and maintaining
              compliance with institutional policies. Misuse of the platform,
              including falsification of records or unauthorized data sharing,
              may result in suspension or permanent termination of access.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              5. Limitation of Liability
            </h2>
            <p className="text-slate-600 leading-relaxed">
              The Nepal Orthopedic Association shall not be liable for damages
              arising from incorrect data entry, system interruptions, or
              security breaches resulting from user negligence.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              6. Changes to Terms
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Continued
              use of the system after updates constitutes acceptance of the
              revised Terms and Conditions.
            </p>
          </div>
        </div>
      </section>

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
                <div className="font-bold text-lg">
                  Nepal Orthopedic Association
                </div>
                <div className="text-slate-400 text-sm">
                  Trauma Registry System
                </div>
              </div>
            </div>
            <div className="text-slate-400 text-sm text-center md:text-right">
              © 2024 Nepal Orthopedic Association.<br className="sm:hidden" />
              All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
