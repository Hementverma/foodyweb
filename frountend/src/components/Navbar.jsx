import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import { FiLogOut } from "react-icons/fi";
import { cartIconRef } from "./cartAnimationRef";

function LogoutConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="mt-3 bg-white p-4 rounded-lg shadow-md absolute right-5 top-16 z-50">
      <p className="font-semibold text-gray-800 mb-3">
        Are You Sure You Want To Logout?
      </p>

      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
        onClick={onConfirm}
      >
        Yes
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
}

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const navigate = useNavigate();
  const data = useCart();

  const handleLogout = () => setShowLogoutConfirmation(true);

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const cancelLogout = () => setShowLogoutConfirmation(false);

  return (
    <nav className="bg-gradient-to-r from-amber-400 to-gray-400 text-black shadow-md">
      <div className="max-w-11xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-6xl italic font-bold tracking-wide">
          FoodyWeb
        </h1>

        {/* LINKS */}
        <div className="flex gap-6 text-xl font-semibold">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          {localStorage.getItem("authToken") && (
            <Link to="/myOrder" className="hover:text-white transition">
              My Orders
            </Link>
          )}
        </div>

        {/* AUTH BUTTONS */}
        {!localStorage.getItem("authToken") ? (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/createuser"
              className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
            >
              SignUp
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 relative">

            {/* 🛒 CART BUTTON (ANIMATION READY) */}
            <button
              ref={cartIconRef}
              className="bg-white text-black px-4 py-2.5 rounded-2xl font-medium hover:bg-gray-100 transition flex items-center gap-2"
              onClick={() => setCartView(true)}
            >
              🛒 My Cart
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-sm font-bold">
                {data.length}
              </span>
            </button>

            {/* MODAL */}
            {cartView && (
              <Modal onClose={() => setCartView(false)}>
                <Cart />
              </Modal>
            )}

            {/* LOGOUT */}
            <button
              className="bg-white px-4 py-2 rounded-2xl font-medium hover:bg-gray-100 flex items-center gap-2 transition"
              onClick={handleLogout}
            >
              <FiLogOut className="text-black text-lg" />
              <span className="text-black">Logout</span>
            </button>

            {/* CONFIRM BOX */}
            {showLogoutConfirmation && (
              <LogoutConfirmation
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
}