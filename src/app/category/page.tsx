"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedRoute/protectedRoute";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, Star, TrendingUp, Users, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type Order = {
  skills: string;
  description: string;
  startDate: string;
  amount: string;
  projectDetails: string;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  roleUser: string;
  createdAt: string;
  img: string;
  orders: Order[];
};

const Category = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("acssec_token"); // Или ваш ключ
      setToken(storedToken);
    }
  }, []);

  const getOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://43baa55b08d805d5.mokky.dev/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      toast.error("Ошибка загрузки данных");
    } finally {
      setIsLoading(false);
    }
  }, [token]);


  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const flatOrders = data.flatMap((user) => {
    if (!user.orders || user.orders.length === 0) return [];
    return user.orders.map((order) => ({
      userId: user.id,
      name: user.name,
      surname: user.surname,
      img: user.img,
      roleUser: user.roleUser,
      order,
    }));
  });

  const filteredOrders = flatOrders.filter(({ order }) => {
    const searchLower = search.toLowerCase();
    return (
      order.skills.toLowerCase().includes(searchLower) ||
      order.amount.toLowerCase().includes(searchLower)
    );
  });

  const clients = data.filter((u) => u.roleUser === "client").map((u) => u.id);
  const clientOrders = filteredOrders.filter((order) =>
    clients.includes(order.userId)
  );

  function loginUser() {
    toast.error("Сначала войдите в систему!");
    router.push("/login");
  }

  if (isLoading) {
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
      <div className="min-h-screen bg-gradient-to-br pt-[80px] from-slate-50 via-purple-50 to-indigo-50">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 py-8">
          <div className="w-[80%] mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Категории заказов</h1>
            <p className="text-purple-100">Найдите идеальный проект для себя</p>
          </div>
        </div>

        <div className="pt-8 w-[80%] mx-auto">
          <div className="flex w-full items-center justify-between mb-8">
            <div className="w-[56%]">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex items-center bg-white/80 backdrop-blur-sm hover:bg-white p-4 border border-purple-200/50 rounded-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  <Search className="w-5 h-5 text-purple-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Поиск проектов, навыков, специалистов..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="outline-0 border-0 w-full bg-transparent text-gray-700 placeholder-gray-400 text-lg"
                  />
                  <button className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg font-medium">
                    Найти
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between py-6 mb-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                Все заказы
              </h1>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                Топ фрилансеры
              </h1>
            </div>
          </div>

          <div className="flex items-start justify-between gap-8">
            <div className="w-[78%]">
              <div className="flex flex-wrap justify-between gap-6">
                {clientOrders.length === 0 && (
                  <div className="w-full text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-xl text-gray-500 font-medium">Ничего не найдено</p>
                    <p className="text-gray-400 mt-2">Попробуйте изменить параметры поиска</p>
                  </div>
                )}

                {clientOrders.map(({ userId, name, surname, img, order }, index) => (
                  <Card
                    key={`${userId}-${index}`}
                    onClick={loginUser}
                    className="group cursor-pointer border-0 w-[31%] bg-white/70 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden"
                  >
                    <CardContent className="p-6 relative">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative z-10">
                        {/* Header with avatar and date */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <Image
                              src={
                                img && img.trim() !== ""
                                  ? img
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"
                              }
                              alt="avatar"
                              className="relative w-[40px] h-[40px] rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              width={40}
                              height={40}
                            />
                          </div>

                          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full group-hover:bg-purple-100 transition-colors duration-300">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">
                              {new Date(order.startDate).toLocaleDateString("ru-RU", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Client name */}
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                          {name} {surname}
                        </h3>

                        {/* Skills section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4 group-hover:from-purple-100 group-hover:to-blue-100 transition-all duration-300">
                          <p className="text-sm text-gray-700 font-medium line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
                            {order.skills}
                          </p>
                        </div>

                        {/* Price and button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {order.amount}
                            </span>
                            <span className="text-sm font-medium text-gray-500">TJS</span>
                          </div>

                          <Button
                            variant="destructive"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="w-[20%] space-y-8">
              {/* Top Freelancers */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {data
                      .filter((u) => u.roleUser === "freelancer")
                      .slice(0, 6)
                      .map((e, index) => (
                        <div
                          key={e.id}
                          className="group flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:from-orange-50 hover:to-red-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <Image
                              src={
                                e.img && e.img.trim() !== ""
                                  ? e.img
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"
                              }
                              className="relative rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                              width={35}
                              height={35}
                              alt="photo"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                              {e.name}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Clients */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Топ заказчики
                </h2>
              </div>
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {data
                      .filter((u) => u.roleUser === "client")
                      .slice(0, 6)
                      .map((e, index) => (
                        <div
                          key={e.id}
                          className="group flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                            <Image
                              src={
                                e.img && e.img.trim() !== ""
                                  ? e.img
                                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFaXtvRYynJHeIfyEKbSr7YCZI3ycZ_0MlA&s"
                              }
                              className="relative rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                              width={40}
                              height={40}
                              alt="photo"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                              {e.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Активный заказчик</p>
                          </div>
                          <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-medium">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Category