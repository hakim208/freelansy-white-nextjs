"use client"
import axios from 'axios';
import { CheckCircle, Clock, Cog, Package } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Order = {
    ordersId: string
    projectDetails: string
    amount: number
    category?: string
    startDate?: string
    skills?: string
    description?: string
    confirmed?: boolean
    pending?: boolean
    clientId: number
    clientOrderId: number
}

type User = {
    id: string
    roleUser: string
    orders?: Order[]
    acceptedWork?: {
        clientId: number
        url: string
        accepted: boolean
        description?: string
        nameFrelanser?: string
        emailFrelanser?: string
        clientOrderId?: number
    }[]
    name?: string
    email?: string
}

const ProfilOrdersComponents = () => {
    const [data, setData] = useState<User[]>([])
    const token = typeof window !== "undefined" ? localStorage.getItem("acssec_token") : null
    const roleUser = typeof window !== "undefined" ? localStorage.getItem("roleUser") : null
    const userOrders = data.find((e) => String(e.id) === String(token))

    useEffect(() => {
        async function getOrder() {
            try {
                const { data } = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user")
                setData(data)
            } catch (error) {
                console.error(error);
            }
        }
        getOrder()
    }, [setData])

    return (
        <div className="space-y-4">
            {!userOrders ? (
                <div className="space-y-4">
                    {[...Array(2)].map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-[200px] md:h-[230px] bg-gradient-to-br from-white to-purple-50 rounded-xl border-2 border-purple-200 p-5 mb-4 overflow-hidden"
                        >
                            <div className="animate-pulse space-y-4">
                                {/* Header */}
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <div className="h-6 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                                </div>

                                {/* Content */}
                                <div className="space-y-3">
                                    <div className="h-5 w-full bg-gray-200 rounded"></div>
                                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end">
                                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (userOrders?.orders?.map((order, index) => (
                <div
                    key={index}
                    className="w-full h-[200px] md:h-[230px] bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-purple-200 p-5 mb-4 overflow-hidden flex flex-col hover:scale-[1.01] group"
                >
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                                {order.category || 'Бекатегория'}
                            </h3>
                            <p className="text-sm text-purple-400 mt-1">
                                📅 {order.startDate ? new Date(order.startDate).toLocaleDateString('ru-RU') : 'Ғайримуайян'}
                            </p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            {!order.pending && !order.confirmed ? (
                                <div className="flex items-center gap-2 text-yellow-600">
                                    <Clock className="w-5 h-5" />
                                    {roleUser == "client" ? <span className="text-sm font-medium text-blue-600">Проект в работе</span> : <span className="text-sm font-medium">В разработке</span>}
                                </div>
                            ) : order.pending && !order.confirmed ? (
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Cog className="w-5 h-5 animate-spin" />
                                    {roleUser == "client" ? <span className="text-sm font-medium">На рассмотрении</span> : <span className="text-sm font-medium text-green-600">Готово! Подтвердите выполнение проекта.</span>}
                                </div>
                            ) : order.pending && order.confirmed ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    {roleUser == "client" ? <span className="text-sm font-medium text-green-600">Проект завершён</span> : <span className="text-sm font-medium">Проект выполнен</span>}
                                </div>
                            ) : null}
                        </span>
                    </div>

                    <div className="mb-3 flex-grow">
                        <p className="font-semibold text-gray-700 mb-1">{order.skills || 'Ҳунарҳо номаълуманд'}</p>
                        <p className="text-gray-500 text-sm line-clamp-2 group-hover:text-gray-700 transition-colors">
                            {order.description || 'Шарҳи кор нест...'}
                        </p>
                    </div>

                    <div className="flex justify-end items-center">
                        <div className="flex justify-between gap-[10px] items-center ">
                            <span className="text-xl font-bold text-purple-600">
                                {order.amount ? `${order.amount} TJS` : 'Цена не указана'}
                            </span>
                        </div>
                    </div>
                </div>
            )))}
            {userOrders?.orders?.length === 0 && (
                <div className="w-full h-[200px]  bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6">
                    <Package
                        className="w-14 h-14 md:w-16 md:h-16 text-gray-400 mb-4"
                        strokeWidth={1.5}
                    />
                    <h3 className="text-lg font-medium text-gray-600 mb-1">
                        Заказов пока нет
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Начните прямо сейчас и получите первый заказ!
                    </p>
                    <Link href={"/orders"}><button className="px-4 cursor-pointer py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all text-sm font-medium">
                        Создать первый заказ
                    </button></Link>
                </div>
            )}
        </div>
    )
}

export default ProfilOrdersComponents