import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      toast.success("OTP Verified!");
      navigate("/reset-password");
    } else {
      toast.error("Please enter a valid OTP.");
    }
  };

  return (
    <>
      <title>Verify your OTP - Nepal Ligament Registry</title>
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Enter OTP
          </h2>
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-36 h-36" />
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus={index === 0}
                  placeholder="•"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 px-4 rounded-lg hover:bg-indigo-600 text-lg"
            >
              Verify OTP
            </button>
          </form>
          <p
            onClick={() => navigate("/forget-password")}
            className="mt-4 text-center text-sm text-gray-600"
          >
            Didn’t receive the code?{" "}
            <span className="text-indigo-500 cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OTP;
