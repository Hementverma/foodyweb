import React from "react";
import ReactDom from "react-dom";
import { FiX } from "react-icons/fi";

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(

    <>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

        <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
          >
            <FiX size={24} />
          </button>

          {/* Modal Content */}
          <div className="mt-6">
            {children}
          </div>

        </div>

      </div>

    </>,

    document.getElementById("cart-root")
  );
}