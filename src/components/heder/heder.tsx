"use client"
import React, { useEffect, useState } from 'react'
import Navlink from '../navlink'
import Link from 'next/link'
import { PulsatingButton } from '../magicui/pulsating-button'
import { Button } from '@/lib/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Image from 'next/image'
import Logo from "../../app/images/Снимок экрана 2025-07-06 в 00.44.27.png";
import { BriefcaseIcon, UserIcon, Home, Grid, Info, Mail, User } from 'lucide-react'

const Header = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [roleUser, setRoleUser] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("acssec_token"));
    setRoleUser(localStorage.getItem("roleUser"));
  }, []);

  function logout() {
    localStorage.removeItem("acssec_token")
    localStorage.removeItem("roleUser")
    window.location.href = "/"
  }

  const mobileNavItems = [
    { href: "/", icon: <Home className="w-5 h-5" />, label: "Главная" },
    { href: "/category", icon: <Grid className="w-5 h-5" />, label: "Категории" },
    { href: "/about", icon: <Info className="w-5 h-5" />, label: "О нас" },
  ];

  return (
    <header className='z-50 bg-white w-full p-[15px_0px] shadow-[0px_0px_10px_0px] shadow-gray-200 fixed'>
      <div>
        {!userId ? (
          <>
            <div className='hidden md:flex w-[90%] md:w-[80%] mx-auto items-center justify-between py-2'>
              <Link href="/" className='flex items-center'>
                <Image src={Logo} width={150} height={30} alt='logo' priority />
              </Link>

              <nav className='flex items-center gap-6'>
                <Navlink href="/">Главная</Navlink>
                <Navlink href="/category">Категории</Navlink>
                <Navlink href="/about">О нас</Navlink>
              </nav>

              <div className='flex items-center gap-4'>
                <Link href="/login">
                  <Button size="sm" variant="secondary">Войти</Button>
                </Link>
                <Link href="/register">
                  <PulsatingButton bgColor="#7c3aed" pulseColor="#7c3aed" duration="2s">
                    Зарегистрироваться
                  </PulsatingButton>
                </Link>
              </div>
            </div>

            <div className='md:hidden flex items-center justify-between w-[90%] m-auto '>
              <Link href="/">
                <Image src={Logo} width={120} height={24} alt='logo' priority />
              </Link>
              <Link href="/login">
                <PulsatingButton bgColor="#7c3aed" pulseColor="#7c3aed" duration="2s">
                  Войти
                </PulsatingButton>
              </Link>
            </div>

            <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30'>
              <div className='flex justify-around items-center h-16'>
                {mobileNavItems.map((item) => (
                  <MobileBottomLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                  >
                    {item.label}
                  </MobileBottomLink>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className='w-[95%] md:w-[80%] mx-auto flex items-center justify-between'>
            <Link href={"/orders"}>
              <Image src={Logo} width={100} height={30} alt='logo' priority />
            </Link>

            <div className='flex items-center gap-3'>
              <Link href="/create-order">
                <Button variant="destructive" className='text-[10px] md:text-[15px] '>
                  {
                    roleUser == "client" ? (<span>Создать заказ</span>):(<span>Мои заказы</span>)
                  }
                </Button>
              </Link>

              <Link href="/messages" className="p-2 rounded-[50%] bg-gray-100 text-gray-600">
                <Mail className="w-5 h-5" />
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="rounded-full w-9 h-9 p-0 bg-gray-100">
                    <User className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" align="end">
                  <div className="space-y-2 flex flex-col gap-[2px] ">
                    <div className={`p-2 rounded-md ${roleUser === "client"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-orange-50 text-orange-700"
                      }`}>
                      <div className="text-sm font-medium flex items-center gap-2 ">
                        {roleUser === "client" ? (
                          <>
                            <UserIcon className="h-4 w-4" />
                            Клиент
                          </>
                        ) : (
                          <>
                            <BriefcaseIcon className="h-4 w-4" />
                            Фрилансер
                          </>
                        )}
                      </div>
                    </div>

                    <Link href="/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        Профиль
                      </Button>
                    </Link>

                    <Button
                      onClick={logout}
                      variant="destructive"
                      size="sm"
                      className="w-full"
                    >
                      Выйти
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

const MobileBottomLink = ({ href, icon, children }: {
  href: string;
  icon: React.ReactNode;
  children: string;
}) => (
  <Link href={href} className='flex flex-col items-center justify-center p-1 text-gray-600 hover:text-purple-600'>
    <div className='w-6 h-6 flex items-center justify-center'>
      {icon}
    </div>
    <span className='text-xs mt-1'>{children}</span>
  </Link>
);

export default Header;