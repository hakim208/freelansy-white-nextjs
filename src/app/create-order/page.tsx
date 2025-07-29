"use client";

import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import AddFrelansyOrders from './addFrelansyOrders/page';
import { Calendar } from 'lucide-react';

interface Order {
  ordersId: string;
  amount: number;
  skills: string;
  description: string;
  startDate: string;
  projectDetails:string,
  category:string,
  pending:boolean,
  confirmed:boolean

}

interface User {
  id: string;
  orders: Order[];
}

const CreateOrder: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [roleUser, setRoleUser] = useState<string | null>(null);


  useEffect(() => {
    const token = localStorage.getItem('acssec_token');
    const role = localStorage.getItem('roleUser');
    if (token) setId(token);
    if (role) setRoleUser(role);
    if (!token || !role) setLoading(false);
  }, []);

  const getOrders = useCallback(async () => {
    // if (!id) return;
    try {
      setLoading(true);
      const res = await axios.get<User[]>('https://43baa55b08d805d5.mokky.dev/user');
      const foundUser = res.data.find((e: User) => String(e.id) === String(id)) || null;
      setUser(foundUser);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) getOrders();
  }, [id, getOrders]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!id || !roleUser) {
    return (
      <ProtectedRoute>
        <div className="pt-[100px] text-center text-red-500">
          Доступ запрещён. Пожалуйста, войдите заново.
          <Link href="/login" className="text-blue-600 underline ml-2">Войти</Link>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="pt-[100px] min-h-screen bg-gray-50">
        <div className="w-[90%] md:w-[80%] m-auto">
          {roleUser === 'client' ? (
            <ClientView user={user} reload={getOrders} />
          ) : (
            <FreelancerView />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

interface ClientViewProps {
  user: User | null;
  reload: () => Promise<void>;
}

const ClientView: React.FC<ClientViewProps> = ({ user, reload }) => {
  const [creatingOrder, setCreatingOrder] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setCreatingOrder(true);
      await reload();
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center gap-[30px] justify-center">
        <Link href="/create-order/addOrders">
          <Button
            onClick={handleCreateOrder}
            disabled={creatingOrder}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            {creatingOrder ? 'Создание...' : 'Создать заказ'}
          </Button>
        </Link>

        <Link href="/create-order/completedOrder">
          <Button
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-6"
          >
            Готовый заказ
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-purple-800">Ваши фриланс-заказы</h1>
        <p className="mt-2 text-gray-600">Управляйте своими проектами и находите новых клиентов</p>
        {
          user?.orders?.length === 0 ? (
            <EmptyState />
          ) : (
            user?.orders?.map(order => (
              <div key={order.ordersId}>
                <OrderCard order={order} />
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

const FreelancerView: React.FC = () => (
  <div>
    <AddFrelansyOrders />
  </div>
);

const EmptyState: React.FC = () => (
  <div className="mt-10 flex flex-col items-center justify-center">

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400 opacity-60 mb-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
    <h3 className="text-xl font-medium text-gray-500">Заказов пока нет</h3>
    <p className="text-gray-400 mt-2">Создайте первый заказ и начните работать</p>
  </div>
);

const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className=" mt-[50px] w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 p-6">
    <div className="flex justify-between items-start mb-4">
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
        {order.category}
      </span>
      <div className="flex items-center gap-2">
        {order.pending && (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
            В ожидании
          </span>
        )}
        {order.confirmed && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Подтверждено
          </span>
        )}
      </div>
    </div>

    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Требуемые навыки:</h3>
      <div className="flex flex-wrap gap-2">
        {order.skills.split(' ').map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Описание проекта:</h3>
      <p className="text-gray-700">{order.description}</p>
    </div>

    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Детали проекта:</h3>
      <p className="text-gray-700">{order.projectDetails} дней на выполнение</p>
    </div>

    <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>
          {new Date(order.startDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-800">{order.amount}</span>
        <span className="text-sm text-gray-500">TJS</span>
      </div>
    </div>
  </div>
);

export default CreateOrder;