"use client";
import { Users, Clock, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, Variants } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const cardVariants : Variants={
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

const iconVariants:Variants = {
  hidden: { scale: 0.8 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      delay: 0.2
    }
  },
  hover: {
    rotate: 10,
    scale: 1.1
  }
};

const FeatureCard = ({
  icon,
  title,
  description,
  gradientFrom,
  gradientTo
}: FeatureCardProps) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
  >
    <Card className="border-0 shadow-lg hover:shadow-xl h-full">
      <CardContent className="p-8 text-center h-full flex flex-col">
        <motion.div 
          variants={iconVariants}
          className={`w-16 h-16 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed flex-grow">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const AboutSection3 = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Найти подходящего специалиста",
      description: "Большая база проверенных фрилансеров с рейтингами и отзывами для выбора лучшего исполнителя",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Разместить заказ за пару минут",
      description: "Интуитивно понятный интерфейс позволяет быстро создать техническое задание и найти исполнителя",
      gradientFrom: "from-purple-500",
      gradientTo: "to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Начать работу без лишней бюрократии",
      description: "Минимум формальностей, максимум результата. Сосредоточьтесь на работе, а не на документах",
      gradientFrom: "from-green-500",
      gradientTo: "to-green-600"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          gradientFrom={feature.gradientFrom}
          gradientTo={feature.gradientTo}
        />
      ))}
    </div>
  );
};

export default AboutSection3;