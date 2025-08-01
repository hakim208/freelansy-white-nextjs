"use client";

import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import axios from 'axios';
import { CheckCircle, Folder, PencilIcon, Sparkles, Wallet } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import ProfilOrdersComponents from '../components/profilOrdersComponents';
import AcceptProfilComponents from '../components/acceptProfilComponents';
import IncomeProfilComponents from '../components/incomeProfilComponents';
import { motion, AnimatePresence } from "framer-motion";

type Order = {
  amount: string;
  category: string;
  clientId: number;
  clientOrderId: number;
  confirmed: boolean;
  description: string;
  ordersId: string;
  pending: boolean;
  projectDetails: string;
  skills: string;
  startDate: string;
};

type AcceptedWork = {
  accepted: boolean;
  // другие поля при необходимости
};

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  img?: string;
  roleUser: "client" | "freelancer";
  orders?: Order[];
  acceptedWork?: AcceptedWork[];
  createdAt: string;
  pending: boolean;
  confirmed: boolean;
};

// Вынесем мотивационные сообщения из компонента,
// чтобы не создавать их при каждом рендере
const motivationalMessages = [
  "Сегодня — твой день. ✨",
  "Ты силён, умён и идёшь вперёд, несмотря ни на что.",
  "Каждый шаг — это рост.",
  "Каждая задача — шанс стать ещё лучше.",
  "Горжусь твоим прогрессом. 🚀",
  "Ты справишься. Всегда.",
  "Никогда не сдавайся — ты ближе к цели, чем кажется.",
  "Ошибки — это опыт, а опыт делает тебя сильнее.",
  "Продолжай — успех уже рядом. 💪",
  "Твоя энергия — твоя суперсила. ⚡️"
];

const Profile: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    const tokenStr = localStorage.getItem("acssec_token");
    if (!tokenStr) return;

    async function getUserProfile() {
      try {
        const res = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUserProfile();
  }, []);

  useEffect(() => {
    const tokenStr = localStorage.getItem("acssec_token");
    const token = tokenStr ? Number(tokenStr) : NaN;
    if (!isNaN(token) && data.length > 0) {
      const found = data.find((e) => e.id === token);
      setUser(found);
    }
  }, [data]);

  const motivational = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
  }, []);

  if (!user) {
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
      <div className="flex justify-between md:flex-row flex-col md:pt-[0px] pt-[20px] items-start">
        <div className="w-full md:w-[70%] flex flex-col gap-[30px]">
          <div className="flex justify-between gap-2 md:gap-3">
            {/* Projects Card */}
            <div
              style={{ borderColor: activePage === 1 ? "red" : "white", borderWidth: "1px", borderStyle: "solid" }}
              onClick={() => setActivePage(1)}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl text-center border border-blue-200 transition-all flex-1 overflow-hidden shadow-md md:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 shadow-inner">
                  <Folder className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-blue-600">
                  {user.orders?.length ?? 0}
                </p>
                <p className="text-xs md:text-sm mt-0.5 md:mt-1 text-gray-800">
                  Проекты
                </p>
              </div>
            </div>

            {/* Accepted Work Card */}
            <div
              style={{ border: `1px solid ${activePage === 2 ? "red" : "white"}` }}
              onClick={() => setActivePage(2)}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl text-center border border-green-200 transition-all flex-1 overflow-hidden shadow-md md:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 shadow-inner">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  {user.roleUser === "client"
                    ? user.acceptedWork?.filter((w: AcceptedWork) => w.accepted).length ?? 0
                    : user.orders?.filter((order) => order.pending && order.confirmed).length ?? 0}
                </p>
                <p className="text-xs md:text-sm mt-0.5 md:mt-1 text-gray-800">
                  Принято
                </p>
              </div>
            </div>

            {/* Income Card */}
            <div
              style={{ border: `1px solid ${activePage === 3 ? "red" : "white"}` }}
              onClick={() => setActivePage(3)}
              className="group cursor-pointer relative bg-gradient-to-br from-white to-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl text-center border border-purple-200 transition-all flex-1 overflow-hidden shadow-md md:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-1 md:mb-2 shadow-inner">
                  <Wallet className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-purple-600">0</p>
                <p className="text-xs md:text-sm mt-0.5 md:mt-1 text-gray-800">
                  Доход
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <p className="text-2xl md:text-3xl font-medium text-gray-800">
                Привет,{" "}
                <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {user.name[0].toUpperCase()}{user.name.slice(1).toLowerCase()}
                </span>
                !
              </p>
            </div>
            <div className="mb-6 p-5 bg-white rounded-xl border border-purple-100 shadow-sm transition-shadow">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <p className="text-lg md:text-xl font-medium text-gray-800 text-center animate-pulse">
                  {motivational}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Animated content area */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                {activePage === 1 && (
                  <motion.div
                    key="page-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <p className="text-sm md:text-xl font-medium text-blue-500">Проекты</p>
                    <ProfilOrdersComponents />
                  </motion.div>
                )}

                {activePage === 2 && (
                  <motion.div
                    key="page-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <p className="text-sm md:text-xl font-medium text-green-500">Принято</p>
                    <AcceptProfilComponents />
                  </motion.div>
                )}

                {activePage === 3 && (
                  <motion.div
                    key="page-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <p className="text-sm md:text-xl font-medium text-purple-500">Доход</p>
                    <IncomeProfilComponents />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[20%] flex flex-col items-center space-y-6">
          {/* Profile Avatar */}
          <div className="relative">
            {user.img ? (
              <Image
                src={user.img}
                alt={`${user.name} ${user.surname}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-4xl font-bold text-white">
                  {user.name.charAt(0)}
                  {user.surname.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              {user.name[0].toUpperCase()}{user.name.slice(1).toLowerCase()}{user.surname[0].toUpperCase()}{user.surname.slice(1).toLowerCase()}
            </h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${user.roleUser === "client"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
                  }`}
              >
                {user.roleUser === "client" ? "Клиент" : "Фрилансер"}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-gray-500 text-xs">Участник с</p>
            <p className="text-lg font-medium text-gray-800">{new Date(user.createdAt).getFullYear()}</p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3">
            <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
              <PencilIcon className="w-4 h-4" />
              Редактировать
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;