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
        if (data.success) {
          setCartItems(data.cart);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cart:", err);
        setLoading(false);
      });
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  
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

 return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">🛒 Your Shopping Cart</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded shadow-sm gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-sm text-gray-700">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-center gap-2">
                <p className="text-lg font-semibold">₹{item.price * item.quantity}</p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-3 md:mt-0">
                <button
                  onClick={() => handleRemoveItem(item.cart_id)}
                  className="flex flex-col items-center px-3 py-2 rounded bg-red-100 hover:bg-red-200 text-red-600 transition-all duration-300 hover:scale-105"
                >
                  <FaTrashArrowUp size={20} />
                  <span className="text-xs font-medium mt-1">Remove</span>
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
