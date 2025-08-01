"use client";

import axios from 'axios';
import { CheckCircleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from '@/components/protectedRoute/protectedRoute';

interface AcceptedWork {
  clientId: string;
  url: string;
  accepted: boolean;
  description: string;
  nameFrelanser: string;
  emailFrelanser: string;
  clientOrderId: number;
  id: string;
  confirmed?: boolean;
  pending?: boolean;
}

interface User {
  id: number;
  acceptedWork?: AcceptedWork[];
  orders?: AcceptedWork[];
}

const CompletedOrder: React.FC = () => {
  const [order, setOrder] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("acssec_token") : null

  useEffect(() => {
    if (!token) return;

    async function getAcceptedWork() {
      try {
        setLoading(true);
        const res = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user");
        setOrder(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    }

    getAcceptedWork();
  }, [token]);

  async function SendOrder(userId: number, clientId: string, orderObj: AcceptedWork) {
    try {
      const client = order.find(e => e.id === Number(clientId));
      const freelansy = order.find(e => e.id === Number(token));

      if (!client || !freelansy) {
        console.error("Клиент или фрилансер не найден");
        toast.error("Пользователь не найден");
        return;
      }

      // Обновляем заказы клиента
      const updatedOrders = client.orders?.map(order =>
        order.clientOrderId === userId ? { ...order, confirmed: true } : order
      );

      // Обновляем acceptedWork фрилансера
      const updatedAcceptedWork = freelansy.acceptedWork?.map(work =>
        work.id === orderObj.id ? { ...work, accepted: true } : work
      );

      // Патчим клиента
      await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${clientId}`, {
        orders: updatedOrders,
      });

      // Патчим фрилансера
      await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${freelansy.id}`, {
        acceptedWork: updatedAcceptedWork,
      });

      toast.success("Ваш заказ готов!");

      setOrder(prev =>
        prev.map(u => {
          if (u.id === client.id) {
            return { ...u, orders: updatedOrders };
          }
          if (u.id === freelansy.id) {
            return { ...u, acceptedWork: updatedAcceptedWork };
          }
          return u;
        })
      );

    } catch (error) {
      console.error("❌ Ошибка при обновлении заказа:", error);
      toast.error("Ошибка при обновлении заказа");
    }
  }

  if (!token) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] flex justify-center items-center h-screen">
          <p className="text-gray-500">Пользователь не авторизован</p>
        </div>
      </ProtectedRoute>
    );
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  const userOrders = order.find((e) => Number(e.id) === Number(token));

  return (
    <ProtectedRoute>
      <div className="pt-[100px] w-[80%] pb-[50px] m-auto">
        <Toaster />
        <div className="w-[100%] flex flex-wrap gap-4">
          {(userOrders?.acceptedWork?.length ?? 0) > 0 ? userOrders?.acceptedWork?.map((e, i) => (
            <div
              key={e.id || i}
              className="border border-purple-100 p-4 mb-4 bg-white rounded-lg w-[33%] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-purple-700 font-medium">Имя фрилансера:</p>
                  <p className="text-gray-800">{e.nameFrelanser}</p>
                </div>

                <div>
                  <p className="text-purple-700 font-medium">Email:</p>
                  <p className="text-gray-800">{e.emailFrelanser}</p>
                </div>

                <div>
                  <p className="text-purple-700 font-medium">Описание:</p>
                  <p className="text-gray-800">{e.description}</p>
                </div>

                {e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-purple-600 hover:text-purple-800 underline underline-offset-2"
                  >
                    Смотреть проект
                  </a>
                )}
              </div>
              {!e.accepted ? (
                <div className="flex gap-2 pt-2 border-t border-purple-50">
                  <button className="flex-1 py-2 bg-white text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50 transition-colors">
                    Отказать
                  </button>
                  <button
                    onClick={() => SendOrder(e.clientOrderId, e.clientId, e)}
                    className="flex-1 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Принять
                  </button>
                </div>
              ) : (
                <div className="w-full flex items-center gap-2 bg-green-500/10 p-3 rounded text-green-700">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span>Заказ принят</span>
                </div>
              )}
            </div>
          )) : (
            <div className="w-full h-[80vh] flex flex-col items-center justify-center p-6 text-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-500 font-medium">У вас нет готовых заказов</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CompletedOrder;
