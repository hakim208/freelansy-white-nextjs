import { BoxReveal } from '@/components/magicui/box-reveal'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import React from 'react'
import MySwiper from './components/swiper'
import CartCategory from './components/cartCategory'
import { MarqueeDemo } from './components/reviewCard'
import CtaBanner from './components/ctaBanner'

const Home = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[30px] w-[90%] m-auto'>
        <div className='flex flex-col lg:flex-row items-center justify-between min-h-[90vh] gap-8 px-4 sm:px-8 py-12'>
          <div className="w-full lg:w-[45%] max-w-2xl mx-auto text-center lg:text-left">
            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Возьмите заказ
                <span className="text-[#5046e6] animate-pulse">.</span>
              </h1>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7} >
              <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                Выполните его —
                <span className="font-semibold  bg-gradient-to-r from-[#7c3aed] to-[#5046e6] bg-clip-text text-transparent">
                  получите оплату
                </span>
                .<br />
                Достигните цели, двигайтесь вперёд.
              </p>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7} >
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-[#5046e6] to-[#7c3aed] text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="text-[#5046e6] border-[#5046e6] text-lg px-8 py-4 rounded-xl hover:bg-[#5046e6]/10 transition-colors duration-300"
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            </BoxReveal>
          </div>
          <div className='w-full lg:w-[50%] relative'>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#5046e6]/20 to-[#7c3aed]/20 rounded-3xl blur-lg opacity-75 animate-float"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#5046e6]/10">
              <MySwiper />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-[10px] m-[50px_0px] '>
          <h1 className="text-[50px] font-medium font-sans">Просмотр категории <span className="text-[#7c3aed]">заказов</span></h1>
          <h1 className='text-[25px] font-sans '>Выберите категорию которая Вам интересна</h1>
        </div>
        <div>
          <CartCategory />
        </div>
        <div className='mt-[50px] '>
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#5046e6] to-[#7c3aed] bg-clip-text text-transparent">
              Все
            </span>
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#5046e6] bg-clip-text text-transparent ml-3">
              клиенты
            </span>

            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#5046e6] to-[#7c3aed] rounded-full"></span>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#7c3aed] to-[#5046e6] rounded-full opacity-70"></span>
          </h1>
          <div className='mt-[50px] '>
            <MarqueeDemo />
          </div>
          <div className='mt-[100px] '>
            <CtaBanner/>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
