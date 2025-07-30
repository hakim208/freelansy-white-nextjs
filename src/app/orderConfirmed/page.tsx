"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoginOrdersCompanents from "../components/loginOrdersCompanents";

type Order = {
  ordersId: string;
  projectDetails: string;
  amount: number;
  category?: string;
  startDate?: string;
  skills?: string;
  description?: string;
  confirmed?: boolean;
  pending?: boolean;
};

type User = {
  id: number;
  roleUser: string;
  orders?: Order[];
};

const OrderConfirmed = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = typeof window !== "undefined" ? localStorage.getItem("acssec_token") : null

  async function getUsers() {
    try {
      setLoading(true);
      const res = await axios.get<User[]>(
        "https://43baa55b08d805d5.mokky.dev/user"
      );
      console.log(res);

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    getUsers();
  }, []);

  if (!userId) {
    return <LoginOrdersCompanents/>;
  }

  if (loading) {
    return <LoginOrdersCompanents/>
  }

  const userOrders = data.find((e) => String(e.id) === String(userId));

  const confirmedOrders =
    userOrders?.orders?.filter((order) => order.confirmed && order.pending) ??
    [];

  return (
    <div className="space-y-4">
      {confirmedOrders.length > 0 ? (
        confirmedOrders.map((order, index) => (
          <div
            key={order.ordersId || index}
            className="w-full h-[200px] md:h-[230px] bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-purple-200 p-5 mb-4 overflow-hidden flex flex-col hover:scale-[1.01] group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  {order.category || "Без категории"}
                </h3>
                <p className="text-sm text-purple-400 mt-1">
                  📅{" "}
                  {order.startDate
                    ? new Date(order.startDate).toLocaleDateString("ru-RU")
                    : "Не указано"}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-300 text-purple-800">
                Выполнено успешно
              </span>
            </div>

            <div className="mb-3 flex-grow">
              <p className="font-semibold text-gray-700 mb-1">
                {order.skills || "Навыки не указаны"}
              </p>
              <p className="text-gray-500 text-sm line-clamp-2 group-hover:text-gray-700 transition-colors">
                {order.description || "Описание отсутствует..."}
              </p>
            </div>

            <div className="flex justify-end items-center">
              <div className="flex">
                <span className="text-xl font-bold text-purple-600">
                  {order.amount ? `${order.amount} TJS` : "Цена не указана"}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[200px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-4">
          <svg
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-500">Заказ не найден</h3>
          <p className="text-sm text-gray-400 mt-1">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmed;