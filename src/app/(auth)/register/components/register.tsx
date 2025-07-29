"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import { emailAtom, firstNameAtom, passwordAtom, surNameAtom } from "@/store/registerSlice"
import axios from "axios"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft, User, Mail, Lock } from "lucide-react"
import Link from "next/link"

interface FormProps {
  roleUser: string;
}

const Form: React.FC<FormProps> = ({ roleUser }) => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setpassword] = useAtom(passwordAtom)
  const [name, setName] = useAtom(firstNameAtom)
  const [surname, setSurname] = useAtom(surNameAtom)

  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const goToAbout = () => {
    router.push('/login');
  };

  const registerUser = async () => {
    if (!name || !surname || !email || !password || !confirmPassword) {
      toast.error('Заполните все поля!');
      return;
    }

    if (password.length < 4) {
      toast.error("Пароль должен быть минимум 4 символа");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают!");
      return;
    }

    try {
      setIsLoading(true)

      const newUser = {
        name,
        surname,
        email,
        password,
        roleUser,
        createdAt: new Date().toISOString(),
        orders: []
      }

      await axios.post("https://43baa55b08d805d5.mokky.dev/user", newUser)
      toast.success('Регистрация прошла успешно!')
      goToAbout()
    } catch (error) {
      toast.error('Такой пользователь уже существует!')
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Toaster />
      <div className="w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center p-4">
        <Toaster position="top-center" />

        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Назад</span>
            </Button>
          </div>

          {/* Registration Card */}
          <Card className="w-full shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div
                className={`md:w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${roleUser === "freelancer" ? "bg-blue-100" : "bg-purple-100"
                  }`}
              >
                <User className={`w-8 h-8 ${roleUser === "freelancer" ? "text-blue-600" : "text-purple-600"}`} />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">{roleUser}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-sm font-medium text-gray-700">
                    Имя
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="firstname"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-sm font-medium text-gray-700">
                    Фамилия
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="lastname"
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Введите вашу фамилию"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Минимум 4 символа"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Подтвердите пароль
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Повторите пароль"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={registerUser}
                disabled={isLoading}
                className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${roleUser === "freelancer"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Регистрация...</span>
                  </div>
                ) : (
                  "Зарегистрироваться"
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Уже есть аккаунт?{" "}
                  <Link
                    href="/login"
                    className={`font-semibold hover:underline ${roleUser === "freelancer" ? "text-blue-600" : "text-purple-600"
                      }`}
                  >
                    Войти
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Регистрируясь, вы соглашаетесь с{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                условиями использования
              </Link>{" "}
              и{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Form;