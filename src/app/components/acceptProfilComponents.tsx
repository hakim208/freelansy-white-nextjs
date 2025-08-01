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
  const [louding, setLouding] = useState<boolean >(false);

  useEffect(() => {
    const localToken = localStorage.getItem("acssec_token");
    setLouding(true)
    setToken(localToken);

    if (!localToken) return;

    async function getAcceptedWork() {
      try {
        const res = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user");
        setOrder(res.data);
        setLouding(false)
      } catch (error) {
        console.error(error);
        toast.error("Ошибка при загрузке данных");
        setLouding(false)
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

        {louding ? (
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
          <div className="w-full h-[180px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              У вас нет готовых заказов
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Все выполненные заказы будут отображаться здесь.
              Начните работу над новым проектом или проверьте текущие задания.
            </p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AcceptProfilComponents;