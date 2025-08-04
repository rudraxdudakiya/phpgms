import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./auth/Signup";
import SignIn from "./auth/Signin";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductsPage from "./components/Products-Page";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", saved);
  }, []);

  return (
    <Router>
      <Header setMobileMenuOpen={setMobileMenuOpen}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductsPage mobileMenuOpen={mobileMenuOpen}/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
