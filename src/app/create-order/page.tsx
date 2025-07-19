"use client"
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from '@/components/ui/button'
import { getOrdersAtom } from '@/store/registerSlice'
import axios from 'axios'
import { useAtom } from 'jotai'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CreateOrder = () => {
  const roleUser = localStorage.getItem("roleUser")
  const [data, setData] = useAtom(getOrdersAtom)
  const [loading, setLoading] = useState(true)
  const id = localStorage.getItem("acssec_token")

  async function getOrders() {
    try {
      setLoading(true)
      const res = await axios.get("https://43baa55b08d805d5.mokky.dev/user")
      setData(res.data)
    } catch (error) {
      console.error("Ошибка при получении данных:", error)
    } finally {
      setLoading(false)
    }
  }

  const user = data.find((e) => e.id == id)

  useEffect(() => {
    getOrders()
  }, [])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className='pt-[100px] min-h-screen bg-gray-50'>
        <div className='w-[90%] md:w-[80%] m-auto'>
          {roleUser == "client" ? (
            <ClientView user={user} getOrders={getOrders} />
          ) : (
            <FreelancerView user={user} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

const ClientView = ({ user, getOrders }) => {
  const [creatingOrder, setCreatingOrder] = useState(false)

  const handleCreateOrder = async () => {
    try {
      setCreatingOrder(true)
      await getOrders()
    } catch (error) {
      console.error("Ошибка при создании заказа:", error)
    } finally {
      setCreatingOrder(false)
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <Button
          onClick={handleCreateOrder}
          disabled={creatingOrder}
          variant="default"
          className="mx-auto bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6"
        >
          {creatingOrder ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Создание...
            </>
          ) : (
            <Link href={"/create-order/addOrders"}>
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 inline-block mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Создать заказ
              </>
            </Link>
          )}
        </Button>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-purple-800 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 inline-block mr-2 text-purple-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
            </svg>
            Ваши фриланс-заказы
          </h1>
          <p className="mt-2 text-gray-600">Управляйте своими проектами и находите новых клиентов</p>

          {!user?.orders?.length ? (
            <EmptyState />
          ) : (
            <div className="mt-6 space-y-6">
              {user.orders.map(order => (
                <OrderCard key={order.ordersId} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

const FreelancerView = ({ user }) => {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Фриланс Панель</h1>
      <p className="text-gray-600 mb-6">Здесь будут отображаться доступные заказы</p>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Ваш профиль</h2>
        <p className="text-gray-700">{user?.name || 'Пользователь'}</p>
      </div>
    </div>
  )
}

const EmptyState = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
      className="w-24 h-24 text-gray-400 opacity-60 mb-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
    <h3 className="text-xl font-medium text-gray-500">Заказов пока нет</h3>
    <p className="text-gray-400 mt-2">Создайте первый заказ и начните работать</p>
  </div>
)

const OrderCard = ({ order }) => (
  <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-xl font-bold text-purple-800">Заказ #</h2>
      <div className="flex items-center bg-purple-50 px-3 py-1 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-purple-600 mr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
        <span className="font-bold text-purple-700">{order.amount} TJS</span>
      </div>
    </div>

    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Требуемые навыки:</h3>
      <div className="flex flex-wrap gap-2">
        {order.skills.split(' ').map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="mb-5">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Описание:</h3>
      <div className="prose prose-sm text-gray-700">
        {order.description.split('---').map((paragraph, i) => (
          <p key={i} className="mb-3 last:mb-0">{paragraph.trim()}</p>
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        {new Date(order.startDate).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })}
      </div>

      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
        Откликнуться
      </button>
    </div>
  </div>
)

export default CreateOrder