import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

      <div className="relative w-[90%] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Freelansy
              </span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Платформа для эффективного сотрудничества между фрилансерами и заказчиками.
            </p>
          </div>

          {[
            {
              title: "Платформа",
              links: ["Как это работает", "Безопасность", "Поддержка"],
            },
            {
              title: "Компания",
              links: ["О нас", "Карьера", "Контакты"],
            },
          ].map((section, index) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-6 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                      style={{
                        animationDelay: `${(index * 3 + linkIndex) * 100}ms`,
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">&copy; {new Date().getFullYear()} Freelansy. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
