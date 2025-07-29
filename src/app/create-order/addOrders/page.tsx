"use client";

import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import axios from 'axios';
import { useAtom } from 'jotai';
import {
  addOrdersAmountAtom,
  addOrdersDescriptionAtom,
  addOrdersSkillsAtom,
} from '@/store/registerSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
  images: string;
}

const AddOrders = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useAtom(addOrdersSkillsAtom);
  const [description, setDescription] = useAtom(addOrdersDescriptionAtom);
  const [projectDuration, setProjectDuration] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useAtom(addOrdersAmountAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Получаем категории с сервера
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('https://43baa55b08d805d5.mokky.dev/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        toast.error('Ошибка при загрузке категорий');
      }
    }
    fetchCategories();
  }, []);

  async function addOrders() {
    try {
      setLoading(true);
      const userId = localStorage.getItem("acssec_token");
      if (!userId) {
        toast.error("Пользователь не авторизован");
        setLoading(false);
        return;
      }

      // Валидация
      if (skills.trim().length < 5) {
        toast.error("Навыки должны содержать минимум 5 символов");
        setLoading(false);
        return;
      }
      if (description.trim().length < 20) {
        toast.error("Описание должно быть длиннее 20 символов");
        setLoading(false);
        return;
      }
      if (!projectDuration || isNaN(Number(projectDuration)) || Number(projectDuration) <= 0) {
        toast.error("Введите корректный срок проекта");
        setLoading(false);
        return;
      }
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        toast.error("Введите корректный бюджет");
        setLoading(false);
        return;
      }
      if (!categoryId) {
        toast.error("Выберите категорию проекта");
        setLoading(false);
        return;
      }

      // Получаем текущего пользователя по ID
      const res = await axios.get(`https://43baa55b08d805d5.mokky.dev/user/${userId}`);
      const currentUser = res.data;

      const newOrder = {
        categoryId: Number(categoryId), // Передаем id категории, а не имя
        ordersId: String(Date.now()),
        skills,
        description,
        projectDetails: projectDuration,
        startDate: new Date().toISOString(),
        amount: Number(amount),
      };

      // Обновляем массив заказов
      const updatedOrders = [...(currentUser.orders || []), newOrder];

      // Отправляем PATCH запрос с обновленными заказами
      await axios.patch(`https://43baa55b08d805d5.mokky.dev/user/${userId}`, {
        orders: updatedOrders,
      });

      toast.success('Ваш заказ опубликован.');

      // Очистка полей
      setSkills("");
      setDescription("");
      setProjectDuration("");
      setAmount("");
      setCategoryId("");

      // Переадресация через секунду
      setTimeout(() => {
        router.push("/create-order");
      }, 1000);

    } catch (error) {
      console.error("Ошибка при добавлении заказа:", error);
      toast.error("Произошла ошибка при добавлении заказа");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <Toaster />
      <div className='pt-[100px] pb-[50px] w-[90%] md:w-[80%] m-auto flex md:flex-row flex-col items-center justify-between '>
        <div className='md:w-[47%] h-[80vh] flex flex-col p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-lg overflow-y-auto'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
              <svg strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75A2.25 2.25 0 014.5 4.5h5.379a2.25 2.25 0 011.59.659l1.09 1.091a2.25 2.25 0 001.59.659H19.5a2.25 2.25 0 012.25 2.25v8.25A2.25 2.25 0 0119.5 20.25H4.5A2.25 2.25 0 012.25 18V6.75z" />
              </svg>
              Детали проекта Freelansy
            </h2>
            <p className='text-gray-500 text-sm'>Заполните требования к проекту</p>
          </div>

          {/* Категория проекта */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Категория проекта
            </label>
            <Select onValueChange={(value) => setCategoryId(value)} value={categoryId}>
              <SelectTrigger className="w-full h-12 border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 shadow-lg">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={String(category.id)}
                    className="hover:bg-purple-50"
                  >
                    <div className="flex items-center gap-3">
                      <Image src={category.images} alt={category.name} className="w-5 h-5 object-contain" width={40} height={40} />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Требуемые навыки */}
          <div className='mb-5'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Требуемые навыки</label>
            <Textarea
              placeholder="Введите требуемые навыки"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          {/* Сроки и Бюджет */}
          <div className='grid grid-cols-2 gap-4 mb-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Сроки (дни)</label>
              <Input
                type="number"
                value={projectDuration}
                onChange={(e) => setProjectDuration(e.target.value)}
                placeholder="напр. 7"
                className="h-12 border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Бюджет ($)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="напр. 50"
                className="h-12 border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Описание проекта */}
          <div className='flex-1 flex flex-col'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Описание</label>
            <Textarea
              placeholder="Опишите проект"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-300 hover:border-purple-400 focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">Разделяйте навыки запятыми</p>
          </div>

          {/* Кнопка публикации */}
          <button
            onClick={addOrders}
            disabled={loading}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            {loading ? "Публикую..." : "Опубликовать проект"}
          </button>
        </div>
        <div className='w-[47%]'>
          <Image
            className='md:block hidden w-[100%]'
            src="https://www.clipartmax.com/png/full/140-1402810_hire-freelancer-find-freelance-jobs-office-365.png"
            alt='Photo'
            width={300}
            height={400}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AddOrders;