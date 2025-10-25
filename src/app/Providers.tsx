// src/app/Providers.tsx
'use client'

import { SessionProvider } from 'next-auth/react'
import { TaskProvider } from './components/context/TaskContext' // путь подкорректируй

export function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TaskProvider>{children}</TaskProvider>
    </SessionProvider>
  )
}
