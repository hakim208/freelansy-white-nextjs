"use client"

import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import axios from 'axios'
import { useAtom } from 'jotai'
import { getOrdersAtom } from '@/store/registerSlice'
import Image from 'next/image'
import { Button } from '@/lib/ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export type Order = {
  skills: string
  description: string
  startDate: string
  amount: string
  projectDetails: string
}

export type User = {
  id: number
  name: string
  surname: string
  email: string
  password: string
  roleUser: string
  createdAt: string
  img: string
  orders: Order[]
}

const Category = () => {
  const [data, setData] = useAtom(getOrdersAtom)
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  async function getOrders() {
    try {
      const res = await axios.get("https://43baa55b08d805d5.mokky.dev/user")
      setData(res.data)
    } catch (error) {
      console.error("Ошибка при получении данных:", error)
    }
  }

  // Создаем плоский массив карточек — каждая карточка = 1 заказ с данными пользователя
  const flatOrders = data.flatMap(user => {
    if (!user.orders || user.orders.length === 0) return []
    return user.orders.map(order => ({
      userId: user.id,
      name: user.name,
      surname: user.surname,
      img: user.img,
      roleUser: user.roleUser,
      order
    }))
  })

  const filteredOrders = flatOrders.filter(({ order }) => {
    const matchesSearch =
      order.skills.toLowerCase().includes(search.toLowerCase()) ||
      order.amount.toLowerCase().includes(search.toLowerCase())

    return matchesSearch
  })

  function loginUser() {
    toast.error("Сначала войдите в систему!")
    router.push("/login")
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <ProtectedRoute>
      <div className='pt-[100px] w-[80%] m-auto'>
        {/* Top Controls */}
        <div className='flex w-full items-center justify-between'>
          {/* Search */}
          <div className='w-[56%]'>
            <div className="w-full relative flex items-center bg-purple-50 hover:bg-purple-100 p-[8px_20px] border border-purple-200 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 hover:scale-105 active:scale-95">
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-0 border-0 w-full bg-transparent"
              />
              <button className="p-[5px_20px] bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Min / Max Filter */}
          <div className='w-[14%]'>
            <div className="w-full flex items-center gap-[5px] bg-purple-50 hover:bg-purple-100 p-[8px_10px] border border-purple-200 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
              <input
                type="text"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className='w-[40%] p-[5px] border-0 outline-0 bg-gray-200 rounded-[5px]'
                placeholder='min..'
              />
              <input
                type="text"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className='w-[40%] p-[5px] border-0 outline-0 bg-gray-200 rounded-[5px]'
                placeholder='max..'
              />
              <button className="p-[5px_10px] bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className='flex w-full items-center justify-between p-[20px_0px] '>
          <h1 className='text-[23px] w-[23%] font-medium text-gray-900 hover:text-purple-400 cursor-pointer transition duration-200'>Категории</h1>
          <h1 className='text-[23px] w-[56%] font-medium text-gray-900 hover:text-purple-400 cursor-pointer transition duration-200'>Все заказы</h1>
          <h1 className='text-[23px] font-medium text-gray-900 hover:text-purple-400 cursor-pointer transition duration-200'>Топ фрилансеры</h1>
        </div>

        {/* List Rendering */}
        <div className='flex items-start justify-between '>
          <div className='w-[23%] '></div>
          <div className='w-[56%]'>
            <div className="flex flex-wrap justify-between gap-4">
              {filteredOrders.length === 0 && (
                <p className="w-full text-center text-gray-500">Ничего не найдено</p>
              )}
              {filteredOrders.map(({ userId, name, surname, img, order }, index) => (
                <div
                  key={`${userId}-${index}`}
                  onClick={loginUser}
                  className="p-4 hover:scale-105 transition-transform duration-200 cursor-pointer border w-[48%] flex flex-col gap-[15px] rounded-lg bg-white"
                >
                  <div className='flex items-start w-full justify-between '>
                    <Image
                      src={img && img.trim() !== "" ? img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                      alt="avatar"
                      className="rounded-full mb-2"
                      width={30}
                      height={30}
                    />
                    <div className='flex items-center gap-[5px] '>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-purple-700 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                      </svg>
                      <div className='text-[12px] font-medium '>
                        {new Date(order.startDate).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>
                  <p className="text-[15px] font-bold text-purple-800">{name} {surname}</p>

                  <div className='bg-purple-50 p-2 rounded-lg mb-2'>
                    <p className="text-sm text-gray-700 mb-1 font-medium">
                      {order.skills}
                    </p>
                    <div className='flex items-center gap-[10px] '>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="size-6 text-purple-600">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                      <p className='font-bold'>{order.amount} TJS</p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        alert(`Навыки: ${order.skills}\nОписание: ${order.description}\nСумма: ${order.amount} TJS`)
                      }}
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar for top freelancers and clients */}
          <div className='w-[15%] flex flex-col gap-[5px] '>
            <p className='text-[20px] font-bold text-gray-900 mb-2'>Топ фрилансеры</p>
            {data && data.filter(u => u.roleUser === "freelancer").slice(0, 6).map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-5 p-1 bg-gray-100 rounded-xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <Image
                  src={e.img && e.img.trim() !== "" ? e.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt="photo"
                />
                <p className="text-base font-bold">{e.name}</p>
              </div>
            ))}

            <p className='text-[20px] font-bold text-gray-900 mt-6 mb-2'>Топ заказчики</p>
            {data && data.filter(u => u.roleUser === "client").slice(0, 6).map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-5 p-1 bg-gray-100 rounded-xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <Image
                  src={e.img && e.img.trim() !== "" ? e.img : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                  className="rounded-full"
                  width={40}
                  height={40}
                  alt="photo"
                />
                <p className="text-base font-bold">{e.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Category