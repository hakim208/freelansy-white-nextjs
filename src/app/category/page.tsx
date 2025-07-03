"use client"
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React from 'react'
import CalendarPicker from '../components/calendarPicker'

const Category = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[100px] w-[80%] m-auto '>
        <div className='flex w-full items-center justify-between '>
          <CalendarPicker />
          <div className='w-[55%] '>
            <div className="w-full relative flex items-center  bg-purple-50 hover:bg-purple-100
            p-[8px_20px]
              border border-purple-200
              rounded-lg
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-300
          hover:scale-105
          active:scale-95">
              {/* Input барои ҷустуҷӯ */}
              <input
                type="text"
                placeholder="Поиск..."
                className="
                outline-0
                border-0
            w-full
        "
              />

              {/* Кнопкаи ҷустуҷӯ */}
              <button
                className="
          p-[5px_20px]
          bg-purple-500 hover:bg-purple-600
          text-white
          rounded-lg
          transition-all duration-300
          hover:scale-105
          active:scale-95
        "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>

              </button>
            </div>
          </div>
          <div className='w-[15%] '>
            <div className="w-full relative flex items-center gap-[5px]  bg-purple-50 hover:bg-purple-100
            p-[8px_10px]
              border border-purple-200
              rounded-lg
              transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-300
          hover:scale-105
          active:scale-95">

              <input type="number" className='w-[40%] p-[5px] border-0 outline-0 bg-gray-200 rounded-[5px] ' placeholder='min..' />
              <input type="number" className='w-[40%] p-[5px] border-0 outline-0 bg-gray-200 rounded-[5px] ' placeholder='max..' />

              <button
                className="
          p-[5px_10px]
          bg-purple-500 hover:bg-purple-600
          text-white
          rounded-lg
          transition-all duration-300
          hover:scale-105
          active:scale-95
        "
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>

              </button>
            </div>
          </div>
        </div>
        <div className='flex w-full items-center justify-between p-4'>
          <h1 className='text-[23px] font-medium text-gray-900 hover:text-purple-200 focus:text-purple-200 cursor-pointer transition duration-200'>Категории</h1>
          <h1 className='text-[23px] font-medium text-gray-900 hover:text-purple-200 focus:text-purple-200 cursor-pointer transition duration-200'>Все заказы</h1>
          <h1 className='text-[23px] font-medium text-gray-900 hover:text-purple-200 focus:text-purple-200 cursor-pointer transition duration-200'>Топ фрилансеры</h1>
        </div>
        <div>
          
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Category
