import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../components/URL";

const OTPResend = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendAllowed, setIsResendAllowed] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("otpEmail");

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendAllowed(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/send-otp`, { email: email });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">OTP Resend</h3>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-6 rounded-full mx-auto" />
        </Link>
        <div className="mb-6">
          {isResendAllowed ? (
            <button
              onClick={handleResendOTP}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-700 text-lg">
              Please wait {timeLeft} second{timeLeft !== 1 && "s"} before resending OTP.
            </p>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Need help? <Link to="/" className="text-blue-500 hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  );
};

export default OTPResend;
