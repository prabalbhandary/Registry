import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../components/URL";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/login`, { email, password });
      if (res.status === 200) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <title>Log in - Trauma Registry</title>
      <section className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
        <article className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <header className="text-center mb-8">
            <Link to="/" className="block text-3xl font-bold text-blue-600">
              Trauma Registry
            </Link>
          </header>

          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Sign In to Trauma Registry
            </h1>

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
                Your Password
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
                  <FaEyeSlash className="text-gray-600 text-xl" />
                ) : (
                  <FaEye className="text-gray-600 text-xl" />
                )}
              </span>
            </section>

            <section className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <div>
                <Link
                  to="/forget-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Lost Password?
                </Link>
              </div>
            </section>

            <section className="mb-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
              >
                LOGIN TO YOUR ACCOUNT
              </button>
            </section>

            <footer className="text-center">
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Not registered? Create an account
              </Link>
            </footer>
          </form>
        </article>
      </section>
    </>
  );
};

export default Login;
