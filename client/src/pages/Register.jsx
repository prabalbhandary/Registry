import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${URL}/register`, {
        name,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <title>Register - Nepal Ligament Registry</title>
      <section className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <article className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <header className="text-center mb-8">
            <Link to="/" className="text-3xl font-semibold text-blue-600">
              NL Registry
            </Link>
          </header>

          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Create an Account
            </h1>

            <section className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </section>

            <section className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </section>

            <section className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600 text-center justify-center text-xl" />
                ) : (
                  <FaEye className="text-gray-600 text-center justify-center text-xl" />
                )}
              </span>
            </section>

            <section className="mb-6 relative">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-600 text-center justify-center text-xl" />
                ) : (
                  <FaEye className="text-gray-600 text-center justify-center text-xl" />
                )}
              </span>
            </section>

            <section className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
              >
                CREATE ACCOUNT
              </button>
            </section>

            <footer className="text-center mt-6">
              <p className="text-sm text-gray-600">Already have an account?</p>
              <Link
                to="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login Here
              </Link>
            </footer>
          </form>
        </article>
      </section>
    </>
  );
};

export default Register;
