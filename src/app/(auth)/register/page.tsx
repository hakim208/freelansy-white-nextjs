
"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Users, Star } from "lucide-react"
import Image from "next/image"
import Form from "./components/register"
import ImgRegister from "./img/customerTwo.webp"

export default function RoleSelectionPage() {
    const [role, setRole] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                {
                    !role && (
                        <div className="flex flex-col md:flex-row md:grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl bg-white max-w-5xl mx-auto overflow-x-auto md:overflow-visible">
                            {/* Freelancer Option - horizontal layout for mobile */}
                            <div
                                onClick={() => setRole("freelancer")}
                                className={`min-w-[300px] h-[400px] md:h-[500px] p-8 md:p-12 cursor-pointer transition-all duration-500 flex flex-col justify-center items-center text-center relative overflow-hidden ${role === "freelancer"
                                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white md:transform md:scale-105 z-10 shadow-2xl"
                                        : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-gray-800 hover:shadow-lg"
                                    }`}
                            >
                                <div className="relative z-10 w-full">
                                    <div
                                        className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 transition-all duration-300 ${role === "freelancer" ? "bg-white/20 shadow-lg" : "bg-blue-500 shadow-xl"
                                            }`}
                                    >
                                        <Users className={`w-8 h-8 md:w-12 md:h-12 text-white`} />
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
                                        {role === "freelancer" ? (
                                            <>Работайте свободно —<br />как фрилансер</>
                                        ) : (
                                            "Я фрилансер"
                                        )}
                                    </h2>

                                    <p className={`text-base md:text-lg mb-6 md:mb-8 leading-relaxed ${role === "freelancer" ? "text-blue-100" : "text-gray-600"
                                        }`}>
                                        {role === "freelancer"
                                            ? "Найдите интересные проекты, работайте с лучшими клиентами"
                                            : "Найти проекты"}
                                    </p>

                                    <Button
                                        variant={role === "freelancer" ? "secondary" : "default"}
                                        size={role === "freelancer" ? "default" : "lg"}
                                        className={`px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-semibold transition-all duration-300 ${role === "freelancer"
                                                ? "bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                                                : "bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
                                            }`}
                                    >
                                        {role === "freelancer" ? "Выбрано" : "Стать фрилансером"}
                                    </Button>
                                </div>

                                {role === "freelancer" && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 pointer-events-none animate-pulse" />
                                )}
                            </div>

                            {/* Client Option - horizontal layout for mobile */}
                            <div
                                onClick={() => setRole("client")}
                                className={`min-w-[300px] h-[400px] md:h-[500px] p-8 md:p-12 cursor-pointer transition-all duration-500 flex flex-col justify-center items-center text-center relative overflow-hidden ${role === "client"
                                        ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white md:transform md:scale-105 z-10 shadow-2xl"
                                        : "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 text-gray-800 hover:shadow-lg"
                                    }`}
                            >
                                <div className="relative z-10 w-full">
                                    <div
                                        className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 transition-all duration-300 ${role === "client" ? "bg-white/20 shadow-lg" : "bg-purple-500 shadow-xl"
                                            }`}
                                    >
                                        <Star className={`w-8 h-8 md:w-12 md:h-12 text-white`} />
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
                                        {role === "client" ? (
                                            <>Войдите в мир<br />как клиент</>
                                        ) : (
                                            "Я клиент"
                                        )}
                                    </h2>

                                    <p className={`text-base md:text-lg mb-6 md:mb-8 leading-relaxed ${role === "client" ? "text-purple-100" : "text-gray-600"
                                        }`}>
                                        {role === "client"
                                            ? "Найдите талантливых специалистов для реализации идей"
                                            : "Найти специалистов"}
                                    </p>

                                    <Button
                                        variant={role === "client" ? "secondary" : "default"}
                                        size={role === "client" ? "default" : "lg"}
                                        className={`px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-semibold transition-all duration-300 ${role === "client"
                                                ? "bg-white text-purple-600 hover:bg-gray-100 shadow-lg"
                                                : "bg-purple-600 hover:bg-purple-700 text-white shadow-xl"
                                            }`}
                                    >
                                        {role === "client" ? "Выбрано" : "Найти специалиста"}
                                    </Button>
                                </div>

                                {role === "client" && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 pointer-events-none animate-pulse" />
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Confirmation Section */}
                {role && (
                    <div>
                        <div className='flex items-center justify-between md:flex-row flex-col '>
                            <div className='w-[40%] flex flex-col items-center'>
                                <Form roleUser={role} />
                            </div>
                            <div className='w-[50%] flex flex-col items-center gap-[30px] '>
                                <Image src={ImgRegister} width={0} height={0} alt='photo' />
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500">Простой интерфейс • Быстрый отклик • Честная система</p>
                </div>
            </div>
        </div>
    )
}
