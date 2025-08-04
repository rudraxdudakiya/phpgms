import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="py-12 font-sans bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300">Get in touch with us. We are always here to help you.</p>
            </div>

            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 mt-12">
                <form
                    action="https://formspree.io/f/xkgzbjlw"
                    method="POST"
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div data-aos="fade-up">
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300" htmlFor="username">Full Name</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded"
                                placeholder="Enter full name"
                            />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="50">
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300" htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded"
                                placeholder="abc@gmail.com"
                            />
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100">
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300" htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded"
                            placeholder="Title of your message"
                        />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="150">
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300" htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="6"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded"
                            placeholder="We are always here to help you."
                        ></textarea>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="w-full" data-aos="fade-up" data-aos-delay="250">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709355883!2d72.7398840249219!3d21.159340299986578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1751468052823!5m2!1sen!2sin"
                        width="100%"
                        height="88%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
