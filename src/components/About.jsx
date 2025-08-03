import { motion } from "framer-motion";

const About = () => {
    const facilities = [
        { icon: "fa-truck-fast", title: "Fast Shipping", subtitle: "Free on orders above ₹1000" },
        { icon: "fa-rotate", title: "Easy Returns", subtitle: "Within 7 days of delivery" },
        { icon: "fa-hand-holding-dollar", title: "Money-Back Guarantee", subtitle: "No questions asked" },
        { icon: "fa-headset", title: "24/7 Support", subtitle: "We're here anytime" },
    ];

    return (
        <div className="mt-0 bg-gray-50 min-h-screen flex flex-col items-center pt-5 pb-10 px-4 sm:px-6 lg:px-10">
        {/* About Section */}
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-0 bg-white rounded-3xl shadow-2xl max-w-7xl w-full px-6 py-8 md:px-8 md:py-10"
            >
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
                About <span className="text-green-600">SHARP MART</span>
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image */}
                <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-50 flex justify-center ml-40 mr-40"  
                >
                <img
                    src="/images/title_bg.png"
                    alt="Sharp Mart"
                    className="w-full max-w-[260px] md:max-w-[320px] lg:max-w-[360px] h-auto object-contain"
                />
                </motion.div>

                {/* Text */}
                <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full lg:w-1/2 text-gray-700 text-[15px] md:text-base space-y-4 leading-relaxed"
                >
                <p>
                    <span className="text-green-600 font-bold">SHARP MART</span> is your one-stop online grocery store offering fresh produce,
                    pantry staples, and daily essentials — bringing quality, convenience, and value to your doorstep.
                </p>
                <p>
                    Built with a vision to simplify shopping, we provide a wide range of products, fast delivery, and a smooth
                    user experience — making your grocery run faster and smarter.
                </p>
                <p>
                    From seasonal fruits to snacks, dairy, and cleaning supplies, everything you need is just a click away.
                </p>
                <p>
                    At <span className="text-green-600 font-bold">SHARP MART</span>, we believe shopping should be stress-free, affordable,
                    and enjoyable. Thank you for being a part of our journey.
                </p>
                </motion.div>
            </div>
            </motion.div>

        {/* Facilities Section */}
            <section className="mt-20 w-full max-w-7xl">
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center text-gray-800">
                Why Shop With Us?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-6">
                {facilities.map((item, idx) => (
                    <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 * idx }}
                    className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
                    >
                    <div className="text-4xl text-green-500 mb-4">
                        <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <p className="font-semibold text-gray-800 text-lg">{item.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                    </motion.div>
                ))}
                </div>
            </section>
        </div>
    );
};

export default About;
