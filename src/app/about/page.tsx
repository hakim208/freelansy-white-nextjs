import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, Shield, Zap, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

const Help = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[50px] md:pt-[100px]'>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Header */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
                О платформе Freelansy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Онлайн-платформа для{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  успешного сотрудничества
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Наша цель — сделать фриланс простым, безопасным и доступным для каждого
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/login"}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                  >
                    Начать работу
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Удобная платформа для быстрого взаимодействия</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Это удобная платформа, созданная для простого и быстрого взаимодействия между фрилансерами и
                    заказчиками. Мы объединяем талантливых специалистов с клиентами, которым нужны качественные услуги.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Проверенные специалисты</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">Высокое качество</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Тысячи успешных проектов</h3>
                      <p className="text-gray-600">Каждый день на нашей платформе реализуются новые идеи</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">У нас легко:</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Простой интерфейс, быстрый отклик и честная система — всё для вашего удобства
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Найти подходящего специалиста</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Большая база проверенных фрилансеров с рейтингами и отзывами для выбора лучшего исполнителя
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Разместить заказ за пару минут</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Интуитивно понятный интерфейс позволяет быстро создать техническое задание и найти исполнителя
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Начать работу без лишней бюрократии</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Минимум формальностей, максимум результата. Сосредоточьтесь на работе, а не на документах
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Наши принципы</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Простота</h3>
                  <p className="text-gray-600">Интуитивно понятный интерфейс для всех пользователей</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Безопасность</h3>
                  <p className="text-gray-600">Защищенные платежи и проверенные пользователи</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Доступность</h3>
                  <p className="text-gray-600">Фриланс для каждого, независимо от опыта</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Готовы начать сотрудничество?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам довольных пользователей и откройте новые возможности для развития
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                    <button className="bg-white text-[#5046e6] hover:bg-gray-100 font-bold text-lg px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Присоединиться
                    </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Help
