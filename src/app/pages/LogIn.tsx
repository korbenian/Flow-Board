'use client'
import { signIn } from 'next-auth/react'

export default function LogInPage () {
  return (
    <div className='h-screen w-full bg-[linear-gradient(135deg,#0f0c29,#302b63,#24243e)] flex flex-col'>
      {/* Заголовок */}
      <div className='text-center mt-16'>
        <p className='text-6xl font-extrabold text-white tracking-wider drop-shadow-xl'>
          FlowBoard
        </p>
      </div>

      {/* Центрированные кнопки */}
      <div className='flex flex-col items-center justify-center flex-grow gap-6'>
        {/* Кнопка GitHub */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className='
          w-[12%]
            px-6 py-3 
            bg-gray-900 
            text-white 
            font-medium 
            rounded-xl 
            shadow-lg 
            hover:bg-gray-800 
            active:scale-95 
            transition-all 
            flex items-center gap-2
            cursor-pointer
          '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-5 h-5'
          >
            <path d='M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.35-1.29-1.71-1.29-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.8 1.2 1.8 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.65.24 2.87.12 3.17.74.81 1.18 1.84 1.18 3.1 0 4.45-2.69 5.43-5.25 5.71.42.36.79 1.08.79 2.18 0 1.57-.02 2.83-.02 3.22 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z' />
          </svg>
          Войти через GitHub
        </button>

        {/* Кнопка Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className='
          w-[20%]
    px-6 py-3
    bg-white
    text-gray-800
    font-medium
    rounded-xl
    shadow-lg
    hover:bg-gray-200
    active:scale-95
    transition-all
    flex items-center gap-2
    cursor-pointer
  '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 488 512'
            className='w-5 h-5'
          >
            <path
              fill='#4285F4'
              d='M488 261.8C488 403.3 391.1 504 248.3 504 111 504 0 393 0 255.8S111 7.6 248.3 7.6c66.9 0 123 24.4 166.3 64.5l-67.5 64.5C324.4 98.4 289.8 85 248.3 85c-92.5 0-167.8 75.3-167.8 167.8S155.8 420.7 248.3 420.7c85.3 0 134.5-48.5 140-107.7h-140v-85h231.5c2 12.1 3.5 23.7 3.5 38.8z'
            />
          </svg>
          Войти с помощью Google
        </button>
      </div>
    </div>
  )
}
