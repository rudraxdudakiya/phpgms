import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count from backend after login or refresh
  useEffect(() => {
    fetch("http://localhost/php/gms/backend/get-cart-count.php", {
      credentials: "include", // Needed for session cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartCount(data.count);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch cart count:", err);
      });
  }, []);

  const incrementCart = (qty = 1) => setCartCount((prev) => prev + qty);
  const clearCart = () => setCartCount(0);

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
