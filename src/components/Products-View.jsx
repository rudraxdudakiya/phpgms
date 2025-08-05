import { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';

const Products = ({ products, isLoggedIn, expandedProduct, setExpandedProduct }) => {
  const [quantities, setQuantities] = useState({});
  const { incrementCart } = useCart();

  useEffect(() => {
    AOS.init();
    if (Array.isArray(products)) {
      const initialQuantities = {};
      products.forEach((product) => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  const handleIncrement = (id, stock) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (currentQty < stock) return { ...prev, [id]: currentQty + 1 };
      return prev;
    });
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  const handleAddToCart = async (productId, quantity) => {
   const confirm = await Swal.fire({
      title: "Add to Cart?",
      text: `Do you want to add ${quantity} item(s) to your cart?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    });

    if (!confirm.isConfirmed) return;
    
    try {
      const res = await fetch("http://localhost/php/gms/backend/add-to-cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity })
      });
      const data = await res.json();
      if (data.success) {
        incrementCart(quantity);
        alert("🛒 " + data.message);
      } else alert("❌ " + data.message);
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="relative mx-auto py-2 dark:text-gray-100 dark:bg-gray-900">

      {/* Dim background if expanded */}
      <div
        className={`grid ml-4 mr-4 mb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${expandedProduct ? 'opacity-30 pointer-events-none select-none' : ''}`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => setExpandedProduct(product)}
            className="border border-gray-300 dark:text-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <span className="text-sm text-gray-500 dark:text-gray-100">{product.category}</span>
            <div className="flex justify-center my-4">
              <img className="w-32 h-32 object-contain" src={product.image} alt={product.name} />
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-green-600 font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>

      {/* Expanded View Overlay */}
      {expandedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="absolute inset-0 bg-black opacity-50"></div>

          <div className="relative dark:text-gray-100 dark:bg-gray-800 bg-white p-6 rounded-lg shadow-xl z-50 w-[90%] max-w-lg">
            <button
              onClick={() => setExpandedProduct(null)}
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
            >
              ✕
            </button>

            <div className="text-center">
              <img
                src={expandedProduct.image}
                alt={expandedProduct.name}
                className="mx-auto w-48 h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{expandedProduct.name}</h3>
              <p className="text-gray-600 mb-3">{expandedProduct.about}</p>
              <p className="text-green-600 font-semibold text-lg">₹{expandedProduct.price}</p>
              <p className="line-through text-sm text-gray-400 mb-1">₹{expandedProduct.original_price}</p>
              <p className="text-sm text-gray-500 mb-3">Stock: {expandedProduct.stock}</p>

              <div className="flex justify-center items-center gap-2 mb-3">
                <button onClick={() => handleDecrement(expandedProduct.id)} className="bg-gray-200 px-3 dark:bg-gray-500 rounded-sm">-</button>
                <span>{quantities[expandedProduct.id]}</span>
                <button onClick={() => handleIncrement(expandedProduct.id, expandedProduct.stock)} className="bg-gray-200 dark:bg-gray-500 rounded-sm px-3">+</button>
              </div>

              <button
                className={`w-full py-2 rounded text-white ${isLoggedIn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-600 cursor-not-allowed'}`}
                disabled={!isLoggedIn}
                onClick={() => handleAddToCart(expandedProduct.id, quantities[expandedProduct.id])}
              >
                <i className="fa-solid fa-cart-shopping mr-2"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;