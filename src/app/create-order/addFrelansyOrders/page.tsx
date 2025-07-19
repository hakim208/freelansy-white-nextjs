"use client"
import DashboardLayout from '@/app/dashboard/layout'
import OrderConfirmed from '@/app/orderConfirmed/page'
import OrderPending from '@/app/orderPending/page'
import OrderReceived from '@/app/orderReceived/page'
import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React, { useState } from 'react'

const AddFrelansyOrders = () => {
    const [activePage, setActivePage] = useState(1)

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div>
                    <nav className="my-4 flex justify-center items-center gap-8">
                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => setActivePage(1)}
                                className={`text-xl cursor-pointer transition-all ${activePage === 1 ? 'font-semibold text-purple-700' : 'text-gray-600'
                                    }`}
                            >
                                В разработке
                            </span>
                            <div
                                className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === 1 ? 'bg-purple-700' : 'border border-gray-300 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => setActivePage(2)}
                                className={`text-xl cursor-pointer transition-all ${activePage === 2 ? 'font-semibold text-purple-700' : 'text-gray-600'
                                    }`}
                            >
                                В проверке
                            </span>
                            <div
                                className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === 2 ? 'bg-purple-700' : 'border border-gray-300 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => setActivePage(3)}
                                className={`text-xl cursor-pointer transition-all ${activePage === 3 ? 'font-semibold text-purple-700' : 'text-gray-600'
                                    }`}
                            >
                                Выполнено
                            </span>
                            <div
                                className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === 3 ? 'bg-purple-700' : 'border border-gray-300 bg-transparent'
                                    }`}
                            />
                        </div>
                    </nav>

                    <main className='mt-[60px]'>
                        {activePage === 1 && <OrderReceived />}
                        {activePage === 2 && <OrderPending />}
                        {activePage === 3 && <OrderConfirmed />}
                    </main>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}

export default AddFrelansyOrders
