"use client"

import React, { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import axios from 'axios'
import { useAtom } from 'jotai'
import { getOrdersAtom } from '@/store/registerSlice'
import Image from 'next/image'
import { Button } from '@/lib/ui/button'
import { useRouter } from 'next/navigation'

const Orders = () => {
  const [data, setData] = useAtom(getOrdersAtom)
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    axios.get("https://43baa55b08d805d5.mokky.dev/user")
      .then(res => setData(res.data))
      .catch(err => console.error("Ошибка:", err))
  }, [])

  const flatOrders = data.flatMap(user =>
    user.orders?.map(order => ({
      userId: user.id,
      name: user.name,
      surname: user.surname,
      img: user.img,
      roleUser: user.roleUser,
      order
    })) || []
  )

  const filteredOrders = flatOrders.filter(({ order }) =>
    [order.skills, order.amount, order.description].some(field =>
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
      <div className='pt-[100px] w-[80%] m-auto'>
        <div className='flex w-full items-center justify-between'>
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
        </div>

        <div className='flex w-full items-center justify-between p-[20px_0px] '>
          <h1 className='text-[23px] font-medium text-gray-900 hover:text-purple-400 cursor-pointer transition duration-200'>Все заказы</h1>
          <h1 className='text-[23px] w-[20%] font-medium text-gray-900 hover:text-purple-400 cursor-pointer transition duration-200'>Топ фрилансеры</h1>
        </div>

        <div className='flex items-start justify-between'>
          <div className='w-[78%]'>
            <div className="flex flex-wrap justify-between gap-4">
              {filteredOrders.length === 0 && (
                <p className="w-full text-center text-gray-500">Ничего не найдено</p>
              )}
              {
                clientOrders.map(({ userId, name, surname, img, order }, index) => (
                  <div
                    key={`${userId}-${index}`}
                    onClick={() => onOrderClick(userId, order.ordersId)}
                    className="p-4 hover:scale-105 transition-transform duration-200 cursor-pointer border w-[31%] flex flex-col gap-[15px] rounded-lg bg-white"
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
                        <div className='text-[12px] flex items-center gap-[10px] font-medium '>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-purple-800 ">
                            <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                          </svg>
                          {new Date(order.startDate).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-[15px] font-bold text-purple-800">{name} {surname}</p>
                    <div className='bg-purple-50 h-[50px] p-2 rounded-lg mb-2 overflow-hidden'>
                      <p className="text-sm text-gray-700 mb-1 font-medium truncate">
                        {order.skills}
                      </p>
                    </div>
                    <div className='flex items-center gap-[10px] '>
                      <p className='font-bold'>{order.amount} TJS</p>
                    </div>
                    <Button variant="destructive">Подробнее</Button>
                  </div>
                )
                )
              }
            </div>
          </div>

          <div className='w-[20%] flex flex-col gap-[5px] '>
            {data.filter(u => u.roleUser === "freelancer").slice(0, 6).map(e => (
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
            {data.filter(u => u.roleUser === "client").slice(0, 6).map(e => (
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

export default Orders