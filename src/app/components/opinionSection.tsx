"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import AboutTelegrambot from "./aboutTelegrambot";

const OpinionSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants :Variants= {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full">
      <motion.h2 
        className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        Ваше мнение
      </motion.h2>

      <motion.div 
        className="md:py-[50px] py-[20px] md:w-[80%] w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div 
          className="md:w-[48%] w-full"
          variants={itemVariants}
        >
          <AboutTelegrambot />
        </motion.div>

        <motion.div 
          className="md:w-[49%] w-full"
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          <Image 
            className="w-full h-auto rounded-lg shadow-lg"
            src="https://cdn.umnico.com/production/landing/en-article26.png" 
            width={600}
            height={400}
            alt="Пример работы Telegram бота"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OpinionSection;