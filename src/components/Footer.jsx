import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  const [email, setEmail] = useState("");
  const handleSubscribe = async () => {
    if (!email) return alert("Please enter an email.");

    try {
      const res = await fetch("http://localhost/php/gms/backend/newsletter.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      console.log("Raw response:", text);

      const data = JSON.parse(text);
      alert(data.message);
      setEmail("");
    } catch (error) {
      console.error("Error in fetch or JSON parse:", error);
      alert("Something went wrong. Try again later.");
    }
};

  

  return (
    <footer className="bg-[#f3f4f6] pt-10 pb-4 text-gray-800 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Logo & Info */}
        <div className="space-y-4">
          <img src="/public/images/logo_footer.png" alt="Sharp Mart Logo" className="w-32" />
          <p>
            Welcome to <strong>Sharp Mart</strong>, your trusted store for daily groceries, farm-fresh Quality products, everyday savings!
          </p>
          <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="Payment Cards" className="w-40 mt-2" />
        </div>

        {/* Shopping Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold mb-2">SHOPPING</h4>
          <a href="#" className="block hover:underline">Fruits & Vegetables</a>
          <a href="#" className="block hover:underline">Dairy & Bakery</a>
          <a href="#" className="block hover:underline">Snacks & Beverages</a>
          <a href="#" className="block hover:underline">Household Supplies</a>
        </div>

        {/* Experience Links */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold mb-2">EXPERIENCE</h4>
          <Link to="/contact" className="block hover:underline">Contact Us</Link>
          <a href="#" className="block hover:underline">Track Your Order</a>
          <a href="#" className="block hover:underline">Secure Payments</a>
          <a href="#" className="block hover:underline">Fast Delivery</a>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold mb-2">NEWSLETTER</h4>
          <p>
            Fresh picks, hot deals,
            <br />
            straight to your inbox.
          </p>
          <div className="flex items-center border border-gray-400 rounded overflow-hidden">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="px-3 py-2 w-full outline-none bg-transparent dark:text-white"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-500 text-white px-3 py-2"
            >
              <i className="bx bx-envelope" />
            </button>
          </div>
          <hr className="border-gray-300" />
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
        <p>
          Copyright 2025 © <strong>SHARP MART</strong> All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
