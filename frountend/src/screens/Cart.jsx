import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { FiTrash2 } from "react-icons/fi";
import { baseUrl } from "../Urls";

export default function Cart() {

  const data = useCart();
  const dispatch = useDispatchCart();

  const totalPrice = data.reduce(
    (total, food) => total + food.price,
    0
  );

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    const orderData = {
      amount: totalPrice,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        email: userEmail,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/api/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const order = await response.json();

      const options = {
        key: "rzp_test_Jlz5q9bfq8PpEh",
        amount: order.amount,
        currency: order.currency,
        name: "Foody Web",
        description: "Ordering Food Online",
        order_id: order.id,

        handler: async function (response) {

          await fetch(`${baseUrl}/api/orderData`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              order_data: data,
              email: userEmail,
              order_date: new Date().toDateString(),
            }),
          });

          dispatch({ type: "DROP" });

          alert("Payment Successful");
        },

        prefill: {
          email: userEmail,
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.log(error);
      alert("Checkout Failed");
    }
  };

  if (data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">
          Cart Is Empty
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-8 text-center">
          My Cart
        </h1>

        {/* Table Heading */}
        <div className="hidden md:grid grid-cols-6 font-semibold text-lg border-b pb-4 mb-4">
          <p>#</p>
          <p>Name</p>
          <p>Qty</p>
          <p>Size</p>
          <p>Price</p>
          <p>Remove</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-5">

          {data.map((food, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 md:grid md:grid-cols-6 flex flex-col gap-3 items-center shadow-sm"
            >

              <p>{index + 1}</p>

              <p className="font-medium text-center">
                {food.name}
              </p>

              <p>{food.qty}</p>

              <p>{food.size}</p>

              <p className="font-semibold text-green-600">
                ₹{food.price}
              </p>

              <button
                onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    index: index,
                  })
                }
                className="text-red-500 hover:scale-110 transition"
              >
                <FiTrash2 size={22} />
              </button>

            </div>
          ))}

        </div>

        {/* Total */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5">

          <h2 className="text-2xl font-bold text-green-600">
            Total: ₹{totalPrice}/-
          </h2>

          <button
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition w-full md:w-auto"
            onClick={handleCheckOut}
          >
            Check Out
          </button>

        </div>

      </div>
    </div>
  );
}