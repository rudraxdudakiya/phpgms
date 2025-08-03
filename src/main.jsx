import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
)
