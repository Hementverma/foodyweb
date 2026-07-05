import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>

          <p className="text-gray-300 leading-7">
            This Website is Developed By{" "}
            <span className="font-semibold text-white">
              Hement Verma
            </span>
          </p>

          <p className="text-gray-400 mt-3 leading-7">
            Learn more about FoodyWeb and our mission to provide
            delicious food items.
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Follow Us</h2>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.facebook.com/?id=100057353183726&mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 p-3 rounded-full hover:scale-110 transition"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="https://x.com/paddy3003?t=jV5QNUif9RqNq-dhcj17VQ&s=09"
              target="_blank"
              rel="noreferrer"
              className="bg-sky-500 p-3 rounded-full hover:scale-110 transition"
            >
              <FaTwitter size={18} />
            </a>

            <a
              href="https://www.instagram.com/hement_verma70"
              target="_blank"
              rel="noreferrer"
              className="bg-pink-600 p-3 rounded-full hover:scale-110 transition"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="bg-blue-700 p-3 rounded-full hover:scale-110 transition"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="https://github.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="bg-gray-800 p-3 rounded-full hover:scale-110 transition"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="mailto:hementver2006@gmail.com"
              className="bg-red-500 p-3 rounded-full hover:scale-110 transition"
            >
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>

          <p className="text-gray-300 mb-2">
            Patnipura Main Road, Indore
          </p>

          <p className="text-gray-300 mb-2">
            Email: info@foodyweb.com
          </p>

          <p className="text-gray-300">
            Phone: +91-989-336-9932
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2022 <span className="font-semibold text-white">IndoriFood</span>,
            Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition"
            >
              Promotions
            </Link>

            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}