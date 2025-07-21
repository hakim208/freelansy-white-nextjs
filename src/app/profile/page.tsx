"use client"

import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import axios from 'axios'
import { PencilIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  surname: string
  email: string
  img?: string
  roleUser: "client" | "freelancer"
  orders?: any[]
  acceptedWork?: any[]
  createdAt: string
}

const Profile = () => {
  const token = Number(localStorage.getItem("acssec_token"))
  const [data, setData] = useState<User[]>([])
  const [user, setUser] = useState<User>()

  useEffect(() => {
    async function getUserProfil() {
      try {
        const res = await axios.get("https://43baa55b08d805d5.mokky.dev/user")        
        setData(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    getUserProfil()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const found = data.find((e) => e.id === token)
      setUser(found)
    }
  }, [data, token])

  if (!user) return <div className='pt-[100px] text-center text-gray-500'>Загрузка...</div>

  return (
    <ProtectedRoute>
      <div className='pt-[100px] w-[80%] m-auto '>
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
            {user.img ? (
              <Image
                src={user.img}
                alt={`${user.name} ${user.surname}`}
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                width={128}
                height={128}
              />
            ) : (
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-md">
                <span className="text-4xl font-bold text-gray-500">
                  {user.name.charAt(0)}
                  {user.surname.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="pt-20 pb-6 px-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {user.name} {user.surname}
              </h1>
              <p className="text-gray-500">{user.email}</p>

              <div className="mt-3 flex justify-center">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {user.roleUser === "client" ? "Клиент" : "Фрилансер"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {user.orders?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Заказы</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {user.acceptedWork?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Принято</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">День дохода</p>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-purple-500 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
              <PencilIcon className="w-5 h-5" />
              Редактировать профиль
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile