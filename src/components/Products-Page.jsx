import { useState, useEffect, useCallback } from 'react';
import Products from './Products-View';
import { FiSearch } from 'react-icons/fi';

const FilterBar = ({ filters, handleInputChange, hideOnMobile }) => {
  return (
    <section
      className={`bg-white py-6 shadow rounded-lg mx-auto max-w-6xl px-6 mb-8 animate-fadeIn 
        ${hideOnMobile ? "hidden sm:block" : ""}`}
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 sm:gap-6">

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
        </div>

        {/* Category Dropdown */}
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 w-full sm:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Drinks">Drinks</option>
          <option value="Bakery">Bakery</option>
        </select>

        {/* Sort Dropdown */}
        <select
          name="sort"
          value={filters.sort}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 w-full sm:w-auto"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>

        {/* Price Range */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <label htmlFor="price" className="text-sm font-medium text-gray-600">Max Price: ₹{filters.maxPrice || 1000}</label>
          <input
            type="range"
            id="price"
            name="maxPrice"
            min="0"
            max="1000"
            step="50"
            value={filters.maxPrice || 1000}
            onChange={handleInputChange}
            className="w-full sm:w-56 accent-blue-600"
          />
        </div>
      </div>
    </section>
  );
};


const ProductsPage = ({ mobileMenuOpen }) => {

const [products, setProducts] = useState([]);
const [filters, setFilters] = useState({
  search: '',
  category: '',
  sort: '',
  maxPrice: 1000
});
const [isLoading, setIsLoading] = useState(true);

  // Fetch products
  const fetchProducts = useCallback(() => {
    setIsLoading(true);
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
          console.error('Unexpected API response:', data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setIsLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    fetchProducts();
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
    <div className={`${mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"} transition-opacity duration-300`}>
      {/* Filters */}
      <FilterBar
        filters={filters}
        handleInputChange={handleInputChange}
        hideOnMobile={mobileMenuOpen}
      />
      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center mt-12">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Products products={products} isLoggedIn={isLoggedIn} expandedProduct={expandedProduct} setExpandedProduct = {setExpandedProduct}/>
      )}
    </div>
  );
};

export default ProductsPage;
