import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import clsx from "clsx";
import { useCart } from "../context/CartContext";


const Header = ({ setMobileMenuOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, clearCart } = useCart();

  
   
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    fetch("http://localhost/php/gms/backend/auth-status.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const updated = !prev;
      setMobileMenuOpen(updated); 
      return updated;
    });
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await fetch("http://localhost/php/gms/backend/logout.php", {
        method: "POST",
        credentials: "include",
      });
      
      clearCart(); // ✅ Clear cart on logout
      setIsLoggedIn(false);
      setLogoutMessage("You have been logged out successfully.");
      setTimeout(() => setLogoutMessage(""), 3000); //3s
      setTimeout(() => {
        navigate("/signin");
      }, 200); // Wait 200 milliseconds
    } catch (err) {
      console.error("Logout failed", err);
      setLogoutMessage("Logout failed. Please try again.");
    }
  };


  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Products", to: "/products" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header
      className={clsx(
        "section-navbar transition-all duration-700 ease-out transform",
        animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}
    >
      {logoutMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {logoutMessage}
        </div>
      )}

      {/* Top Bar */}
      <section className="bg-gray-300 py-2 border-b border-gray-200 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm px-4">
          <p className="text-gray-700">
            🚚 Free Shipping, 30-Day Return or Refund Guarantee.
          </p>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                type="submit"
                onClick={handleLogout}
                className="text-red-600 hover:underline font-medium"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-blue-600 hover:underline font-medium"
                >
                  SIGN IN
                </Link>
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/">
          <img
            src="/public/images/logo_navbar.png"
            alt="Logo"
            className="w-36 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-base font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-blue-600 hover:underline underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to={isLoggedIn ? "/cart" : "/signin"}
            className="relative flex items-center group"
          >
            <FaShoppingCart className="text-xl text-gray-700 group-hover:text-blue-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col items-center py-4 space-y-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to={
                isLoggedIn
                  ? "/cart"
                  : "/signin"
              }
              className="flex items-center text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              <FaShoppingCart className="text-xl text-gray-700 group-hover:text-blue-600 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 hover:underline font-medium"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  SIGN IN
                </Link>
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
