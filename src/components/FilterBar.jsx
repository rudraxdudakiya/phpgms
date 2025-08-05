import { FiSearch } from "react-icons/fi";

const FilterBar = ({ filters, handleInputChange }) => (
  <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
    <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Filters</h2>
    {/* Search (optional mirror) */}
    <div className="mb-6 relative">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={filters.search}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring"
      />
    </div>

    <div className="space-y-6">
      {/* Category */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring"
        >
          <option value="">All Categories</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Drinks</option>
          <option>Bakery</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">Sort By</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleInputChange}
          className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label htmlFor="maxPrice" className="block mb-1 text-sm font-medium text-gray-600 dark:text-gray-300">
          Max Price: ₹{filters.maxPrice}
        </label>
        <input
          type="range"
          id="maxPrice"
          name="maxPrice"
          min="0"
          max="1000"
          step="50"
          value={filters.maxPrice}
          onChange={handleInputChange}
          className="w-full accent-blue-600 dark:accent-blue-500"
        />
      </div>
    </div>
  </aside>
);

export default FilterBar