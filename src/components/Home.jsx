import { Link } from 'react-router-dom';
import About from "./About"

const Home = () => {
  return (
    <main className="bg-white">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-yellow-100 via-white to-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-yellow-600 font-semibold text-sm md:text-base mb-2 animate-fade-in">
              DISCOVER FRESHNESS, QUALITY & SAVINGS AT SHARPMART
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 animate-fade-in delay-100">
              Your Destination for Daily & Fresh Groceries!
            </h1>
            <p className="text-gray-600 text-lg mb-6 animate-fade-in delay-200">
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

        {/* Custom Divider (SVG Waves) */}
        <div className="relative -mt-16">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* <path d="M0,0V46.29c47.79..." opacity=".25" className="fill-yellow-100"></path>
            <path d="M0,0V15.81..." opacity=".5" className="fill-yellow-200"></path>
            <path d="M0,0V5.63..." className="fill-yellow-300"></path> */}
          </svg>
        </div>
      </section>


      {/* Policies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-12 text-gray-800">Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'fa-truck-fast', title: 'Worldwide Shipping', subtitle: 'Order Above $100' },
              { icon: 'fa-rotate', title: 'Easy 30 Day Returns', subtitle: 'Back Returns in 7 Days' },
              { icon: 'fa-hand-holding-dollar', title: 'Money Back Guarantee', subtitle: 'Within 30 Days' },
              { icon: 'fa-headset', title: 'Easy Online Support', subtitle: '24/7 Anytime Support' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-100 rounded-lg p-6 shadow hover:bg-gray-200 transition">
                <div className="text-3xl text-yellow-500 mb-3">
                  <i className={`fa-solid ${item.icon}`}></i>
                </div>
                <p className="font-semibold text-gray-700">{item.title}</p>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
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
