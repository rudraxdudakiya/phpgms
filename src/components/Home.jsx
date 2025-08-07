import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Mapping category names to illustrative images
const categoryImages = {
  Vegetables: "https://greencart-gs.vercel.app/assets/organic_vegitable_image-B6WcGgPL.png",
  Fruits: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
  Dairy: "https://greencart-gs.vercel.app/assets/dairy_product_image-B1gRG1MT.png",
  Drinks: "https://greencart-gs.vercel.app/assets/bottles_image-DMalNkiM.png",
  Bakery: "https://greencart-gs.vercel.app/assets/bakery_image-e5rU_kNe.png",
  Grains: "https://greencart-gs.vercel.app/assets/grain_image-BkT7wje5.png",
  Instant: "https://greencart-gs.vercel.app/assets/maggi_image-DD7JXh5a.png",
  // fallback will be used if missing
};

// Mapping pastel backgrounds per category
const categoryBgColors = {
  Vegetables: "bg-yellow-50",
  Fruits: "bg-pink-50",
  Drinks: "bg-green-50",
  "Instant Food": "bg-lime-50",   // Tailwind 3.0+ for more pastel, else use bg-green-100
  Dairy: "bg-orange-50",
  Bakery: "bg-blue-50",
  Grains: "bg-purple-50",
  "default": "bg-gray-100"
};

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${encodeURIComponent(cat)}`);
  };

  useEffect(() => {
    fetch("http://localhost/php/gms/backend/get-categories.php", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.success) setCategories(data.categories);
      })
      .catch(err => {
        console.error("Failed to load categories:", err);
      });
  }, []);

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-yellow-100 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm md:text-base mb-2 animate-fade-in">
              DISCOVER FRESHNESS, QUALITY & SAVINGS AT SHARPMART
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4 animate-fade-in delay-100">
              Your Destination for Daily & Fresh Groceries!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 animate-fade-in delay-200">
              Welcome to SharpMart – your go-to store for fresh produce, daily essentials, and more! Enjoy top quality, great value, and easy shopping all in one place.
            </p>
            <Link to="/products" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
              Explore Our Products
            </Link>
          </div>
          <div className="text-center">
            <img src="public/images/logo2.png" alt="SharpMart Logo" className="w-4/5 mx-auto drop-shadow-xl animate-zoom-in" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {categories.length === 0 ? (
              <p className="text-center col-span-full text-gray-500 dark:text-gray-400">Loading categories...</p>
            ) : (
              categories.map(cat => (
                <button
                  key={cat} // category string is unique
                  type="button"
                  className={[
                    "flex flex-col items-center justify-center",
                    categoryBgColors[cat] || categoryBgColors["default"],
                    "hover:bg-yellow-100 dark:hover:bg-yellow-700",
                    "p-5 rounded-lg shadow group transition-colors duration-300 border border-gray-200 dark:border-gray-700"
                  ].join(' ')}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <img
                    src={categoryImages[cat] || "https://cdn-icons-png.flaticon.com/512/565/565547.png"}
                    alt={cat}
                    className="w-16 h-16 object-contain mb-3"
                  />
                  <span className="font-medium text-gray-800 dark:text-yellow-300 group-hover:text-yellow-600 transition-colors duration-300">
                    {cat}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-16 bg-white dark:bg-gray-700">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-gray-800 dark:text-white">Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'fa-truck-fast', title: 'Worldwide Shipping', subtitle: 'Order Above $100' },
              { icon: 'fa-rotate', title: 'Easy 30 Day Returns', subtitle: 'Back Returns in 7 Days' },
              { icon: 'fa-hand-holding-dollar', title: 'Money Back Guarantee', subtitle: 'Within 30 Days' },
              { icon: 'fa-headset', title: 'Easy Online Support', subtitle: '24/7 Anytime Support' }
            ].map((item, idx) => (
              <div key={idx} className="rounded-lg p-6 shadow bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition">
                <div className="text-3xl text-yellow-500 mb-3">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <p className="font-semibold text-gray-700 dark:text-white">{item.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
