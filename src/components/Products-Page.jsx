import { useState, useEffect, useCallback, useRef } from "react";
import Products from "./Products-View";
import { FiSearch } from "react-icons/fi";

const FilterBar = ({ filters, handleInputChange, hideOnMobile }) => {
  return (
    <section
      className={`bg-white dark:bg-gray-900 w-full px-4 sm:px-6 py-6 shadow animate-fadeIn 
        ${hideOnMobile ? "hidden sm:block" : ""}`}
    >  <div className="max-w-6xl mx-auto rounded-lg">
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-4 sm:gap-6">
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <option value="">All Categories</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Drinks">Drinks</option>
            <option value="Bakery">Bakery</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full sm:w-auto">
          <select
            name="sort"
            value={filters.sort}
            onChange={handleInputChange}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>

        {/* Price Range */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <label
            htmlFor="price"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap"
          >
            Max Price: ₹{filters.maxPrice || 1000}
          </label>
          <input
            type="range"
            id="price"
            name="maxPrice"
            min="0"
            max="1000"
            step="50"
            value={filters.maxPrice || 1000}
            onChange={handleInputChange}
            className="w-full sm:w-56 accent-blue-600 dark:accent-blue-500"
          />
        </div>
        </div>
      </div>
    </section>
  );
};


const ProductsPage = ({ mobileMenuOpen }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    maxPrice: 1000,
  });
  const debounceTimer = useRef(null);

  const fetchProducts = useCallback(() => {
    const params = new URLSearchParams(filters).toString();
    fetch(`http://localhost/php/gms/backend/get-products.php?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const normalized = data.map((p) => ({
            ...p,
            id: Number(p.id),
            price: Number(p.price),
            original_price: Number(p.original_price),
            rating: Number(p.rating),
            stock: Number(p.stock),
          }));
          setProducts(normalized);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, [filters]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [fetchProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost/php/gms/backend/auth-status.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
      })
      .catch((err) => console.error("Auth check failed:", err));
  }, [isLoggedIn]);

  const [expandedProduct, setExpandedProduct] = useState(false);
  return (
    <div
      className={`${
        mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      } transition-opacity duration-300`}
    >
      
    <div className="relative mx-auto py-2 dark:text-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mt-5">Check Out Products</h2>
    </div>
      {/* Filters */}
      <FilterBar
        filters={filters}
        handleInputChange={handleInputChange}
        hideOnMobile={mobileMenuOpen}
      />

      <Products
        products={products}
        isLoggedIn={isLoggedIn}
        expandedProduct={expandedProduct}
        setExpandedProduct={setExpandedProduct}
      />
    </div>
  );
};

export default ProductsPage;
