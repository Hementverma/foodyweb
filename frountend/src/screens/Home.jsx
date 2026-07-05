import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { baseUrl } from "../Urls";

export default function Home() {

  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {

    setLoading(true);

    let response = await fetch(`${baseUrl}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  

  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">

      <Navbar />

      {/* Carousel */}
      <div
        id="carouselExample"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >

        <div className="carousel-inner h-[70vh]">

          {/* Image 1 */}
          <div className="carousel-item active h-[70vh]">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200"
              alt="Food"
              className="w-full h-full object-cover brightness-50"
            />
          </div>

          {/* Image 2 */}
          <div className="carousel-item h-[70vh]">
            <img
              src="https://static.vecteezy.com/system/resources/previews/026/794/680/non_2x/double-hamburger-isolated-on-white-background-fresh-burger-fast-food-with-beef-and-cream-cheese-realistic-image-ultra-hd-high-design-very-detailed-free-photo.jpg"
              alt="Burger"
              className="w-full h-full object-cover brightness-75"
            />
          </div>

          {/* Image 3 */}
          <div className="carousel-item h-[70vh]">
            <img
              src="https://wallpapers.com/images/hd/chinese-food-pictures-283a542wre04dt2j.jpg"
              alt="Chinese Food"
              className="w-full h-full object-cover brightness-75"
            />
          </div>

        </div>

        {/* Search Box */}
        <div className="absolute inset-0 flex items-center justify-center px-4 z-10">

          <input
            type="search"
            placeholder="Search Food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-4 rounded-2xl outline-none text-white shadow-xl text-lg"
          />

        </div>

        {/* Previous Button */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        {/* Next Button */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

      {/* Food Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {loading ? (

          <div className="flex justify-center items-center py-20">

            <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

          </div>

        ) : foodCat.length > 0 ? (

          foodCat.map((data) => (

            <div key={data._id} className="mb-14">

              {/* Category Name */}
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                {data.CategoryName}
              </h2>

              <div className="w-full h-[2px] bg-gray-300 mb-8"></div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {foodItem.length > 0 ? (

                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )

                    .map((filterItems) => (

                      <Card
                        key={filterItems._id}
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />

                    ))

                ) : (

                  <div className="text-red-500 font-semibold">
                    No Data Found
                  </div>

                )}

              </div>
            </div>

          ))

        ) : (

          <div className="text-center text-2xl font-semibold py-20">
            Food Categories Are Loading...
          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}