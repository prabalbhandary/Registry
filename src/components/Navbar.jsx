import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          {theme === "light" ? (
            <FaSun className="theme-toggle__icon theme-toggle__icon--sun" />
          ) : (
            <FaMoon className="theme-toggle__icon theme-toggle__icon--moon" />
          )}
        </span>
      </span>
    </button>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const Header = ({ title, button, showSearch = false }) => (
    <div className="navbar">
      <div className="navbar__inner">
        {/* Left: Title */}
        <div className="navbar__left">
          <h1 className="navbar__title">{title}</h1>
        </div>

        {/* Right: Actions */}
        <div className="navbar__right">
          {showSearch && (
            <div className="navbar__search">
              <FaSearch className="navbar__search-icon" />
              <input
                type="text"
                placeholder="Search..."
                className="navbar__search-input"
              />
            </div>
          )}

          <ThemeToggle />

          {button}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {pathname.startsWith("/dashboard") && (
        <Header
          title="Dashboard"
          showSearch={true}
          button={
            <Link to="/create-surgery" className="navbar__cta">
              <FaPlus />
              <span className="navbar__cta-label--full">Create Patient</span>
              <span className="navbar__cta-label--short">Create</span>
            </Link>
          }
        />
      )}
      {pathname === "/patients/surgeries" && <Header title="Surgeries" showSearch={true} />}
      {pathname === "/patients/follow-up" && <Header title="Follow Up" showSearch={true} />}
      {pathname === "/all-patients" && <Header title="All Patients" showSearch={true} />}
      {pathname === "/add-hospital" && <Header title="Add Hospital" />}
      {pathname === "/add-assistant" && <Header title="Add Assistant Surgeon" />}
      {pathname === "/assistants" && <Header title="Assistant Surgeons" showSearch={true} />}
      {pathname === "/hospitals" && <Header title="Hospitals" showSearch={true} />}
      {pathname === "/profile" && <Header title="My Profile" />}
      {pathname === "/create-surgery" && <Header title="Create Patient" />}
      {pathname === "/add-surgerical-details" && <Header title="Add Surgical Details" />}
      {pathname === "/patient-surgical-details" && <Header title="Patient Surgical Details" />}
      {pathname === "/patient-injury-details" && <Header title="Patient Injury Details" />}
      {pathname === "/diagnosis" && <Header title="Create Diagnosis" />}
      {pathname === "/users" && <Header title="Users Management" showSearch={true} />}
    </>
  );
};

export default Navbar;
