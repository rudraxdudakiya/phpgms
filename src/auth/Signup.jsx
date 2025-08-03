import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setPending(true);
        console.log("Submitting data:", formData);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setPending(false);
            return;
        }

        try {
            const res = await fetch("http://localhost/php/gms/backend/signup.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Signup failed");

            alert("Signup successful signin to continue..!");
            window.location.href="/signin";
        } catch (err) {
            setError(err.message);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden grid md:grid-cols-2">
                {/* Left side - Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6 flex flex-col justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Let's get started!</h2>
                        <p className="text-gray-500">Create your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Type your famous name here..."
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
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

                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                            {pending ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-600 hover:underline font-medium">
                            Sign In
                        </Link>
                    </div>
                </form>

                {/* Right side - Branding */}
                <div className="w-full bg-[#f8e0b1] flex justify-center items-center p-8">
                    <img
                        src="/images/title_bg.png"
                        alt="Sharp Mart Logo"
                        className="w-24 h-30 sm:w-40 md:w-48 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
