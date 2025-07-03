import React from 'react'

const Footer = () => {
  return (
    <div className='w-full p-[65px_0px] bg-gray-800 mt-[50px] '>
      <div className='w-[90%] m-auto '>
        <div className='w-[70%] m-auto flex items-start justify-between '>
          <div className='flex flex-col items-start gap-[20px] '>
            <p className='text-white '>freelansy</p>
            <div className='flex items-start text-white gap-[20px] '>
              <div className='flex flex-col items-center gap-[7px] '>
                <div className='bg-blue-400 p-[10px] rounded-[50%] '>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                </div>
                <h3>Написать</h3>
              </div>
              <div className='flex flex-col items-center gap-[7px] '>
                <div className='bg-blue-400 p-[10px] rounded-[50%] '>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.999 16.2c-.14 0-.25-.05-.35-.15-.1-.1-.15-.22-.15-.35V13.1l6.35-6.35-8.85 5.15-3.95-1.6c-.23-.1-.35-.27-.35-.5 0-.13.04-.25.1-.35.07-.1.15-.18.25-.25l17.45-7.15c.2-.08.38-.07.55.05.17.12.27.3.27.55l-3.8 17.45c-.05.2-.17.37-.37.45-.1.05-.2.08-.3.08-.13 0-.25-.04-.35-.1l-5.2-3.45-1.3 1.3c-.1.1-.23.15-.35.15z" />
                  </svg>
                </div>
                <h3>Телеграмм</h3>
              </div>
            </div>
          </div>
          <div className='text-gray-400 flex items-start gap-[5px] flex-col '>
            <h3 className='text-white '>Категории</h3>
            <h3>Разработка и IT</h3>
            <h3>Дизайн</h3>
            <h3>Тексты и переводы</h3>
            <h3>Цифровой маркетинг</h3>
            <h3>Аудио, видео, съемка</h3>
            <h3>Бизнес и жизнь</h3>
          </div>
          <div className='text-gray-400 flex items-start gap-[5px] flex-col  '>
            <h3 className='text-white '>Категории</h3>
            <h3>Помощь</h3>
            <h3>Правила сервиса</h3>
            <h3>Вопрос — Ответ</h3>
            <h3>Служба поддержки</h3>
          </div>
          <div className='text-gray-400 flex items-start gap-[5px] flex-col '>
            <h3 className='text-white '>Категории</h3>
            <h3>О Freelansy</h3>
            <h3>О проекте</h3>
            <h3>Пользовательское соглашение</h3>
            <h3>Политика конфиденциальности</h3>
            <h3>Способы оплаты</h3>
          </div>
        </div>
        <hr className='mt-[20px]' />
        <div className='w-full text-center text-[15px] text-white font-medium mt-[10px] '>
          <h1>© 2025 Freelansy. Все права защищены.</h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
