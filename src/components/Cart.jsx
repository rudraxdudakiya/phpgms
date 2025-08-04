import { useEffect, useState } from 'react';
import { FaTrashArrowUp } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/php/gms/backend/get-cart.php", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setCartItems(data.cart);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
        setLoading(false);
      });
  }, []);

  const handleRemoveItem = async (cartId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch("http://localhost/php/gms/backend/remove-from-cart.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ cart_id: cartId }),
      });

      const data = await res.json();
      if (data.success) {
        setCartItems((prev) => prev.filter((item) => item.cart_id !== cartId));
        Swal.fire({
          icon: "success",
          title: "Item Removed",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Failed to remove item.",
        });
      }
    } catch (err) {
      console.error("Error removing item:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong while removing item.",
      });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + delivery + tax).toFixed(2);

  const handlePlaceOrder = () => {
    // TODO: Order submission logic here
  };

  return (
    <div className="mx-auto px-4 py-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">🛒 Your Shopping Cart</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="flex flex-col sm:flex-row items-center justify-between border border-gray-300 dark:border-gray-600 p-4 rounded shadow-sm gap-4 bg-white dark:bg-gray-700"
            >
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <div className="text-lg font-semibold text-center text-gray-800 dark:text-white">
                ₹{item.price * item.quantity}
              </div>

              <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-3 md:mt-0">
                <button
                  onClick={() => handleRemoveItem(item.cart_id)}
                  className="flex flex-col items-center px-3 py-2 rounded bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-red-600 dark:text-red-300 transition-all duration-300 hover:scale-105"
                >
                  <FaTrashArrowUp size={20} />
                  <span className="text-xs font-medium mt-1 dark:text-white">Remove</span>
                </button>
              </div>
            </div>
          ))}

          {/* Bill Summary */}
          <div className="flex justify-end mt-8">
            <div className="w-full sm:w-96 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                <span className="font-medium text-gray-800 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Delivery Charges:</span>
                <span className="text-gray-800 dark:text-white">₹{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tax (5%):</span>
                <span className="text-gray-800 dark:text-white">₹{tax}</span>
              </div>
              <hr className="border-gray-300 dark:border-gray-700" />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-black dark:text-white">Total:</span>
                <span className="text-black dark:text-white">₹{total}</span>
              </div>

              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
