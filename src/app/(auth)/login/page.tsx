"use client";

import Image from 'next/image';
import React, { FormEvent } from 'react';
import ImgLogin from './img/freelancerThree.webp';
import LayoutWrapper from '@/components/layoutWrapper';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import Imgcongrats from './img/congrats.webp';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/lib/ui/button';
import { useAtom } from 'jotai';
import { addFirstNameAtom, addPasswordAtom } from '@/store/registerSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from '@/components/protectedRoute/protectedRoute';
import { ArrowLeft } from 'lucide-react';

const Login = () => {
  const [name, setName] = useAtom(addFirstNameAtom);
  const [password, setPassword] = useAtom(addPasswordAtom);

  const goToOrders = () => {
    window.location.href = "/orders";
  };

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    if (name.length > 0 && password.length > 0) {
      try {
        const res = await axios.get(`https://43baa55b08d805d5.mokky.dev/user?name=${name}&password=${password}`);
        if (res.data && res.data.length > 0) {
          toast.success(`Добро пожаловать ${name}`);

          if (typeof window !== "undefined") {
            localStorage.setItem("acssec_token", res.data[0].id);
            localStorage.setItem("roleUser", res.data[0].roleUser);
          }

          setTimeout(() => {
            goToOrders();
          }, 1000);
        } else {
          toast.error('Неверное имя пользователя или пароль');
        }
      } catch (error) {
        console.error(error);
        toast.error('Ошибка при входе');
      }
    } else {
      toast.error('Пожалуйста, заполните все поля');
    }
  };

  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <Toaster />
        <div className='flex flex-col md:flex-row items-start min-h-screen'>
          {/* Left Side - Image Section */}
          <div className=' md:flex hidden flex-col items-center gap-6 md:gap-[30px] bg-blue-400 p-8 md:p-12 md:w-[50%] w-full md:h-[100vh] order-2 md:order-1'>
            <h1 className='text-2xl md:text-[35px] font-bold text-white'>Freelansy</h1>
            <div className='w-full max-w-[300px] md:max-w-[500px]'>
              <Image
                src={ImgLogin}
                width={500}
                height={500}
                alt='login illustration'
                className='w-full h-auto'
              />
            </div>
            <h1 className='text-base md:text-[20px] text-white font-medium text-center'>У вас нет учетной записи?</h1>
            <Link href="/register" className='w-full max-w-[350px]'>
              <InteractiveHoverButton className='w-full'>Sign Up</InteractiveHoverButton>
            </Link>
          </div>

          {/* Right Side - Form Section */}
          <div className='md:w-[50%] w-full p-6 md:p-12 order-1 md:order-2'>
            <div className='max-w-[500px] md:w-[70%] mx-auto flex flex-col gap-6 md:gap-[40px]'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-xl md:text-[20px] font-medium'>С возвращением домой</h1>
                  <Image src={Imgcongrats} width={24} height={24} alt='welcome icon' className=' w-6 h-6 md:w-8 md:h-8' />
                </div>
                <Link href="/">
                  <h1 className='text-base md:text-[20px] text-blue-400 font-medium flex items-center gap-1'>
                    <ArrowLeft className='w-4 h-4' /> Главная
                  </h1>
                </Link>
              </div>

              <div className='w-full mt-4 md:mt-[20px]'>
                <Card className="w-full shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center text-lg md:text-xl">Войти в аккаунт</CardTitle>
                  </CardHeader>
                  <CardContent className='p-4 md:p-6'>
                    <form className="space-y-4" onSubmit={loginUser}>
                      <div className='flex flex-col gap-2'>
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          id="name"
                          type="text"
                          className='p-3 md:p-4'
                          placeholder="Имя пользователя"
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          className='p-3 md:p-4'
                          placeholder='Пароль пользователя'
                          type="password"
                        />
                      </div>
                      <div className='text-right'>
                        <Link href="/forgot-password">
                          <p className='text-sm text-red-500 hover:underline'>Забыли пароль?</p>
                        </Link>
                      </div>
                      <Button
                        variant={"destructive"}
                        type="submit"
                        className="w-full "
                      >
                        Войти
                      </Button>
                    </form>
                    <div className="md:hidden block text-center pt-4">
                      <p className="text-gray-600">
                        Нет аккаунта?{" "}
                        <Link
                          href="/register"
                          className={`font-semibold hover:underline}`}
                        >
                          Регистрация.
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default Login;