"use client"

import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import axios from 'axios'
import Image from 'next/image'
import { Button } from '@/lib/ui/button'
import { useRouter } from 'next/navigation'
import { Calendar, Search, Star, TrendingUp } from 'lucide-react'

interface Order {
  ordersId: string
  skills: string
  amount: number | string
  description: string
  startDate: string
  // добавьте другие поля, если есть
}

interface User {
  id: number
  name: string
  surname?: string
  img?: string
  roleUser: "client" | "freelancer" | string
  orders?: Order[]
}

const Orders: React.FC = () => {
  const [data, setData] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user")
      .then(res => setData(res.data))
      .catch(err => console.error("Ошибка:", err))
  }, [])

  const flatOrders = data.flatMap(user =>
    user.orders?.map(order => ({
      userId: user.id,
      name: user.name,
      surname: user.surname ?? "",
      img: user.img,
      roleUser: user.roleUser,
      order
    })) || []
  )

  const filteredOrders = flatOrders.filter(({ order }) =>
    [order.skills, String(order.amount), order.description].some(field =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  )
 
  const onOrderClick = (userId: number, ordersId: string) => {
    localStorage.setItem("ordersId", ordersId)
    router.push(`/orders/${userId}`)
  }

  const clients = data.filter(u => u.roleUser === "client").map(u => u.id);

  const clientOrders = filteredOrders.filter(order => clients.includes(order.userId));


  return (
    <ProtectedRoute>
      <div className='pt-[60px] w-full m-auto pb-[60px] '>
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 py-6 md:py-8">
          <div className="w-full md:w-[80%] mx-auto px-2 md:px-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Категории заказов</h1>
            <p className="text-sm md:text-base text-purple-100">Найдите идеальный проект для себя</p>
          </div>
        </div>

        <div className='w-full md:w-[80%] m-auto px-2 md:px-0'>
          <div className='flex flex-col md:flex-row w-full items-center justify-between'>
            <div className="w-full md:w-[56%] mt-4 md:mt-[30px] mb-3 md:mb-[20px]">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex flex-col justify-between md:flex-row items-center bg-white/80 backdrop-blur-sm hover:bg-white p-3 md:p-4 border border-purple-200/50 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  <div className="flex w-full md:w-auto items-center mb-2 md:mb-0">
                    <Search className="w-5 h-5 text-purple-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Поиск проектов..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="outline-0 border-0 w-full bg-transparent text-gray-700 placeholder-gray-400 text-base md:text-lg"
                    />
                  </div>
                  <button
                    className="ml-0 md:ml-4 w-full md:w-auto px-4 md:px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg font-medium text-sm md:text-base"
                    onClick={() => { }}
                  >
                    Найти
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 group cursor-pointer mt-4 md:mt-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
              Все заказы
            </h1>
          </div>

          <div className='flex flex-col md:flex-row items-start justify-between'>
            <div className="w-full md:w-[78%] mt-4 md:mt-[30px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredOrders.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-8 md:py-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-base md:text-lg font-medium">Ничего не найдено</p>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">Попробуйте изменить параметры поиска</p>
                  </div>
                )}

                {clientOrders.map(({ userId, name, surname, img, order }, index) => (
                  <div
                    key={`${userId}-${index}`}
                    onClick={() => onOrderClick(userId, order.ordersId)}
                    className="group relative bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative p-4 md:p-6">
                      <div className="flex items-start justify-between mb-3 md:mb-4">
                        <div className="relative">
                          <Image
                            src={
                              img && img.trim() !== ""
                                ? img
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"
                            }
                            alt="avatar"
                            className="rounded-full w-10 h-10 md:w-12 md:h-12 border-2 border-white shadow-md"
                            width={48}
                            height={48}
                          />
                        </div>

                        <div className="flex items-center gap-2 bg-purple-50 px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
                          <span className="text-xs text-purple-700">
                            {new Date(order.startDate).toLocaleDateString("ru-RU", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-purple-700 transition-colors">
                        {name} {surname}
                      </h3>

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg md:rounded-xl p-3 md:p-4 mb-3 md:mb-4 min-h-[60px] md:min-h-[70px] flex items-center">
                        <p className="text-xs md:text-sm text-gray-700 font-medium line-clamp-2 leading-relaxed">{order.skills}</p>
                      </div>

                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl md:text-2xl font-bold text-gray-900">{order.amount}</span>
                          <span className="text-xs md:text-sm font-medium text-gray-500">TJS</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs md:text-sm font-medium text-gray-600">4.8</span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base">
                        Подробнее
                      </Button>
                    </div>

                    <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full opacity-50" />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[20%] mt-6 md:mt-0 space-y-6">
              {/* Top Freelancers */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Топ фрилансеры</h2>
                <div className="space-y-3">
                  {data
                    .filter((u) => u.roleUser === "freelancer")
                    .slice(0, 6)
                    .map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors duration-300 cursor-pointer"
                      >
                        <Image
                          src={e.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                          className="rounded-full w-9 h-9 md:w-10 md:h-10 border-2 border-white"
                          width={40}
                          height={40}
                          alt="photo"
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-medium text-gray-800 truncate">{e.name}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Top Clients */}
              <div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Топ заказчики</h2>
                <div className="space-y-3">
                  {data
                    .filter((u) => u.roleUser === "client")
                    .slice(0, 6)
                    .map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
                      >
                        <Image
                          src={e.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                          className="rounded-full w-9 h-9 md:w-10 md:h-10 border-2 border-white"
                          width={40}
                          height={40}
                          alt="photo"
                        />
                        <div className="flex-1">
                          <p className="text-sm md:text-base font-medium text-gray-800 truncate">{e.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Активный заказчик</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Orders