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
        <div className='flex items-start md:flex-row flex-col '>
          <div className='flex flex-col items-center gap-[30px] h-[100vh] bg-blue-400 p-[50px_0px] md:w-[50%] w-full '>
            <h1 className='text-[35px] font-bold text-white'>Freelansy</h1>
            <Image src={ImgLogin} width={500} height={500} alt='photo' />
            <h1 className='text-[20px] text-white font-medium'>У вас нет учетной записи?</h1>
            <Link href="/register">
              <InteractiveHoverButton className='w-[350px]'>Sign Up</InteractiveHoverButton>
            </Link>
          </div>
          <div className='md:w-[50%] w-full p-[50px_0px]'>
            <div className='md:w-[70%] w-full m-auto flex flex-col items-start gap-[40px]'>
              <div className='flex items-center gap-[10px]'>
                <h1 className='text-[20px] font-medium'>С возвращением домой</h1>
                <Image src={Imgcongrats} width={30} height={30} alt='photo' />
              </div>
              <Link href="/">
                <h1 className='text-[20px] text-blue-400 font-medium'>←Главная</h1>
              </Link>
              <div className='w-full mt-[20px]'>
                <Card className="w-full md:w-[80%] shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-center text-xl">Войти в аккаунт</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={loginUser}>
                      <div className='flex flex-col items-start gap-[10px]'>
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          id="name"
                          type="text"
                          className='p-[25px_7px]'
                          placeholder="Имя пользователя"
                        />
                      </div>
                      <div className='flex flex-col items-start gap-[10px]'>
                        <Label htmlFor="password">Пароль</Label>
                        <Input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          className='p-[25px_7px]'
                          placeholder='Пароль пользователя'
                          type="password"
                        />
                      </div>
                      <div>
                        <Link href="/register">
                          <p className='text-red-500 text-[15px]'>Забыли пароль?</p>
                        </Link>
                      </div>
                      <Button type="submit" variant="destructive" className="w-full">
                        Войти
                      </Button>
                    </form>
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