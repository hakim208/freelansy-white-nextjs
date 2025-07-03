"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

interface CategoryItem {
  id: string;
  images: string;
  name: string;
}

const CartCategory = () => {
  const [data, setData] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://43baa55b08d805d5.mokky.dev/category');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const topCategories = data.slice(0, 3);
  const bottomCategories = data.slice(-3);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full sm:w-[48%] md:w-[30%] h-48 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full px-4 max-w-6xl mx-auto py-8">
      <div className="flex flex-wrap justify-center gap-6">
        {topCategories.map((item) => (
          <div 
            key={item.id}
            className="w-full sm:w-[48%] md:w-[30%] flex flex-col items-center p-6 bg-gradient-to-br from-[#5046e6] to-[#7a6eff] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative w-24 h-24 mb-5 bg-white/20 rounded-full p-2 backdrop-blur-sm">
              <Image
                src={item.images}
                alt={item.name}
                fill
                className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-white text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {bottomCategories.map((item) => (
          <div 
            key={item.id}
            className="w-full sm:w-[48%] md:w-[30%] flex flex-col items-center p-6 bg-white rounded-xl border-2 border-[#5046e6] shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative w-24 h-24 mb-5 bg-[#5046e6]/10 rounded-full p-2">
              <Image
                src={item.images}
                alt={item.name}
                fill
                className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-[#5046e6] text-center">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartCategory;