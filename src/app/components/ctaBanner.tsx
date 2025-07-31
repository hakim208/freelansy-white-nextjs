import React from 'react';
import Link from 'next/link';

const CtaBanner = () => {
    return (
        <div className="w-[83%] h-[400px] mx-auto relative overflow-hidden rounded-2xl shadow-xl my-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5046e6] to-[#7c3aed] opacity-95"></div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Присоединяйтесь к нам — <span className="text-yellow-300">начните зарабатывать уже сегодня!</span>
                </h2>

                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                    Сотни выгодных заказов и проверенные исполнители ждут вас.
                </p>

                <Link href="/register">
                    <button className="bg-white text-[#5046e6] hover:bg-gray-100 font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Присоединиться
                    </button>
                </Link>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-yellow-300/20"></div>
                <div className="absolute top-1/3 -right-10 w-32 h-32 rounded-full bg-white/10"></div>
            </div>
        </div>
    );
};

export default CtaBanner;