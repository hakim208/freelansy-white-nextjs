"use client";

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"; import toast, { Toaster } from "react-hot-toast"
import { CheckCircle } from "lucide-react";

interface Order {
  ordersId: string
  startDate: string
  skills: string
  description: string
  projectDetails: string | number
  amount: number
}

interface User {
  id: string
  name: string
  surname: string
  img?: string
  orders: Order[]
}

const OrderById: React.FC = () => {
  const params = useParams() as { id: string }
  const { id } = params

  const [data, setData] = useState<User[]>([])
  const [orderId, setOrderId] = useState<string | null>(null)
  const [roleUser, setRoleUser] = useState<string | null>(null)

  useEffect(() => {
    setOrderId(localStorage.getItem("ordersId"))
    setRoleUser(localStorage.getItem("roleUser"))
  }, [])


  const userIdFun = data.find((e) => String(e.id) === String(id))
  const ordersIdFun = userIdFun?.orders.find((e) => e.ordersId === orderId)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function addOrder() {
    if (!ordersIdFun) {
      toast.error("Информация о заказе отсутствует")
      return
    }
    try {
      const user = localStorage.getItem("acssec_token")
      if (!user) {
        toast.error("Пользователь не авторизован")
        return
      }
      const clientId = userIdFun?.id

      const res = await axios.get<User>(`https://43baa55b08d805d5.mokky.dev/user/${user}`)
      const currentUser = res.data

      const updatedOrders = [
        ...(currentUser.orders || []),
        {
          ...ordersIdFun,
          clientOrderId: Date.now(),
          pending: false,
          confirmed: false,
          clientId: clientId,
        },
      ]

      await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${user}`, {
        orders: updatedOrders,
      })

      toast.success("Проект успешно принят!")
    } catch (error) {
      console.error(error)
      toast.error("Ошибка при принятии проекта")
    }
  }

  const [alreadyAccepted, setAlreadyAccepted] = useState(false)

  useEffect(() => {
    async function checkIfAlreadyAccepted() {
      const user = localStorage.getItem("acssec_token")
      if (!user || !ordersIdFun) return

      try {
        const res = await axios.get<User>(`https://43baa55b08d805d5.mokky.dev/user/${user}`)
        const currentUser = res.data

        const found = currentUser.orders.some(
          (order) => order.ordersId === ordersIdFun.ordersId
        )

        if (found) {
          setAlreadyAccepted(true)
        }
      } catch (e) {
        console.error("Ошибка при проверке принятого заказа", e)
      }
    }

    checkIfAlreadyAccepted()
  }, [ordersIdFun])


  useEffect(() => {
    if (!id) return

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        if (!data || data.length === 0) {
          const res = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user")
          setData(res.data)
        }
      } catch (e) {
        setError("Ошибка при загрузке данных")
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, data])

  if (!orderId) {
    return <div className="text-center mt-10">Заказ не найден (ordersId отсутствует)</div>
  }

  if (loading) return (
    <div className="pt-[100px] flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
  if (error) return <div>{error}</div>

  return (
    <div className="pt-[60px] pb-[30px] md:pt-[100px] md:pb-[50px]">
      <Toaster />
      {/* Hero Section */}
      <div className="relative w-[90%] md:w-[70%] mx-auto flex flex-col md:flex-row items-center p-6 md:p-10 justify-center md:justify-around rounded-2xl
        bg-gradient-to-br from-purple-50 via-white to-purple-100
        shadow-[0_10px_30px_-15px_rgba(124,58,237,0.3)]
        hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.4)]
        transition-all duration-500 overflow-hidden
        border border-purple-200 group">

        {/* Decorative circles */}
        <div className="absolute -right-5 -top-5 w-20 h-20 md:-right-10 md:-top-10 md:w-40 md:h-40 rounded-full bg-purple-300 opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="absolute -left-3 -bottom-3 w-16 h-16 md:-left-5 md:-bottom-5 md:w-32 md:h-32 rounded-full bg-pink-300 opacity-15 group-hover:opacity-25 transition-opacity duration-700"></div>

        {/* SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-24 md:size-40 stroke-purple-600 hover:stroke-purple-700 transition-colors mb-4 md:mb-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          />
        </svg>

        {/* Text Content */}
        <div className="z-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight leading-tight">
            FREELANSY
          </h1>
          <p className="mt-2 md:mt-3 text-lg md:text-xl text-purple-700 font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
            Твоя свобода. Твой заработок.
          </p>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="w-[90%] md:w-[70%] m-auto mt-6 md:mt-[40px] px-3 md:px-[10px]">
        {userIdFun && ordersIdFun ? (
          <>
            {/* Order Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
              <h1 className="text-2xl md:text-[30px] font-medium text-purple-500">Информация о заказе</h1>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 md:size-8 text-purple-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                <div className="text-base md:text-[20px] font-medium">
                  {new Date(ordersIdFun.startDate).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <hr className="my-4 md:my-[20px]" />

            {/* Order Information */}
            <div className="flex flex-col gap-4 md:gap-[25px] items-start">
              {/* User Info */}
              <div className="flex items-center gap-4 md:gap-[20px]">
                <Image
                  src={userIdFun.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                  className="rounded-full w-12 h-12 md:w-[50px] md:h-[50px]"
                  width={50}
                  height={50}
                  alt="photo"
                />
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[10px]">
                  <p className="text-sm md:text-[15px] font-medium">{userIdFun.name}</p>
                  <p className="text-sm md:text-[15px] font-medium">{userIdFun.surname}</p>
                </div>
              </div>

              {/* Skills and Description */}
              <h1 className="text-lg md:text-[20px] font-medium">{ordersIdFun.skills}</h1>
              <h1 className="text-purple-500 text-lg md:text-[20px] font-bold">Описание</h1>
              <p className="text-sm md:text-base">{ordersIdFun.description}</p>

              {/* Project Info */}
              <div className="flex flex-col items-start gap-2 md:gap-[7px]">
                <h1 className="text-purple-500 text-base md:text-[17px] font-bold">Информация</h1>
                <h1 className="text-gray-400 text-xs md:text-[10px]">Время выполнения</h1>
              </div>

              <div className="flex items-center gap-2 md:gap-[10px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 md:size-6 text-purple-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h1 className="font-medium text-sm md:text-base">{ordersIdFun.projectDetails} дней</h1>
              </div>

              <hr className="w-full m-[20px_0px] " />

              {/* Price Section */}
              {roleUser === "freelancer" ? (
                <div className="w-full mx-auto my-4 md:my-8 p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
                  <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
                      <h1 className="text-lg md:text-xl font-bold text-gray-800">Цена проекта</h1>
                      <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                        <span className="text-xl md:text-2xl font-bold text-purple-600">{ordersIdFun.amount} TJS</span>
                      </div>
                    </div>

                    <AlertDialog>
                      {alreadyAccepted ? (
                        <div className="w-full py-3 bg-gradient-to-r from-green-300 to-emerald-500 text-white font-semibold rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                          <span>Вы уже приняли этот проект</span>
                        </div>
                      ) : (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="flex items-center justify-center gap-2 w-full py-3 bg-purple-400 hover:bg-purple-500 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-300/50 active:scale-[0.98] text-sm md:text-base">
                              Принять проект
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[90%] rounded-lg">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Ваш следующий заказ</AlertDialogTitle>
                              <AlertDialogDescription asChild>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-3 md:py-[10px] gap-2">
                                  <div className="flex items-start flex-col gap-1 md:gap-[4px]">
                                    <p className="font-semibold text-xs md:text-sm text-gray-700">Время выполнения</p>
                                    <div className="flex items-center gap-1 md:gap-[5px]">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-3 md:size-4 text-purple-500"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                      </svg>
                                      <span className="font-medium text-xs md:text-sm">{ordersIdFun.projectDetails} дней</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                                    <span className="text-base md:text-lg font-bold text-purple-600">{ordersIdFun.amount} TJS</span>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-row gap-2">
                              <AlertDialogCancel className="mt-0">Отклонить</AlertDialogCancel>
                              <AlertDialogAction onClick={addOrder} className="bg-purple-600 hover:bg-purple-700">Принять</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </AlertDialog>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-start md:items-center gap-2 md:gap-[10px] mt-0 md:mt-[-30px]">
                  <h1 className="text-base md:text-lg font-bold text-gray-800">Цена проекта</h1>
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                    <span className="text-base md:text-lg font-bold text-purple-600">{ordersIdFun.amount} TJS</span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500 text-base md:text-lg mt-6 md:mt-10">Заказ не найден 😕</div>
        )}
      </div>
    </div>
  )
}

export default OrderById