import { useState, useEffect, useCallback, useRef } from "react";
import { FiFilter } from "react-icons/fi";
import Products from "./Products-View";
import FilterBar from "./FilterBar";
import { useLocation, useNavigate } from "react-router-dom";

const ProductsPage = ({ mobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Filters state must be declared before using its setter!
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    maxPrice: 1000,
  });

  // Parse URL search params and sync filter state on URL change
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setFilters({
      search: query.get("search") || "",
      category: query.get("category") || "",
      sort: query.get("sort") || "",
      maxPrice: query.get("maxPrice") ? Number(query.get("maxPrice")) : 1000,
    });
  }, [location.search]);

  // When filters change via UI, update filters state AND sync to URL
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };

      // Update URL with new query parameters
      const searchParams = new URLSearchParams();

      Object.entries(newFilters).forEach(([key, val]) => {
        if (val !== "" && val !== null && val !== undefined) {
          searchParams.set(key, val);
        }
      });

      // Push new URL without reload
      navigate({
        pathname: "/products",
        search: `?${searchParams.toString()}`,
      });

      return newFilters;
    });
  };

  const [products, setProducts] = useState([]);
  const debounceTimer = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(false);

  const fetchProducts = useCallback(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`http://localhost/php/gms/backend/get-products.php?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(
            data.map((p) => ({
              ...p,
              id: Number(p.id),
              price: Number(p.price),
              original_price: Number(p.original_price),
              rating: Number(p.rating),
              stock: Number(p.stock),
            }))
          );
        }
      })
      .catch(console.error);
  }, [filters]);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [fetchProducts]);

  // Fetch login status ONLY on mount to avoid infinite loops
  useEffect(() => {
    fetch("http://localhost/php/gms/backend/auth-status.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch(console.error);
  }, []);

  return (
    <div
      className={`h-screen bg-white dark:bg-gray-900 overflow-hidden flex transition-opacity duration-300 ${
        mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Desktop Sidebar */}
      {sidebarOpen && (
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 shadow-md sticky top-0 h-screen overflow-y-auto">
          <FilterBar filters={filters} handleInputChange={handleInputChange} />
        </aside>
      )}

      {/* Main */}
      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 mt-6 mb-4 flex-wrap">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded mt-4 sm:mt-0"
          >
            <FiFilter className="mr-2" />
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 relative inline-block tracking-wide uppercase">
            All Products
            <span className="block h-[3px] w-1/2 bg-orange-600 absolute left-1/2 transform -translate-x-1/2 mt-2"></span>
          </h2>
        </div>

        {/* Mobile Sidebar Overlay and Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {sidebarOpen && (
          <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-md z-40 transform transition-transform duration-300 md:hidden">
            <FilterBar
              filters={filters}
              handleInputChange={handleInputChange}
            />
          </aside>
        )}

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-4">
          <Products
            products={products}
            isLoggedIn={isLoggedIn}
            expandedProduct={expandedProduct}
            setExpandedProduct={setExpandedProduct}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
