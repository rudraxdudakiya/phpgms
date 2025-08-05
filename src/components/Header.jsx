import { useEffect, useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import clsx from "clsx";
import { useCart } from "../context/CartContext";

import { FaMoon, FaSun } from "react-icons/fa";

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
      
      clearCart(); 
      setIsLoggedIn(false);
      setLogoutMessage("You have been logged out successfully.");
      setTimeout(() => setLogoutMessage(""), 3000); //3s
      setTimeout(() => {
        navigate("/signin");
      }, 200); 
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

  const toggleTheme = () => {
    const next = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const isDark = document.body.getAttribute("data-theme") === "dark";


 return (
  <header
    className={clsx(
      "section-navbar transition-all duration-700 ease-out transform sticky top-0 z-50 w-full backdrop-blur-sm",
      animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
    )}
  >
    {logoutMessage && (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-500 text-green-700 dark:text-green-200 px-4 py-2 rounded shadow z-50">
        {logoutMessage}
      </div>
    )}

    {/* Top Bar */}
    <section className="bg-gray-400 dark:bg-gray-800 py-2 border-b border-gray-200 dark:border-gray-700 hidden md:block">
      <div className="container mx-auto flex justify-between items-center text-sm px-4">
        <p className="text-gray-700 dark:text-gray-300">
          🚚 Free Shipping, 30-Day Return or Refund Guarantee.
        </p>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              type="submit"
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </div>
    </section>

    {/* Navbar */}
    <div className=" mx-auto px-2 py-4 flex justify-between items-center relative bg-gray-200 dark:bg-gray-950">
      {/* Logo */}
      <Link to="/">
        <img
          src="/public/images/logo_navbar.png"
          alt="Logo"
          className="w-36 h-full hover:scale-105 transition-transform duration-300 dark:bg-white"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-base font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to={isLoggedIn ? "/cart" : "/signin"}
          className="relative flex items-center group"
        >
          <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          )}
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition"
          aria-label="Toggle theme"
        >
          {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-2xl text-gray-800 dark:text-white" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 flex flex-col items-center py-4 space-y-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to={isLoggedIn ? "/cart" : "/signin"}
            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition" />
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
              className="text-red-600 dark:text-red-400 hover:underline font-medium"
            >
              Log Out
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                onClick={() => setMenuOpen(false)}
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
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
