"use client";
import { motion, useAnimation, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        comment: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post(`https://api.telegram.org/bot8225601828:AAHATMxK8myZTsnbiqAg9hjld_bVrUk7Knc/sendMessage`, {
                chat_id: "6153606408",
                text: `Новое сообщение:\n\nEmail: ${formData.email}\nИмя: ${formData.name}\nКомментарий: ${formData.comment}`
            });

            setIsSubmitted(true);
            setFormData({ email: "", name: "", comment: "" });
        } catch (error) {
            console.error("Ошибка отправки:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const buttonVariants: Variants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { delay: 0.4 },
        },
        hover: {
            scale: 1.05,
            backgroundColor: "#2563eb",
            transition: { duration: 0.2 },
        },
        tap: {
            scale: 0.98,
        },
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="w-full   bg-white rounded-lg shadow-lg border border-gray-100"
        >
            {isSubmitted ? (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-4 bg-green-100 text-green-700 rounded-lg"
                >
                    Спасибо! Ваше сообщение отправлено.
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div variants={itemVariants}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Ваш Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ваше Имя"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <textarea
                            name="comment"
                            placeholder="Ваш Комментарий"
                            value={formData.comment}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                        />
                    </motion.div>

                    <motion.button
                        type="submit"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 transition-colors"
                    >
                        {isSubmitting ? "Отправка..." : "Отправить"}
                    </motion.button>
                </form>
            )}
        </motion.div>
    );
};

export default ContactForm;