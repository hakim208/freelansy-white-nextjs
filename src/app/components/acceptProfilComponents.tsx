"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/protectedRoute/protectedRoute";
import SkeletonCard from "./skeletonCard";

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
  category: string;
}

interface User {
  id: number;
  acceptedWork?: AcceptedWork[];
  orders?: AcceptedWork[];
}

const AcceptProfilComponents: React.FC = () => {
  const [order, setOrder] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("acssec_token");
    setToken(localToken);

    if (!localToken) return;

    async function getAcceptedWork() {
      try {
        const res = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user");
        setOrder(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при загрузке данных");
      }
    }

    getAcceptedWork();
  }, []);

  if (!token) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] flex justify-center items-center h-screen">
          <p className="text-gray-500">Пользователь не авторизован</p>
        </div>
      </ProtectedRoute>
    );
  }

  const userOrders = order.find((e) => String(e.id) === token);

  return (
    <ProtectedRoute>
      <div className="w-full">
        <Toaster />

        {(userOrders?.acceptedWork?.length ?? 0) === 0 ? (
          <div className="flex flex-col gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (userOrders?.acceptedWork?.filter((w) => w.accepted).length ?? 0) > 0 ? (
          <div className="flex flex-col gap-[20px]">
            {userOrders?.acceptedWork
              ?.filter((order) => order.accepted)
              .map((order, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {order.nameFrelanser}
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {order.emailFrelanser}
                  </h3>
                  <p className="text-sm text-gray-600">{order.description}</p>

                  <div className="mt-4 text-right">
                    <span className="text-sm font-medium text-green-600">
                      Проект выполнен и подтверждён
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full h-[250px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              У вас нет готовых заказов
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Все выполненные заказы будут отображаться здесь.
              Начните работу над новым проектом или проверьте текущие задания.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                Создать заказ
              </button>
              <button className="px-5 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                Проверить задания
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AcceptProfilComponents;