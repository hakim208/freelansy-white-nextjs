"use client"

import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import axios from 'axios'
import { PencilIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  img?: string;
  roleUser: "client" | "freelancer";
  orders?: unknown[];
  acceptedWork?: unknown[];
  createdAt: string;
};

const Profile = () => {
  const [data, setData] = useState<User[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const tokenStr = localStorage.getItem("acssec_token");
    if (!tokenStr) return;

    const token = Number(tokenStr);
    if (isNaN(token)) return;

    async function getUserProfile() {
      try {
        const res = await axios.get<User[]>(
          "https://43baa55b08d805d5.mokky.dev/user"
        );
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
        <div className="">
          <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Gradient Header with Profile Image */}
            <div className="h-40 bg-gradient-to-r from-purple-600 to-indigo-700 relative">
              {user.img ? (
                <Image
                  src={user.img}
                  alt={`${user.name} ${user.surname}`}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl"
                  width={128}
                  height={128}
                />
              ) : (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center shadow-xl">
                  <span className="text-4xl font-bold text-white">
                    {user.name.charAt(0)}
                    {user.surname.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Profile Content */}
            <div className="pt-20 pb-6 px-6">
              {/* Name and Role */}
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {user.name} {user.surname}
                </h1>
                <p className="text-gray-600 mt-1">{user.email}</p>

                <div className="mt-3 flex justify-center">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${user.roleUser === "client"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                    }`}>
                    {user.roleUser === "client" ? "Заказчик" : "Фрилансер"}
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Orders */}
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.orders?.length || 0}</p>
                  <p className="text-gray-500 text-sm mt-1">Проекты</p>
                </div>

                {/* Accepted Work */}
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.acceptedWork?.length || 0}</p>
                  <p className="text-gray-500 text-sm mt-1">Принято</p>
                </div>

                {/* Income */}
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {user.income ? `${user.income} TJS` : "—"} */}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Доход</p>
                </div>

                {/* Member Since */}
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(user.createdAt).getFullYear()}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Год регистрации</p>
                </div>
              </div>

              {/* Goals Progress */}
              {/* {user.goals && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Мои цели</h3>
                <div className="space-y-3">
                  {user.goals.map((goal, index) => (
                    <div key={index} className="bg-purple-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-purple-800">{goal.title}</span>
                        <span className="text-xs font-medium text-purple-600">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-purple-100 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md">
                  <PencilIcon className="w-5 h-5" />
                  Редактировать профиль
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                  {/* <CurrencyDollarIcon className="w-5 h-5" /> */}
                  Финансы
                </button>
              </div>
            </div>
          </div>
        </div>
    </ProtectedRoute>
  )
}

export default Profile