"use client";

import React from 'react'
import Link from "next/link";
import {  LogOut, MessageSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const linkClasses = (path: string, isLogout = false) =>
        `p-4 rounded-lg transition-colors text-[17px] font-medium flex items-center gap-3 ${isLogout
            ? "text-red-500 hover:bg-red-50"
            : isActive(path)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`;

    const mobileLinkClasses = (path: string, isLogout = false) =>
        `flex flex-col items-center p-3 text-xs ${isLogout
            ? "text-red-500 hover:text-red-600"
            : isActive(path)
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
        }`;

    function logout() {
        localStorage.removeItem("acssec_token")
        localStorage.removeItem("roleUser")
        window.location.href = "/"
    }
    return (
        <div>
            <div>
                {/* Desktop Sidebar */}
                <aside className="w-full hidden md:block h-full min-h-screen">
                    <nav className="flex flex-col gap-2 h-full">
                        <Link href="/profil" className={linkClasses("/profil")}>
                            <User className="w-5 h-5" />
                            <span>Профиль</span>
                        </Link>
                        <Link href="/profil/messages" className={linkClasses("/profil/messages")}>
                            <MessageSquare className="w-5 h-5" />
                            <span>Сообщения</span>
                        </Link>
                        <div className="flex-grow" />

                        <div
                            onClick={logout}
                            className={`${linkClasses("/logout", true)} cursor-pointer select-none`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    logout();
                                }
                            }}
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Выйти</span>
                        </div>
                    </nav>
                </aside>
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
                    <nav className="flex justify-around">
                        <Link href="/profil" className={mobileLinkClasses("/profil")}>
                            <User className="w-6 h-6" />
                            <span className="mt-1">Профиль</span>
                        </Link>
                        <Link href="/profil/messages" className={mobileLinkClasses("/profil/messages")}>
                            <MessageSquare className="w-6 h-6" />
                            <span className="mt-1">Сообщения</span>
                        </Link>
                        <div onClick={logout} className={mobileLinkClasses("/logout", true)}>
                            <LogOut className="w-6 h-6" />
                            <span className="mt-1">Выйти</span>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Sidebar