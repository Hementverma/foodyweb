import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { baseUrl } from "../Urls";

export default function MyOrder() {

  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {

    try {

      const response = await fetch(`${baseUrl}/api/myOrderData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await response.json();

      setOrderData(data);

    } catch (error) {

      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">
          My Orders
        </h1>

        {Object.keys(orderData).length > 0 &&
        orderData.orderData &&
        orderData.orderData.order_data ? (

          orderData.orderData.order_data.map((item, index) => (

            <div key={index} className="mb-12">

              {/* Orders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {item.map((arrayData, i) => (

                  <div key={i}>

                    {arrayData.order_date ? (

                      <div className="col-span-full">

                        <h2 className="text-2xl font-bold text-green-600 mb-4">
                          Order Date : {arrayData.order_date}
                        </h2>

                        <div className="w-full h-[2px] bg-gray-300 mb-6"></div>

                      </div>

                    ) : (

                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

                        {/* Image */}
                        <img
                          src={arrayData.img}
                          alt={arrayData.name}
                          className="w-full h-[200px] object-cover"
                        />

                        {/* Content */}
                        <div className="p-5">

                          <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            {arrayData.name}
                          </h2>

                          <div className="space-y-2 text-gray-600">

                            <p>
                              <span className="font-semibold">
                                Quantity:
                              </span>{" "}
                              {arrayData.qty}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Size:
                              </span>{" "}
                              {arrayData.size}
                            </p>

                            <p>
                              <span className="font-semibold">
                                Price:
                              </span>{" "}
                              ₹{arrayData.price}/-
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          ))

        ) : (

          <div className="flex items-center justify-center py-20">

            <div className="bg-white shadow-lg rounded-2xl p-10 text-center">

              <h2 className="text-3xl font-bold text-red-500 mb-3">
                No Orders Found
              </h2>

              <p className="text-gray-600">
                Please order something delicious 🍔
              </p>

            </div>

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}