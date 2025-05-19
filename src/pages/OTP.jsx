import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { URL } from "../components/URL";
import axios from "axios";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("otpEmail"));

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const res = await axios.post(`${URL}/verify-otp`, {
        otp: otpValue,
        email,
      });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <>
      <title>Verify your OTP - Trauma Registry</title>
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
          <p className="mt-4 text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <span
              onClick={() => navigate("/otp-resend")}
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OTP;
