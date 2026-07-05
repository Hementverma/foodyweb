import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Urls";

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(`${baseUrl}/api/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid response from server");
      }

      const json = await response.json();

      if (!json.success) {

        alert("Enter Valid Credentials");

      } else {

        localStorage.setItem("userEmail", credentials.email);

        localStorage.setItem("authToken", json.authToken);

        navigate("/");
      }

    } catch (error) {

      console.error("Error:", error);

      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (event) => {

    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (

    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          'url("https://e1.pxfuel.com/desktop-wallpaper/937/414/desktop-wallpaper-backgrounds-professional-business-backgrounds-professional-webpage.jpg")',
      }}
    >

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Login To FoodyWeb
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>

            <label className="block text-white font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-xl outline-none bg-white text-black shadow-md"
            />

            <p className="text-sm text-gray-200 mt-2">
              We'll never share your email with anyone else.
            </p>

          </div>

          {/* Password */}
          <div>

            <label className="block text-white font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-xl outline-none bg-white text-black shadow-md"
            />

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300 font-semibold"
            >
              Login
            </button>

            <Link
              to="/createuser"
              className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition duration-300 font-semibold text-center"
            >
              New User
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}