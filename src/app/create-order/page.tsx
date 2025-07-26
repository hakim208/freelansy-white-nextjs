"use client"

import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import AddFrelansyOrders from './addFrelansyOrders/page'

// TYPES
interface Order {
  ordersId: string
  amount: number
  skills: string
  description: string
  startDate: string
}

interface User {
  id: string
  orders: Order[]
}

const CreateOrder: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [roleUser, setRoleUser] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setId(localStorage.getItem('acssec_token'));
      setRoleUser(localStorage.getItem('roleUser'));
    }
  }, []);

  const getOrders = useCallback(async () => {
    if (!id) return; // Если id нет, не делать запрос

    try {
      setLoading(true);
      const res = await axios.get<User[]>('https://43baa55b08d805d5.mokky.dev/user');
      const foundUser = res.data.find((e: User) => e.id === id) || null;
      setUser(foundUser);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (loading || !user || !roleUser) {
    {
      return (
        <ProtectedRoute>
          <div className="pt-[100px] flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        </ProtectedRoute>
      );
    }

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
      <div className="pt-[100px] min-h-screen bg-gray-50">
        <div className="w-[90%] md:w-[80%] m-auto">
          {roleUser === 'client' ? (
            <ClientView user={user} reload={getOrders} />
          ) : (
            <FreelancerView user={user} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}

interface ClientViewProps {
  user: User
  reload: () => Promise<void>
}

const ClientView: React.FC<ClientViewProps> = ({ user, reload }) => {
  const [creatingOrder, setCreatingOrder] = useState(false)

  const handleCreateOrder = async () => {
    try {
      setCreatingOrder(true)
      await reload()
    } catch (error) {
      console.error('Ошибка при создании заказа:', error)
    } finally {
      setCreatingOrder(false)
    }
  }

  return (
    <div className="text-center mb-8">
      <div className="flex items-center gap-[30px] justify-center">
        <Link href="/create-order/addOrders">
          <Button
            onClick={handleCreateOrder}
            disabled={creatingOrder}
            variant="default"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            {creatingOrder ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Создание...
              </>
            ) : (
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
            )}
          </Button>
        </Link>

        <Link href="/create-order/completedOrder">
          <Button
            variant="default"
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            Готовый заказ
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-purple-800 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text inline-block">
          Ваши фриланс-заказы
        </h1>
        <p className="mt-2 text-gray-600">Управляйте своими проектами и находите новых клиентов</p>

        {!user.orders.length ? (
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
  )
}

const FreelancerView: React.FC<{ user: User }> = () => (
  <div>
    <AddFrelansyOrders />
  </div>
)

const EmptyState: React.FC = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <svg
      className="w-24 h-24 text-gray-400 opacity-60 mb-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    <h3 className="text-xl font-medium text-gray-500">Заказов пока нет</h3>
    <p className="text-gray-400 mt-2">Создайте первый заказ и начните работать</p>
  </div>
)

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6">
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Требуемые навыки:</h3>
      <div className="flex flex-wrap gap-2">
        {order.skills.split(' ').map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
)

export default CreateOrder