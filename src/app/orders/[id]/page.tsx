"use client"
import React, { useEffect, useState } from "react"
import { useAtom } from "jotai"
import { getOrdersAtom } from "@/store/registerSlice"
import axios from "axios"
import { useParams } from "next/navigation"
import Image from "next/image"


const OrderById = () => {
  const params = useParams() as { id: string }
  const { id } = params
  const [data, setData] = useAtom(getOrdersAtom)
  const orderId = localStorage.getItem("ordersId")

  const userIdFun = data.find((e) => e.id == id)
  const ordersIdFun = userIdFun?.orders.find((e) => e.ordersId === orderId)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        if (!data || data.length === 0) {
          const res = await axios.get("https://43baa55b08d805d5.mokky.dev/user")
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
  }, [id])



  if (loading) return <div>Загрузка данных...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="pt-[100px]">
      <div className="relative w-[70%] mx-auto flex items-center p-10 justify-around rounded-2xl 
          bg-gradient-to-br from-purple-50 via-white to-purple-100
          shadow-[0_10px_30px_-15px_rgba(124,58,237,0.3)]
          hover:shadow-[0_15px_40px_-10px_rgba(124,58,237,0.4)]
          transition-all duration-500 overflow-hidden
          border border-purple-200 group">

        {/* Декоративные элементы */}
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-purple-300 opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
        <div className="absolute -left-5 -bottom-5 w-32 h-32 rounded-full bg-pink-300 opacity-15 group-hover:opacity-25 transition-opacity duration-700"></div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="size-40 stroke-purple-600 hover:stroke-purple-700 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
        <div className="z-10">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 tracking-tight leading-tight">
            FREELANSY
          </h1>
          <p className="mt-3 text-xl text-purple-700 font-semibold opacity-90 group-hover:opacity-100 transition-opacity">
            Твоя свобода. Твой заработок.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg">
              Узнать больше
            </button>
          </div>
        </div>
      </div>

      <div className="w-[70%] m-auto mt-[40px] p-[0px_10px]">
        {userIdFun && ordersIdFun ? (
          <>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-[30px] font-medium text-purple-500">Информация о заказе</h1>
              <div className="flex items-center gap-[5px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-purple-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                </svg>
                <div className="text-[20px] font-medium">
                  {new Date(ordersIdFun.startDate).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
              </div>
            </div>
            <hr className="m-[20px_0px]" />

            {/* Информация */}
            <div className="flex flex-col gap-[25px] items-start">
              {/* User */}
              <div className="flex items-center gap-[20px]">
                <Image
                  src={userIdFun.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"}
                  className="rounded-full"
                  width={50}
                  height={50}
                  alt="photo"
                />
                <div className="flex items-center gap-[10px]">
                  <p className="text-[15px] font-medium">{userIdFun.name}</p>
                  <p className="text-[15px] font-medium">{userIdFun.surname}</p>
                </div>
              </div>

              {/* Order Info */}
              <h1 className="text-[20px] font-medium">{ordersIdFun.skills}</h1>
              <h1 className="text-purple-500 text-[20px] font-bold">Описание</h1>
              <h1>{ordersIdFun.description}</h1>
              <div className="flex flex-col items-start gap-[7px]">
                <h1 className="text-purple-500 text-[17px] font-bold">Информация</h1>
                <h1 className="text-gray-400 text-[10px]">Время выполнения</h1>
              </div>
              <div className="flex items-center gap-[10px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-purple-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h1 className="font-medium">{ordersIdFun.projectDetails} дней</h1>
              </div>
              <hr />
              {/* Цена */}
              <div className="w-full mx-auto my-8 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-800">Цена проекта</h1>
                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                      <span className="text-2xl font-bold text-purple-600">{ordersIdFun.amount} TJS</span>
                    </div>
                  </div>
                  <button className="mt-2 flex items-center justify-center gap-2 w-full py-3 bg-purple-400 hover:bg-purple-500 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-300/50 active:scale-[0.98]">
                    Принять проект
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Заказ не найден</div>
        )}
      </div>
    </div>
  )

}

export default OrderById