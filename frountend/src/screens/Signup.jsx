import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Urls";

export default function Signup() {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(`${baseUrl}/api/createuser`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();

      if (json.success) {

        alert("Account Created Successfully");

        navigate("/login");

      } else {

        alert("Enter Valid Credentials");
      }

    } catch (error) {

      console.error("Error:", error);

      alert("Something went wrong");
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
          'url("https://images.unsplash.com/photo-1707056924976-6b524806dbc9?q=80&w=681&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Register To FoodyWeb
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>

            <label className="block text-white font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter Name"
              className="w-full px-4 py-3 rounded-xl outline-none bg-white text-black shadow-md"
            />

          </div>

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

          {/* Address */}
          <div>

            <label className="block text-white font-medium mb-2">
              Address
            </label>

            <input
              type="text"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              placeholder="Enter Address"
              className="w-full px-4 py-3 rounded-xl outline-none bg-white text-black shadow-md"
            />

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300 font-semibold"
            >
              Register
            </button>

            <Link
              to="/login"
              className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition duration-300 font-semibold text-center"
            >
              Already User
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}