"use client"

import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Shield, Globe, Target, Heart, ArrowRight, Star } from "lucide-react"
import { useState, useEffect } from "react"

const Help = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <ProtectedRoute>
      <div>
        <section className="py-20 px-4">
          <div
            className={`w-[90%] max-w-5xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <div className="relative">
              <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
                Мы соединяем фрилансеров с заказчиками
              </h1>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce"></div>
            </div>

            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-10 rounded-full animate-pulse"></div>

            <p
              className={`text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              Freelansy — это платформа, созданная для упрощения сотрудничества между заказчиками и специалистами. Мы
              помогаем людям со всего мира находить друг друга, находить работу и выполнять заказы — быстро, безопасно и
              надежно.
            </p>

            <div
              className={`mt-12 flex justify-center transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                Узнать больше
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4">
          <div className="w-[90%] max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
                Наши ценности и цели
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в своей работе
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Доступ к настоящим специалистам",
                  description: "Проверенные профессионалы с подтвержденными навыками и опытом работы",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-50",
                },
                {
                  icon: Clock,
                  title: "Экономия времени",
                  description: "Быстрый поиск и подбор исполнителей благодаря умным алгоритмам платформы",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-50",
                },
                {
                  icon: Shield,
                  title: "Прозрачная и безопасная оплата",
                  description: "Защищенные транзакции и гарантия выплат для всех участников платформы",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-50",
                },
                {
                  icon: Globe,
                  title: "Возможность глобального сотрудничества",
                  description: "Работа без границ с талантливыми специалистами со всего мира",
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-50",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${activeCard === index ? "scale-105 shadow-2xl" : ""
                    } bg-white/70 backdrop-blur-sm border-0 shadow-lg`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    animationDelay: `${index * 200}ms`,
                  }}
                >
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    ></div>

                    <div
                      className={`w-20 h-20 ${item.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-all duration-500 shadow-lg`}
                    >
                      <item.icon className={`w-10 h-10 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="flex justify-center mt-4 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${activeCard === index ? "text-yellow-400 fill-current" : "text-gray-300"
                            } transition-all duration-300`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-4">
          <div className="w-[90%] max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 animate-pulse">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-6">
                Наша история
              </h2>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      После того как мы увидели, с какими трудностями сталкиваются фрилансеры при поиске работы, а
                      заказчики — при поиске исполнителей, мы создали Freelansy.
                    </p>
                  </div>
                </div>

                <div className="relative pl-8 border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-ping"></div>
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>

                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-6">
                    Наша цель — создать простую и эффективную платформу.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Мы стремимся устранить барьеры между талантливыми специалистами и теми, кто нуждается в их услугах,
                    создавая экосистему взаимного доверия и профессионального роста.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden mb-[50px] ">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>

          <div className="relative w-[90%] max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in">
              Готовы начать сотрудничество?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Присоединяйтесь к тысячам довольных пользователей Freelansy
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group">
                Найти специалиста
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full text-lg font-semibold bg-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                Стать фрилансером
                <Users className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </section>
        <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
      </div>
    </ProtectedRoute>
  )
}

export default Help
