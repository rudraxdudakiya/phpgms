import { useState, useEffect } from "react";
import { TbLoader3 } from "react-icons/tb";
import { Link } from "react-router-dom";

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setFormData((prev) => ({
                ...prev,
                email: savedEmail,
                remember: true,
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);

        try {
            const res = await fetch("http://localhost/php/gms/backend/signin.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // include cookies
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Sign in failed");

            if (formData.remember) {
                localStorage.setItem("rememberedEmail", formData.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }

            // alert("Sign in successful!");
            window.location.href="/";
        } catch (err) {
            setError(err.message);
            } finally {
                setPending(false);
            }
    };

    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-0 m-0">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden grid md:grid-cols-2 h-[520px]">
            {/* Left side: Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 h-full flex flex-col justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Welcome Back!</h2>
                <p className="text-gray-500">Log in to your account</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="demo@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <div className="flex items-center space-x-2 text-sm">
                <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                />
                <label htmlFor="remember" className="text-gray-600">Remember Me</label>
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="relative w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center justify-center"
                >
                    {pending ? (
                        <TbLoader3 className="animate-spin text-xl" />
                    ) : (
                        "Sign In"
                    )}
                </button>

            </div>

            <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign Up
                </Link>
            </div>
            </form>
                
                <div className="w-full bg-[#f8e0b1] flex justify-center items-center p-0">
                        <img
                            src="/images/title_bg.png"
                            alt="Sharp Mart Logo"
                            className="w-24 h-24 sm:w-40 md:w-48 object-contain"
                        />
                    </div>
        </div>
        </div>
    );
    };

    export default SignIn;
