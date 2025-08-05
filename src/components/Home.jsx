import { Link } from 'react-router-dom';
import About from "./About"

const Home = () => {

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <section className="py-16 lg:py-24  bg-gradient-to-b from-yellow-100 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className=" text-yellow-600 dark:text-yellow-400 font-semibold text-sm md:text-base mb-2 animate-fade-in">
              DISCOVER FRESHNESS, QUALITY & SAVINGS AT SHARPMART
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight mb-4 animate-fade-in delay-100">
              Your Destination for Daily & Fresh Groceries!
            </h1>
            <p className=" text-gray-600 dark:text-gray-300 text-lg mb-6 animate-fade-in delay-200">
              Welcome to SharpMart – your go-to store for fresh produce, daily essentials, and more! Enjoy top quality, great value, and easy shopping all in one place.
            </p>
            <Link to="/products" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
              Explore Our Products
            </Link>
          </div>

          {/* Image */}
          <div className="text-center">
            <img
              src="public/images/logo2.png"
              alt="SharpMart Logo"
              className="w-4/5 mx-auto drop-shadow-xl animate-zoom-in"
            />
          </div>
        </div>
      </section>


      {/* Facility */}
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
      
      <About />

    </main>
  );
};

export default Home;
