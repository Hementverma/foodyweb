import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { cartIconRef } from "./cartAnimationRef";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const priceRef = useRef();
  const imgRef = useRef();

  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [toast, setToast] = useState(false);

  const rating = props.foodItem.rating || 4.5;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  // 🛒 Fly Animation
  const flyToCart = () => {
    if (!imgRef.current || !cartIconRef.current) return;

    const imgRect = imgRef.current.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    const flying = imgRef.current.cloneNode(true);

    flying.style.position = "fixed";
    flying.style.left = imgRect.left + "px";
    flying.style.top = imgRect.top + "px";
    flying.style.width = "100px";
    flying.style.height = "100px";
    flying.style.borderRadius = "12px";
    flying.style.zIndex = 9999;
    flying.style.transition = "all 3s ease";
    flying.style.pointerEvents = "none";

    document.body.appendChild(flying);

    setTimeout(() => {
      flying.style.left = cartRect.left + "px";
      flying.style.top = cartRect.top + "px";
      flying.style.width = "20px";
      flying.style.height = "20px";
      flying.style.opacity = "0.2";
    }, 50);

    setTimeout(() => flying.remove(), 900);
  };

  const handleAddToCart = () => {
    const finalPrice = qty * parseInt(options[size], 10);

    const existingItem = data.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty,
        size,
      });
    } else {
      dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: props.foodItem.img,
      });
    }

    flyToCart();

    setToast(true);
    setTimeout(() => setToast(false), 1200);
  };

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  return (
    <div className="mt-6 flex justify-center relative">

      {/* TOAST */}
      {toast && (
        <div className="absolute top-2 z-20 bg-black text-white px-4 py-2 rounded-xl shadow-xl animate-bounce">
          Added to cart ✅
        </div>
      )}

      {/* CARD */}
      <div
        className="group w-72 rounded-3xl overflow-hidden
                   bg-white/10 backdrop-blur-lg border border-white/20
                   transition-all duration-500 hover:scale-105
                   hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >

        {/* IMAGE */}
        <div className="overflow-hidden relative">
          <img
            ref={imgRef}
            src={props.foodItem.img}
            alt="food"
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* STATE TAG */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/50 backdrop-blur-md">
            {props.foodItem.state}
          </div>
        </div>

        {/* BODY */}
        <div className="p-5 bg-gradient-to-br from-orange-50 via-white to-red-50">

          {/* RATING */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative w-5 h-5">

                <svg
                  className="absolute w-5 h-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.042 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                </svg>

                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{
                    width:
                      i <= fullStars
                        ? "100%"
                        : i === fullStars + 1 && hasHalf
                        ? "50%"
                        : "0%",
                  }}
                >
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.042 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                  </svg>
                </div>
              </div>
            ))}

            <span className="text-sm text-gray-700 ml-2 font-semibold">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* FOOD NAME */}
          <h2 className="text-xl font-bold text-gray-800">
            {props.foodItem.name}
          </h2>

          {/* STATE */}
          <p className="text-sm text-gray-500 mb-4">
            Famous food from {props.foodItem.state}
          </p>

          {/* CONTROLS */}
          <div className="flex items-center justify-between gap-2">

            <select
              ref={priceRef}
              className="px-3 py-2 rounded-xl text-white
                         bg-gradient-to-r from-orange-500 to-red-500
                         outline-none"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="text-lg font-bold text-red-600">
              ₹{size ? qty * parseInt(options[size], 10) : 0}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-5 py-3 rounded-2xl text-white font-bold
                       bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
                       hover:scale-105 hover:shadow-lg
                       transition-all duration-300"
          >
            Add To Cart 🍽️
          </button>
        </div>
      </div>
    </div>
  );
}