import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../components/URL";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/send-otp`, { email });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("otpEmail", email);
        navigate("/otp");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <title>Forget Password - Trauma Registry</title>
      <section className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-gray-800">
            Forget Password
          </h1>
          <header className="text-center mb-6">
            <Link to="/">
              <img
                src={Logo}
                alt="NL Registry Logo"
                className="w-32 h-32 mx-auto mb-4"
              />
            </Link>
          </header>

          <section className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Forgot your password? No problem. Just let us know your email
              address, and we will email you a password reset link that will
              allow you to choose a new one.
            </p>
          </section>

          <form onSubmit={handleSubmit}>
            <section className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter your email address"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </section>

            <section className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
              >
                EMAIL PASSWORD RESET OTP
              </button>
            </section>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
