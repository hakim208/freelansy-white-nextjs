"use client"
import { descriptionClientAtom, urlClientAtom } from '@/store/registerSlice';
import axios from 'axios';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';

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

const OrderReceived = () => {
    const [data, setData] = useState<User[]>([])
    const token = typeof window !== "undefined" ? localStorage.getItem("acssec_token") : null

    const [url, setUrl] = useAtom(urlClientAtom)
    const [description, setDescription] = useAtom(descriptionClientAtom)
    const userOrders = data.find((e) => String(e.id) === String(token))
    console.log(userOrders);
    
    const name = userOrders?.name || '';
    const email = userOrders?.email || '';

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

    async function AcceptedFun(clientId: number, _pending: boolean, clientOrderId: number) {
        if (!userOrders) {
            toast.error("Пользователь не найден")
            return
        }
        try {
            const { data: clientUser } = await axios.get<User>(`https://43baa55b08d805d5.mokky.dev/user/${clientId}`);

            const updatedAcceptedWork = [
                ...(clientUser.acceptedWork || []),
                {
                    clientId: token,
                    url: url,
                    accepted: false,
                    description: description,
                    nameFrelanser: name,
                    emailFrelanser: email,
                    clientOrderId: clientOrderId
                }
            ];

            await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${clientId}`, {
                acceptedWork: updatedAcceptedWork,
            });

            const updatedUserOrders = userOrders.orders?.map(order =>
                order.clientOrderId === clientOrderId ? { ...order, pending: true } : order
            );

            await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${token}`, {
                orders: updatedUserOrders,
            });

            toast.success("Проект успешно отправлен клиенту!")

            setUrl("")
            setDescription("")
            // Обновить данные после изменений
            const { data: newData } = await axios.get<User[]>("https://43baa55b08d805d5.mokky.dev/user")
            setData(newData)
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error);
            toast.error("Ошибка при отправке заказа")
        }
    }

    return (
        <div className="space-y-4">
            <Toaster />
            {userOrders?.orders
                ?.filter(order => !order.confirmed && !order.pending)
                .map((order, index) => (
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
                                Заказ
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
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="mt-2 flex items-center justify-center gap-2 px-[10px] py-3 bg-purple-400 hover:bg-purple-500 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-300/50 active:scale-[0.98]">
                                            Отправить заказ
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Оставьте ваше выполненное задание</AlertDialogTitle>
                                            <AlertDialogDescription asChild>
                                                <Input value={url} onChange={(e) => setUrl(e.target.value)} type={"string"} placeholder='Введите ссылку на GitHub или Figma' />
                                            </AlertDialogDescription>
                                            <AlertDialogTitle>
                                                <div className='flex-1 flex flex-col'>
                                                    <label className='block text-sm font-medium text-gray-700 mb-2'>Описание</label>
                                                    <Textarea
                                                        placeholder="Ваше мнение"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        className="border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500 resize-none"
                                                    />
                                                </div>
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Отклонить</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => AcceptedFun(order.clientId, true, order.clientOrderId)}>
                                                Отправить
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                ))}
            {userOrders?.orders?.filter(order => !order.confirmed && !order.pending).length === 0 && (
                <div className="w-full h-[200px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-4">
                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-500">Заказ не найден</h3>
                    <p className="text-sm text-gray-400 mt-1">Попробуйте изменить параметры поиска</p>
                </div>
            )}
        </div>
    )
}

export default OrderReceived