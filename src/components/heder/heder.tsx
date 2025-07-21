import React from 'react'
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
import { BriefcaseIcon, UserIcon } from 'lucide-react'

const Heder = () => {
  const userId = localStorage.getItem("acssec_token")
  const roleUser = localStorage.getItem("roleUser")

  function logout() {
    localStorage.removeItem("acssec_token")
    window.location.href = "/"
  }

  return (
    <div className='z-50 bg-white w-full p-[15px_0px] shadow-[0px_0px_10px_0px] shadow-gray-200 fixed'>
      <div>
        {!userId &&
          <div className='w-[90%] m-auto flex items-center justify-between '>
            <Link href={"/"}><Image src={Logo} width={150} height={30} alt='logo' /></Link>
            <div className='flex items-center gap-[30px] '>
              <Navlink href="/">
                Главная
              </Navlink>
              <Navlink href="/category">
                Категории
              </Navlink>
              <Navlink href="/about">
                О нас
              </Navlink>
            </div>
            <div className='flex items-center gap-[20px] '>
              <Link href="/login">
                <Button size="sm" variant="secondary">Войти</Button>
              </Link>
              <Link href="/register">
                <PulsatingButton bgColor="#7c3aed" pulseColor="#7c3aed" duration="2s">Зарегистрироваться</PulsatingButton >
              </Link>
            </div>
          </div>
        }
        {
          userId && <div className='w-[80%] m-auto flex items-center justify-between '>
            <Link href={"/orders"}><Image src={Logo} width={150} height={30} alt='logo' /></Link>
            <div className='flex items-center gap-[10px] '>
              <Link href={"/create-order"}>
                <Button>Мои заказы</Button>
              </Link>
              <div className="bg-gray-200 rounded-[50%] overflow-hidden relative cursor-pointer w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="p-2 text-black rounded transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="rounded-full w-10 h-10 bg-gray-200 ">
                    <span className="text-lg font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2 flex flex-col ">
                    {
                      roleUser === "client" ? (
                        <div className="animate-fade-in bg-gradient-to-br from-purple-50 to-blue-50 p-2 rounded-lg border border-purple-100 shadow-sm">
                          <h1 className="text-[15px] font-bold text-purple-700 flex items-center gap-2">
                            <UserIcon className="h-5 w-5" />
                            Как клиент
                          </h1>
                        </div>
                      ) : (
                        <div className="animate-fade-in bg-gradient-to-br from-orange-50 to-amber-50 p-2 rounded-lg border border-orange-100 shadow-sm">
                          <h1 className="text-[15px] font-bold text-orange-700 flex items-center gap-2">
                            <BriefcaseIcon className="h-5 w-5" />
                            Как фрилансер
                          </h1>
                        </div>
                      )
                    }
                    <Link href={"/profile"}>
                      <Button variant="outline" className="w-full">
                        Профил
                      </Button>
                    </Link>
                    <Button onClick={logout} variant="destructive" className="w-full">
                      Выйти из аккаунта
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Heder
