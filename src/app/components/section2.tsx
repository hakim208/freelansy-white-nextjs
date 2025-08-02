"use client"
import { Cloud, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import React, { FC, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, bgColor }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-100 flex-1 min-w-[250px]"
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.05, transition: { duration: 0.2 } }}
    initial="hidden"
    animate="visible"
  >
    <div
      className={`w-14 h-14 mb-4 rounded-full ${bgColor} flex items-center justify-center`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Section2: FC = () => {
  return (
    <div className="w-[83%] mx-auto">
      <motion.div
        className="w-full px-4 justify-between flex items-start md:px-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Heading */}
        <motion.div
          className="w-[40%] mt-[30px]"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className='text-3xl md:text-4xl font-bold text-gray-700'>
            Почему фрилансеры выбирают <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Freelansy</span> для выполнения заказов?
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div className="w-full md:w-[55%] flex gap-3 flex-wrap">
          <FeatureCard
            icon={<Wallet className="w-6 h-6 text-purple-600" />}
            title="Удобство"
            description="Просто. Всё под рукой. Работайте, где и когда удобно."
            bgColor="bg-purple-50"
          />

          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
            title="Защита"
            description="Надёжные оплаты. Защищённые сделки. Гарантия с обеих сторон."
            bgColor="bg-blue-50"
          />

          <FeatureCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            title="Развитие"
            description="Рост, обучение и поддержка экспертов."
            bgColor="bg-green-50"
          />

          <FeatureCard
            icon={<Cloud className="w-6 h-6 text-orange-500" />}
            title="Свобода"
            description="Выбирайте проекты, работайте удобно, контролируйте доход."
            bgColor="bg-orange-50"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Section2;
