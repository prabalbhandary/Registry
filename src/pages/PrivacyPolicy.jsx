import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
                <p className="text-sm text-slate-600">
                  Trauma Registry System
                </p>
              </div>
            </Link>

            <Link
              to="/"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Privacy Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-12">
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-8 text-center">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-slate-600 leading-relaxed">

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                1. Introduction
              </h2>
              <p>
                The Nepal Orthopedic Association Trauma Registry System is
                committed to protecting the privacy and confidentiality of
                patient and user information. This Privacy Policy outlines how
                we collect, use, store, and safeguard your data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Patient demographic information</li>
                <li>Medical history and injury documentation</li>
                <li>Surgical details and treatment outcomes</li>
                <li>User account credentials and activity logs</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                3. How We Use Information
              </h2>
              <p>
                Collected information is used strictly for patient care
                coordination, clinical research, reporting, analytics, and
                system improvement. We do not sell or share personal data for
                commercial purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                4. Data Security
              </h2>
              <p>
                We implement industry-standard security measures including
                encrypted data transmission, secure authentication, and
                role-based access control to protect sensitive medical
                information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                5. Data Sharing
              </h2>
              <p>
                Patient information may only be shared with authorized medical
                professionals and institutions involved in patient care or
                approved research initiatives in compliance with applicable
                regulations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                6. Your Rights
              </h2>
              <p>
                Users have the right to access, update, or request correction
                of their personal information. For any privacy-related concerns,
                please contact the Nepal Orthopedic Association.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                7. Policy Updates
              </h2>
              <p>
                This Privacy Policy may be updated periodically. Continued use
                of the system constitutes acceptance of any revisions.
              </p>
            </div>

            <div className="text-sm text-slate-500 pt-6 border-t border-slate-200">
              Last updated: January 2024
            </div>

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

export default PrivacyPolicy;
