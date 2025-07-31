import { BoxReveal } from '@/components/magicui/box-reveal'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from '@/lib/ui/button'
import Link from 'next/link'
import React from 'react'
import MySwiper from './components/swiper'
import CartCategory from './components/cartCategory'
import { MarqueeDemo } from './components/reviewCard'
import CtaBanner from './components/ctaBanner'
import Section2 from './components/section2'

const Home = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[60px] max-w-[1500px] m-auto md:pt-[30px] w-full  px-4 sm:px-6'>
        {/* Hero Section */}
        <div className='flex md:w-[83%] w-full m-auto flex-col lg:flex-row items-center justify-between min-h-[70vh] md:min-h-[90vh] gap-6 md:gap-8 py-8'>
          <div className="w-full lg:w-[45%] max-w-2xl mx-auto text-center lg:text-left">
            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Возьмите заказ
                <span className="text-[#5046e6] animate-pulse">.</span>
              </h1>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Выполните его —
                <span className="font-semibold bg-gradient-to-r from-[#7c3aed] to-[#5046e6] bg-clip-text text-transparent">
                  получите оплату
                </span>
                .<br />
                Достигните цели, двигайтесь вперёд.
              </p>
            </BoxReveal>

            <BoxReveal boxColor="#5046e6" duration={0.7}>
              <div className="md:flex hidden mt-6 md:mt-10 flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-[#5046e6] to-[#7c3aed] text-white text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 transform w-full sm:w-auto">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="text-[#5046e6] border-[#5046e6] text-sm md:text-base lg:text-lg px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl hover:bg-[#5046e6]/10 transition-colors duration-300 w-full sm:w-auto"
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            </BoxReveal>
          </div>

          {/* Image/Swiper Section */}
          <div className='w-full lg:w-[50%] relative mt-4 md:mt-0'>
            <div className=" -inset-2 md:-inset-4 bg-gradient-to-r from-[#5046e6]/20 to-[#7c3aed]/20 rounded-xl md:rounded-3xl blur-md opacity-75 animate-float"></div>
            <div className="relative rounded-lg md:rounded-2xl md:shadow-2xl border border-[#5046e6]/10">
              <MySwiper />
            </div>
          </div>
        </div>
        <div>
          <Section2/>
        </div>

        {/* Categories Section */}
        <div className='flex flex-col items-center gap-3 md:gap-[10px] my-5 md:my-[50px]'>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium font-sans text-center">
            Просмотр категории <span className="text-[#7c3aed]">заказов</span>
          </h1>
          <h1 className='text-xl md:text-2xl font-sans text-center'>
            Выберите категорию которая Вам интересна
          </h1>
        </div>

        <div className=''>
          <CartCategory />
        </div>

        {/* Clients Section */}
        <div className='mt-8 md:mt-[50px]'>
          <h1 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#5046e6] to-[#7c3aed] bg-clip-text text-transparent">
              Все
            </span>
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#5046e6] bg-clip-text text-transparent ml-2 md:ml-3">
              клиенты
            </span>

            <span className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-0.5 md:h-1 bg-gradient-to-r from-[#5046e6] to-[#7c3aed] rounded-full"></span>
            <span className="absolute -bottom-3 md:-bottom-6 left-1/2 transform -translate-x-1/2 w-20 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-[#7c3aed] to-[#5046e6] rounded-full opacity-70"></span>
          </h1>

          <div className='mt-8 md:mt-[50px]'>
            <MarqueeDemo />
          </div>

          <div className='mt-12 md:mt-[100px] mb-8 md:mb-0'>
            <CtaBanner />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
